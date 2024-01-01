const express = require('express');
const bodyParser = require('body-parser');
const {User, Todo} = require('./dbConnection')
require('dotenv').config();

const app = express();
const port = process.env.port || 3451;

app.use(bodyParser.json());

//post: Create a todo using the request body
//body: {
//title: 'new todo title',(String)
//description: 'descriptions of todo',(String)
//completed: false, (Boolean)
//}
app.post('/todo', async (req, res)=>{
    const title = req.body['title'];
    const description = req.body['description'];
    try{
        await new Todo({
            title: title,
            description: description,
            isCompleted: false
        }).save();
        return res.status(200).json({
            message: 'created todo successfully',
        });
    }
    catch(error){
        console.log(error.message);
        res.status(400).json({
            message: 'Internal server error'
        });
    }
});

//get route: get all the todos in the database
//no body
//route: /
app.get('/', async (req,res)=>{
    try{
        const todoList = await Todo.find();
        return res.status(200).json({
            message: "Ok here you go",
            todos: todoList
        });
    }catch(error){
        console.log(error.message);
        return res.status(400).json({
            message: 'Internal server error'
        })
    }
});

app.listen(port, function(){
    console.log(`server is listening on port: ${port}`);
});
