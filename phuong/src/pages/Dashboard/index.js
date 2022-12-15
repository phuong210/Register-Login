import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import ItemTable from './table/ItemTable';
const Dashboard = () => {
    return (
        <>
        <Button variant="primary">Add Item</Button>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
            <ItemTable />
            <ItemTable />
            <ItemTable />
            <ItemTable />
            <ItemTable />
            <ItemTable />
        </tbody>
      </Table>
      </>
    );
}
export default Dashboard;