import dotenvVar from './envVariable';
export async function getTodos(){
    return await fetch(dotenvVar.backendLink,{
        method: "GET",
        headers:{
            "Authorization": `authorize ${localStorage.getItem('authorization')}`
        }
    }).then(async function(res){
        const json = await res.json();
        return json.todos;
    });
}

