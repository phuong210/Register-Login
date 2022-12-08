import './App.scss';
import AuthLayout from './layouts/Auth';
import Register from './pages/Register/register.js';

function App() {
    return (<div className="App">
        <AuthLayout>
            <Register />
        </AuthLayout>
    </div>);
}

export default App;
