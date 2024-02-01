const express = require('express');
const bodyParser = require('body-parser');
const {User, Todo} = require('./dbConnection')
const { createTodo, updateTodo } = require('./types');
const crypto = require('crypto');
const userMiddleware = require('./userMiddleware');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.port || 3451;
const jwtPassword = process.env.jwtPassword;

app.use(bodyParser.json());
app.use(cors({
    origin: [ 'https://todo-application-sooty-omega.vercel.app/','https://todo-application-git-master-manikantamandalas-projects.vercel.app/','https://todo-application-manikantamandalas-projects.vercel.app/'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

//signup of user
app.post('/signup', async (req, res)=>{
    const username = req.body['username'];
    const password = req.body['password'];
    const oldUser = await User.find({username: username});
    if(oldUser.length !== 0){
        return res.status(400).json({
            message: 'The username is already in use'
        });
    }
    else{
        try{
            const hashPassword = crypto.createHash('sha1')
                .update(password).digest('hex');
            let newUser = new User({
                username: username,
                hashPassword: hashPassword
            });
            newUser = await newUser.save();
            res.status(200).json({
                message: 'User created successfully'
            });
        }
        catch(error){
            return res.status(500).json({
                message: 'Internal error'
            });
        }
    }
});

//user signin
app.post('/signin', async (req, res)=>{
    const username = req.body['username'];
    const password = req.body['password'];
    const hashPassword = crypto.createHash('sha1')
            .update(password).digest('hex');
    try{
        const user = await User.findOne(
            {username: username, hashPassword: hashPassword}
        );
        if(!user){
            return res.status(400).json({
                message: 'incorrect credentials'
            });
        }
        const userId = user._id.toString();
        const jwtToken = jwt.sign({username: username, id: userId}, jwtPassword);
        res.status(200).json({
            message: 'user signed in',
            token: jwtToken
        });
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});

//post: Create a todo using the request body
//header: {
//  Authentication: jwtToken
//}
//body: {
//title: 'new todo title',(String)
//description: 'descriptions of todo',(String)
//completed: false, (Boolean)
//}
app.post('/todo', userMiddleware, async (req, res)=>{
    const title = req.body['title'];
    const description = req.body['description'];
    const decodedToken = req.decodedToken;
    try{
        createTodo.parse({
            title:title,
            description:description
        });
        const newTodo = await new Todo({
            title: title,
            description: description,
            isCompleted: false
        }).save();
        await User.findByIdAndUpdate(
            decodedToken.id,
            {$push: {todoList: newTodo['_id'].toString()}}
        );
        
        return res.status(200).json({
            message: 'created todo successfully',
        });
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({
            message: 'Internal server error',
        });
    }
});

//get route: get all the todos in the database
//no body
//route: /
app.get('/', userMiddleware, async (req,res)=>{
    const decodedToken = req.decodedToken;
    try{
        const user = await User.findById(decodedToken['id']);
        const userTodoListIds = user['todoList'];
        const todoList = await Todo.find();
        const finalTodo = [];
        for(let todo of userTodoListIds){
            const filteredTodos = todoList.filter((t)=> t['_id'].toString() == todo );
            finalTodo.push(filteredTodos);
        }
        return res.status(200).json({
            todos: finalTodo
        });
    }catch(error){
        console.log(error.message);
        return res.status(400).json({
            message: 'Internal server error'
        });
    }
});

app.put('/change', userMiddleware, async (req, res)=>{
    const todoId = req.body['id'];
    const decodedToken = req.decodedToken;
    try{
        updateTodo.parse({id: todoId});
        const userId = decodedToken['id'];
        const todoList = await User.findById(userId);
        const todoListIds = todoList['todoList'];
        for(let id of todoListIds){
            if(id == todoId){
                const document = await Todo.findById(
                    todoId,
                );
                const isCompleted = document['isCompleted'];
                await Todo.findByIdAndUpdate(
                    todoId,
                    {$set: { isCompleted: !isCompleted } }
                )
                return res.status(200).json({
                    message: "changed the todo",
                });
            }
        }
        return res.status(400).json({
            message: 'Bad request, no todo in database'
        });
    }
    catch(error){
        console.log(error.message)
        return res.status(400).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});

app.listen(port, function(){
    console.log(`server is listening on port: ${port}`);
});
