import {useState} from 'react';

export default function CreateTodo({setTodos, getTodos}){
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
            "Authorization": "authorize eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hbmlrYW50YU1hbmRhbGEiLCJpZCI6IjY1YTJkMWQxM2E2MDM0NjM1ODM4NzVkMyIsImlhdCI6MTcwNTE2OTM3M30.gVhoSm21dBfGC9BDMZoj3PAoIg1SbpKsKNayy--NPWI"
        }
    })
        .then(async function() {
            const jsonq = await getTodos()
            setTodos(jsonq);
        })
}
