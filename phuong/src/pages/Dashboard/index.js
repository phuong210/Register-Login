import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ItemTable from './table/ItemTable';
import FormComponent from 'components/Form/Form';
import ModalComponent from 'components/Modal/Modal';
import Form from 'react-bootstrap/Form';
import { notify } from 'utils/function';
import { ETypeStatus } from 'constants/constant';

const Dashboard = () => {

    const [user, setUser] = useState([
        { id: 1, name: 'Mark', fullName: 'Otto' },
        { id: 2, name: 'Jonh', fullName: 'Otto' },
        { id: 3, name: 'Ali', fullName: 'Otto' },

    ])

    const [showAdd, setShowAdd] = useState(false);

    const [form, setForm] = useState({
        name: "",
        fullName: ""
    });

    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClose = () => setShow(false);



    const handleCloseDelete = () => setShowDeleteModal(false);

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        setForm({
            ...form,
            [name]: value
        })
    }

    const onFinished = () => {
        const { id } = form;
        setUser((prev) => prev.map((item) => {
            if (item.id === id) {
                return form;
            }
            return { ...item };
        }))
        handleClose();
        notify("Update Success", ETypeStatus.SUCCESS);
    }
    const onFinishedDelete = () => {
        const { id } = form;
        const removeItem = user.filter((item) => {
            return item.id !== id;
        });
        setUser(removeItem);
        handleCloseDelete();
        notify("Delete Success", ETypeStatus.SUCCESS);
    };

    const handleClickEditModal = (id) => {
        let updateItem = user.find((item) => {
            return item.id === id;
        });
        setForm(updateItem);
        setShow(true);
    };
    const handleClickDeleteModal = (id) => {
        let findItem = user.find((item) => {
            return item.id === id;
        });
        setForm(findItem);
        setShowDeleteModal(true);
    }
    const onSubmit = (userAdd) => {
        userAdd.id = user.length + 1;
        const newUsers = [...user, userAdd];
        setUser(newUsers);
    };

    return (
        <>
            <Button className='m-3' variant="info" onClick={() => setShowAdd(!showAdd)}>Add</Button>
            {showAdd && <FormComponent onSubmit={onSubmit} />}

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
                    <ItemTable user={user} handleClickEditModal={handleClickEditModal} handleClickDeleteModal={handleClickDeleteModal} />
                </tbody>
            </Table>

            <ModalComponent title={"Edit"} colorBtn={"success"} nameBtn={"Update"} handleClose={handleClose} show={show} onFinished={onFinished}>
                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" name="name" onChange={handleChange} value={form.name} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" name="fullName" onChange={handleChange} value={form.fullName} />
                </Form.Group>
            </ModalComponent>

            <ModalComponent title={"Delete"} colorBtn={"danger"} nameBtn={"Delete"} handleClose={handleCloseDelete} show={showDeleteModal} onFinished={onFinishedDelete}>
                Are you sure you want to delete this item?
            </ModalComponent>
        </>
    );
}
export default Dashboard;