import {useState} from 'react';
import {getTodos} from '../../scripts/GetTodo';

export default function CreateTodo({setTodos}){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    return (
        <div>
            <div id='title'>
                <input onChange={(e)=>{
                    setTitle(e.target.value);
                }} placeholder="title" type="text"/>
            </div>
            <div id='description'>
                <input onChange={ (e)=>{
                        setDescription(e.target.value);
                }}placeholder="description" type="text"/>
            </div>
            <button onClick={()=>createTodo(title, description, setTodos, getTodos)}> create todo</button>
        </div>
    );
}

async function createTodo(title, description, setTodos, getTodos){
    await fetch("http://localhost:3451/todo", {
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
        });
}
