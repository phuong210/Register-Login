import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import ModalComponent from 'components/Modal/Modal';
import { notify } from 'utils/function';
import { ETypeStatus } from 'constants/constant';

const ItemTable = ({ user }) => {

    const [form, setForm] = useState({
        userName: "",
        fullName: ""
    });

    const [show, setShow] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowDelete = () => setShowDeleteModal(true);
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
        handleClose();
        notify("Update Success", ETypeStatus.SUCCESS);
        console.log('form', form);
    }
    const onFinishedDelete = () => {
        handleCloseDelete();
        notify("Delete Success", ETypeStatus.SUCCESS);
    }

    return (
        <>
            {(user.length > 0 && user.map((item, key) => (
                <tr key={key}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.fullName}</td>
                    <td>
                        <Button variant={"success"} onClick={handleShow}>Edit</Button>
                        <Button variant={"danger"} onClick={handleShowDelete}>Delete</Button>
                    </td>
                </tr>
            )))}

            <ModalComponent title={"Edit"} handleClose={handleClose} show={show} onFinished={onFinished}>
                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter user name" name="userName" onChange={handleChange} value={form.userName} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter full name" name="fullName" onChange={handleChange} value={form.fullName} />
                </Form.Group>
            </ModalComponent>

            <ModalComponent title={"Delete"} handleClose={handleCloseDelete} show={showDeleteModal} onFinished={onFinishedDelete}>
                Are you sure you want to delete this item?
            </ModalComponent>
        </>
    )

}
export default ItemTable;