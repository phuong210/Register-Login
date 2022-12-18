import "App.css";

import AuthLayout from "layouts/Auth";
import Login from "pages/login";
import Register from "pages/register";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <div className='App'>
            <AuthLayout>
                <Routes>
                    <Route path='/register' element={<Register />} />

                    <Route path='/login' element={<Login />} />
                </Routes>
            </AuthLayout>
        </div>
    );
}

export default App;
