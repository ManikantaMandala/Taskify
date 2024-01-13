import { useState } from "react";

export default function Button({id, isCompleted}){
    const [completed, setCompleted] = useState(isCompleted);
    async function onPressButton(){
        setCompleted(!completed);
        await fetch('http://localhost:3451/change',{
            method: 'PUT',
            headers:{
                'Authorization': "authorize eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1hbmlrYW50YU1hbmRhbGEiLCJpZCI6IjY1YTJkMWQxM2E2MDM0NjM1ODM4NzVkMyIsImlhdCI6MTcwNTE2OTM3M30.gVhoSm21dBfGC9BDMZoj3PAoIg1SbpKsKNayy--NPWI",
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
    }
    
    return <button onClick={onPressButton}>
        {completed == true? 'completed': 'mark as complete'}
    </button>
}
