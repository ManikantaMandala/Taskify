import './App.css'
import Dashboard from './components/TodoComponents/Dashboard';
import LogIn from './components/AuthComponents/LogIn';
import SignUp from './components/AuthComponents/SignUp';
import PageNotFound from './components/PageNotFound';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Error from './components/Error';

function App() {

    return (
        <>
            <h1> Taskify </h1>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LogIn/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/error' element={<Error/>}/>
                    <Route path='/*' element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}


export default App
