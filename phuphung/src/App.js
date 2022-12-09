import "./App.css";

import AuthLayout from "./layouts/Auth";
import Register from "./pages/register";

function App() {
    return (
        <div className='App'>
            <AuthLayout>
                <Register />
            </AuthLayout>
        </div>
    );
}

export default App;
