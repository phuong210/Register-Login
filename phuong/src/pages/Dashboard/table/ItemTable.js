import { Button } from 'react-bootstrap';
const ItemTable = () => {
    return (
        <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
                <Button variant="danger">Delete</Button>
                <Button variant="primary">Edit</Button>
            </td>
        </tr>
    )
}
export  default ItemTable;