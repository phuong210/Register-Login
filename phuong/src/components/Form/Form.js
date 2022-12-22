import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const FormComponent = () => {
    return (
        <Form className='m-3'>
            <Form.Group className="mb-3">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text" placeholder="User Name" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>FullName</Form.Label>
                <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>
            <Button variant="primary" type="submit" className='mb-3'>
                Submit
            </Button>
        </Form>
    )
}
export default FormComponent;