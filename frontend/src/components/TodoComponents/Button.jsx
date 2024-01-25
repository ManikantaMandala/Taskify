import { useState } from "react";

export default function Button({id, isCompleted}){
    const [completed, setCompleted] = useState(isCompleted);
    async function onPressButton(){
        setCompleted(!completed);
        await fetch('http://localhost:3451/change',{
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
