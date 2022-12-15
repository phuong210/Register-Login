import './App.scss';
import AuthLayout from './layouts/Auth';
import Register from './pages/Register/register.js';
import Login from './pages/Login/login.js';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';


function App() {

    return (<div className="App">
        <AuthLayout>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
        </AuthLayout>
        <ToastContainer />
    </div>);
}

export default App;
