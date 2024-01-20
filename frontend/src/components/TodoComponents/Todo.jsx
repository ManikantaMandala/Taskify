import Button from './Button';

export default function Todo({todos}) {
    return (
        <div key={todos}>
            {todos.map((todo)=> todoMaping(todo))}
        </div>
    );
}
function todoMaping(todo){
    const t= todo[0];
    const id = t._id;
    const title = t.title
    const description = t.description;
    const isCompleted = t.isCompleted;
    return (
        <div key={id}>
            <h1>{title}</h1>
            <p>{description}</p>
            <Button isCompleted={isCompleted} id={id}>
            </Button>
        </div>

    );
}
