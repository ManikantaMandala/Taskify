import CreateTodo from "./CreateTodo";
import Todo from "./Todo";
import {getTodos} from '../../scripts/GetTodo';
import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import LogOut from "../AuthComponents/Logout";

export default function Dashboard(){
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log(localStorage.getItem('authorization'));
        const result = getTodos();
        result.then((x) => {
            setTodos(x)
        }).catch((error)=>{
            console.log(error.message);
            navigate('/error');
        });
    }
        ,[]);
    return (
        <>
            <LogOut/>
            <CreateTodo todos={todos} setTodos={setTodos} />
            <Todo todos={todos}></Todo>
        </>
    )
}
