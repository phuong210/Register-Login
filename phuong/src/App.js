import './App.scss';
import GuestLayout from './layouts/Guest'
import AuthLayout from './layouts/Auth';
import AdminLayout from './layouts/Admin';
import Register from './pages/Register/register.js';
import { Button } from 'reactstrap';


function App() {
    return (<div className="App">
        <AuthLayout>
            <Register />
        </AuthLayout>
    </div>);
}

export default App;
