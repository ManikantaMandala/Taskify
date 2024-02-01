import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RouteButton from "../RouteButton";
import dotenvVar from '../../scripts/envVariable';

export default function SignUp(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function submitFunction(e){
        e.preventDefault();
        if(!checkPasswords(password, rePassword)){
            console.log('Enter same passwords');
            setError('Different passwords');
        }
        await fetch(`${dotenvVar.backendLink}/signup`,{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                    username: username,
                    password: password
                })
        }).then(async (output)=>{
            const json = await output.json();
            if(!output.ok){
                throw new Error(`error: ${json.message}`)
            }
            console.log(json.message);
            setError(json.message);
            navigate('/');
        }).catch((error) =>{
            console.log(error.message);
            setError(error.message);
        })
    }

    return (
        <>
            <RouteButton name='LogIn' route='/'/>
            <RouteButton name='SignUp' route='/signup'/>
            <form onSubmit={submitFunction}>
                <div>
                    <input 
                        type="text"
                        className = 'inputTag'
                        onChange={(e) =>{
                            setUsername(e.target.value);
                        }}
                        placeholder="username"
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        className = 'inputTag'
                        onChange={(e) =>{
                            setPassword(e.target.value);
                        }}
                        placeholder="password"
                    />
                </div>
                <div>
                    <input 
                        type="password"
                        className = 'inputTag'
                        onChange={(e) =>{
                            setRePassword(e.target.value);
                        }}
                        placeholder="repassword"
                    />
                </div>
                <button>Submit</button>
                <div>
                    {error}
                </div>
            </form>
        </>
    );
}

function checkPasswords(str1, str2){
    return str1 === str2; 
}
