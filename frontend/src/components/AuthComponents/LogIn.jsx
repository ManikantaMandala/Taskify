import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import RouteButton from "../RouteButton";

export default function LogIn(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function logIn(e){
        e.preventDefault();
        await fetch('http://localhost:3451/signin',
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            }).then(async(output)=>{
                const json = await output.json();
                if(!output.ok){
                    throw new Error(json.message);
                }
                localStorage.setItem('authorization', json.token);
                setError(json.message);
                navigate('/dashboard');
            })
            .catch((error)=>{
                console.log(error.message);
                setError(error.message);
            })
    }

    // redirect the page to getTodos and createTodos

    return (
        <>
                <RouteButton name='LogIn' route='/'/>
                <RouteButton name='SignUp' route='/signup'/>
                <form onSubmit={logIn}>
                    <div>
                        <input  
                            type="text"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            className="inputTag"
                            placeholder="Username"
                        />
                    </div>
                    <div>
                        <input  
                            type="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            className="inputTag"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <div>
                        {error}
                    </div>
                </form>
        </>
    )
}


