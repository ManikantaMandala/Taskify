import {useState} from 'react';
import {getTodos} from '../../scripts/GetTodo';
import dotenvVar from '../../scripts/envVariable';
import {z} from 'zod';

export default function CreateTodo({setTodos}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    return (
        <div>
            <div id='title'>
                <textarea onChange={(e)=>{
                    setTitle(e.target.value);
                }} placeholder="title" type="text"/>
            </div>
            <div id='description'>
                <textarea onChange={ (e)=>{
                        setDescription(e.target.value);
                }}placeholder="description" type="text"/>
            </div>
            <button onClick={()=>createTodo(title, description, setTodos, getTodos, setError)}> create todo</button>
            <div>
                {error}
            </div>
        </div>
    );
}

async function createTodo(title, description, setTodos, getTodos, setError){

    const todoSchema = z.object({
        title: z.string().min(1),
        description: z.string().min(1)
    });
    const inputObject = {
        title: title,
        description: description
    };
    try{
        const {success} = todoSchema.safeParse(inputObject);

        if(!success){
            throw new Error('Check inputs');
        }

        await fetch(`${dotenvVar.backendLink}/todo`, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-type": "application/json",
                "Authorization": `authorize ${localStorage.getItem('authorization')}`
            }
        })
            .then(async function() {
                const jsonq = await getTodos()
                setTodos(jsonq);
                setError('');
            })
            .catch((error)=>{
                setError(error.message);
                console.error(error.message);
            })
    }
    catch(error){
        setError(error.message);
        console.error(error.message);
    }
}
