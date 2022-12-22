import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ItemTable from './table/ItemTable';
import FormComponent from 'components/Form/Form';

const Dashboard = () => {

    const [user, setUser] = useState([
        { id: 0, name: 'Mark', fullName: 'Otto' },
        { id: 1, name: 'Mark', fullName: 'Otto' },
        { id: 2, name: 'Mark', fullName: 'Otto' },

    ])

    const [showAdd, setShowAdd] = useState(false);

    return (
        <>
            <Button className='m-3' variant="info" onClick={() => setShowAdd(!showAdd)}>Add</Button>
            {showAdd && (
                <FormComponent />
            )}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Full Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <ItemTable user={user} />
                </tbody>
            </Table>
        </>
    );
}
export default Dashboard;