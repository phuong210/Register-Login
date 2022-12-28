import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { validateForm } from 'utils/function.js';
import { notify } from 'utils/function';
import { ETypeStatus } from 'constants/constant';

const FormComponent = ({ onSubmit }) => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        tel: "",
        address: "",
        avatar: "",
        description: ""
    });
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm({ form });
        if (errors.length > 0) {
            setErrors(errors);
            notify("Error", ETypeStatus.ERROR);
            return;
        }
        onSubmit(form);
        setForm({
            name: "",
            email: "",
            tel: "",
            address: "",
            avatar: "",
            description: ""
        })
        setErrors("");
    };
    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <Form className='m-3' onSubmit={handleSubmit} >
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Name" onChange={handleChange} value={form.name} name="name" />
                <p className='text-danger'>{errors.name}</p>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" onChange={handleChange} value={form.email} name="email" />
                <p className='text-danger'>{errors.email}</p>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="text" placeholder="Telephone" onChange={handleChange} value={form.tel} name="tel" />
                <p className='text-danger'>{errors.tel}</p>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Address" onChange={handleChange} value={form.address} name="address" />
                <p className='text-danger' >{errors.address}</p>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="file" placeholder="Avatar" onChange={handleChange} value={form.avatar} name="avatar" />
                <p className='text-danger'>{errors.avatar}</p>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Description" onChange={handleChange} value={form.description} name="description" />
                <p className='text-danger' >{errors.description}</p>
            </Form.Group>

            <Button variant="primary" type="submit" className='mb-3'>
                Submit
            </Button>
        </Form>
    )
}
export default FormComponent;