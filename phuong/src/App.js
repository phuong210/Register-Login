import './App.scss';
import AuthLayout from './layouts/Auth';
import Register from './pages/Register/register.js';
import Login from './pages/Login/login.js';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

// import { useState } from 'react';
// import Home from "../src/components/home.js"
// import Contact from "../src/components/contact.js"
// import News from "../src/components/news.js"
// import About from "../src/components/about.js"
// import Route from './components/route/Route';
// import Link from './components/route/Link.js';
import { Routes, Route } from "react-router-dom";


function App() {

    // const [flagChangePath, setFlagChangePath] = useState(true);

    // const handlePathChange = () => {
    //     // console.log('excute from parent');
    //     setFlagChangePath(!flagChangePath);
    // }

    return (<div className="App">
        {/* <div>
            <nav>
                <ul className="menu container">
                    <li>
                        <Link to="/home" onHandleChangePath={handlePathChange}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/news" onHandleChangePath={handlePathChange}>
                            News
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onHandleChangePath={handlePathChange}>
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onHandleChangePath={handlePathChange}>
                            About
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="container">
                <Route path="/home" element={<Home />}></Route>
                <Route path="/news" element={<News />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/about" element={<About />}></Route>

            </div>

        </div> */}

        {/* <AuthLayout>
            <div className='container'>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </div>
        </AuthLayout> */}
        <AuthLayout>
            <Routes>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </AuthLayout>
        <ToastContainer />
    </div>);
}

export default App;
