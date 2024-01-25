import { useNavigate } from "react-router-dom"

export default function RouteButton({name, route}){
    const navigate = useNavigate();
    function handleRoute(){
        navigate(route);
    }
    return (
        <>
            <button onClick={handleRoute}>{name}</button>
        </>
    )
}
