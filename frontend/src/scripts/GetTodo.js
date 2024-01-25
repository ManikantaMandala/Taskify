export async function getTodos(){
    return await fetch('http://localhost:3451',{
        method: "GET",
        headers:{
            "Authorization": `authorize ${localStorage.getItem('authorization')}`
        }
    }).then(async function(res){
        const json = await res.json();
        console.log(json);
        return json.todos;
    });
}

