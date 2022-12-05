import './App.scss';
import ButtonComponent from './components/Button';
import GuestLayout from './layouts/Guest'
import AuthLayout from './layouts/Auth';
import AdminLayout from './layouts/Admin';
import Register from './pages/register';
import { Button } from 'reactstrap';


function App() {
    return (<div className="App">

        <AuthLayout>
            <Register />
        </AuthLayout>
        {/* <Button color="success">primary</Button>
        <GuestLayout>
            <ButtonComponent className="secondary" name={"Guest"} type={"submit"} />

        </GuestLayout>
        <AuthLayout>
            <ButtonComponent className="success" name={"Auth "} type={"submit"} />
        </AuthLayout>
        <AdminLayout>
            <ButtonComponent className="btn-primary" name={"Admin"} type={"submit"} />
            <ButtonComponent className="btn-warning" name={"Test"} type={"button"} />
        </AdminLayout> */}
    </div>);
}

export default App;
