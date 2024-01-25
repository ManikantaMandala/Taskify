import { useNavigate } from "react-router-dom";

export default function LogOut(){
    const navigate = useNavigate();
    function logout(){
        localStorage.clear();
        navigate('/');
    }
    return (
        <button onClick={logout}> Logout</button>
    )
}
