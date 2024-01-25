import './App.css'
import Dashboard from './components/TodoComponents/Dashboard';
import LogIn from './components/AuthComponents/LogIn';
import SignUp from './components/AuthComponents/SignUp';
import RouteButton from './components/RouteButton';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

    return (
        <>
            <h1> Todo Application </h1>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LogIn/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/error' element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App
