import Button from './Button';

export default function Todo({todos}) {
    console.log(todos);
    return (
        <div key={todos}>
            {todos.map((todo)=> todoMaping(todo))}
        </div>
    );
}
function todoMaping(todo){
    console.log(todo);
    const t= todo[0];
    const id = t._id;
    const title = t.title
    const description = t.description;
    const isCompleted = t.isCompleted;
    console.log(t._id);
    return (
        <div key={id}>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button isCompleted={isCompleted} id={id}>
            </Button>
        </div>

    );
}
