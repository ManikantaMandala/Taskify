import { useState } from "react";
import dotenvVar from '../../scripts/envVariable';


export default function Button({id, isCompleted}){
    const [completed, setCompleted] = useState(isCompleted);
    async function onPressButton(){
        setCompleted(!completed);
        // await fetch('http://localhost:3451/change',{
        await fetch(`${dotenvVar.backendLink}/change`,{
            method: 'PUT',
            headers:{
                'Authorization': `authorize ${localStorage.getItem('authorization')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
    }
    
    return <button onClick={onPressButton}>
        {completed == true? 'completed': 'mark as complete'}
    </button>
}
