import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import ApiHelper from 'services/services';
const FormComponent = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    tel:"",
    description: "",
    avatar:""
  });
  
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Form className="m-3" onSubmit={handleSubmit}>
         <Form.Group className="mb-3">
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Tel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="tel"
              value={form.tel}
              onChange={handleChange}
            />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Avatar</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
            />
          </Form.Group>
      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
    </Form>
  );
};
export default FormComponent;
