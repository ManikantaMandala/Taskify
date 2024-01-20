import { useEffect, useState } from 'react'
import './App.css'
import CreateTodo from './components/TodoComponents/CreateTodo';
import Todo from './components/TodoComponents/Todo';

function App() {
    const [todos, setTodos] = useState([]);
    useEffect(()=>{
        const result = getTodos();
        result.then((x) => {
            setTodos(x)
        });
    }
        ,[]);

    return (
        <>
            <CreateTodo todos={todos} setTodos={setTodos} getTodos={getTodos}/>
            <Todo todos={todos}></Todo>
        </>
    );
}

async function getTodos(){
    return await fetch('http://localhost:3451',{
        method: "GET",
        headers:{
            "Authorization": "authorize eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hbmlrYW50YU1hbmRhbGEiLCJpZCI6IjY1YTJkMWQxM2E2MDM0NjM1ODM4NzVkMyIsImlhdCI6MTcwNTE2OTM3M30.gVhoSm21dBfGC9BDMZoj3PAoIg1SbpKsKNayy--NPWI"
        }
    }).then(async function(res){
        const json = await res.json();
        return json.todos;
    });
}

export default App
