import ApiHepler from 'services/services.js';
import { objectToQueryString } from 'utils/function';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import ItemTable from './table/ItemTable';
import FormComponent from 'components/Form/Form';
import ModalComponent from 'components/Modal/Modal';
import Form from 'react-bootstrap/Form';
import { notify } from 'utils/function';
import { ETypeStatus } from 'constants/constant';

const Dashboard = () => {

    let getToken = localStorage.getItem("token");
    const body = {
        page: 1
    }

    const [user, setUser] = useState([])

    useEffect(() => {
        getCustomerList();
    }, []);


    const getCustomerList = async () => {
        try {
            ApiHepler.setJwtToken(getToken);
            const response = await ApiHepler.get({
                path: 'customer/list',
                params: objectToQueryString(body)
            })
            if (response.success === true) {
                setUser(response.data.result);
            }
        } catch (e) {
            notify('Error', ETypeStatus.ERROR);
        }
    }

    const addUser = async (values) => {
        try {
            ApiHepler.setJwtToken(getToken);
            const response = await ApiHepler.post({ path: 'customer/save', payload: JSON.stringify(values) });
            if (response.success === true) {
                getCustomerList();
                notify("Add Success", ETypeStatus.SUCCESS);
            }

        } catch (e) {
            notify(e.data.email[0], ETypeStatus.ERROR);
        }
    }
    const deleteUser = async (id) => {
        try {
            ApiHepler.setJwtToken(getToken);
            const response = await ApiHepler.get({
                path: `customer/delete/${id}`,
                params: {}
            });
            if (response.success === true) {
                getCustomerList();
            }

        } catch (e) {
            notify('Error', ETypeStatus.ERROR);
        }
    }

    const updateUser = async (id) => {
        try {
            ApiHepler.setJwtToken(getToken);
            const response = await ApiHepler.post({
                path: `customer/update/${id}`,
                payload: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    description: form.description,
                    address: form.address,
                    tel: form.tel,
                })
            });
            if (response.success === true) {
                getCustomerList();
            }
        } catch (e) {
            notify('Error', ETypeStatus.ERROR);
        }
    }

    const [showAdd, setShowAdd] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        tel: "",
        address: "",
        avatar: "",
        description: ""
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
        updateUser(id);
        handleClose();
        notify("Update Success", ETypeStatus.SUCCESS);
    }
    const handleClickEditModal = (id) => {
        let updateItem = user.find((item) => {
            return item.id === id;
        });
        setForm(updateItem);
        setShow(true);
    };
    const onFinishedDelete = () => {
        const { id } = form;
        deleteUser(id);
        handleCloseDelete();
        notify("Delete Success", ETypeStatus.SUCCESS);
    };
    const handleClickDeleteModal = (id) => {
        let findItem = user.find((item) => {
            return item.id === id;
        });
        setForm(findItem);
        setShowDeleteModal(true);
    }
    const onSubmit = (userAdd) => {
        addUser(userAdd);
    };

    return (
        <>
            <Button className='m-3' variant="info" onClick={() => setShowAdd(!showAdd)}>Add</Button>
            {showAdd && <FormComponent onSubmit={onSubmit} />}

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Telephone</th>
                        <th>Address</th>
                        <th>Avatar</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <ItemTable user={user} handleClickEditModal={handleClickEditModal} handleClickDeleteModal={handleClickDeleteModal} />
                </tbody>
            </Table>

            <ModalComponent title={"Edit"} colorBtn={"success"} nameBtn={"Update"} handleClose={handleClose} show={show} onFinished={onFinished}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleChange} value={form.name} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name="email" onChange={handleChange} value={form.email} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telephone</Form.Label>
                    <Form.Control type="text" placeholder="Enter telephone" name="tel" onChange={handleChange} value={form.tel} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" name="address" onChange={handleChange} value={form.address} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="text" placeholder="Enter avatar" name="avatar" onChange={handleChange} value={form.avatar} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" name="description" onChange={handleChange} value={form.description} />
                </Form.Group>
            </ModalComponent>

            <ModalComponent title={"Delete"} colorBtn={"danger"} nameBtn={"Delete"} handleClose={handleCloseDelete} show={showDeleteModal} onFinished={onFinishedDelete}>
                Are you sure you want to delete this item?
            </ModalComponent>
        </>
    );
}
export default Dashboard;