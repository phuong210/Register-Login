import Button from "react-bootstrap/Button";
import React, { useState,useEffect } from "react";
import Table from "react-bootstrap/Table";
import ItemTable from "./table/ItemTable";
import FormComponent from "components/Form/Form";
import ModalComponent from "components/Modal/Modal";
import { notify } from "utils/function";
import { ETypeStatus } from "constants/constant";
import Form from "react-bootstrap/Form";
import ApiHelper from 'services/services';
const Dashboard = () => {
  const [user, setUser] = useState([]);

  const [showAdd, setShowAdd] = useState(false);
  const getToken = localStorage.getItem("token");
  const [form, setForm] = useState({
    name : "",
    email:"",
    address:"",
    description: "",
    tel:"",
    avatar: ""
  });
  useEffect(()=>{
    getUser();
    
  },[])

  const body = {
    page: 1,
  };
  const getUser = async ()=>{
    try {
      ApiHelper.setJwtToken(getToken);
      const resposne = await ApiHelper.get({
        path: "customer/list",
        params: body,
      });
  
      if (resposne.success === true) {
        setUser(resposne.data.result);
      }
    } catch (e) {
      console.log(e);
    }
  }
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => setShow(false);

  const handleClickDeleteModal = (id) => {
    let updateItem = user.find((item) => {
      return item.id === id;
    });
    setForm(updateItem);
    setShowDeleteModal(true);
    // setUser(deleteItem);
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const updateCustomer = async (id ) => {
    try {
      ApiHelper.setJwtToken(getToken);
     
      const response = await ApiHelper.post({
        path: `customer/update/${id}`,
        payload: JSON.stringify({
         name: form.name,
         email:form.email,
         address:form.address,
         description:form.description,
         avatar:form.avatar
        }),
      });

      if (response.success === true) {
        alert("update thanh cong")
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const onFinished = () => {
    const { id } = form;

    updateCustomer(id,form)
    handleClose();
    notify("Update Success", ETypeStatus.SUCCESS);
  };

  const onFinishedDelete = () => {
    const { id } = form;
    console.log("id update",id);
    const deleteCustomer = async (id) => {
      try {
        ApiHelper.setJwtToken(getToken);
        console.log(`id`, id);
        const response = await ApiHelper.get({
          path: `customer/delete/${id}`,
          params: {},
        });
        console.log("responseSaveCustomer", response);
        if (response.success === true) {
          alert("deleteSuccess")
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    setUser(deleteCustomer(id));
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
 
  const onSubmit = async (userAdd) => {
    try {
      ApiHelper.setJwtToken(getToken);
      const response = await ApiHelper.post({
        path: "customer/save",
        payload: JSON.stringify(userAdd),
      });
      console.log("responseSaveCustomer", response);
      if (response.success === true) {
      setUser(user)
      }
    } catch (error) {
      console.log("error", error);
    }
   
  };
  return (
    <>
      <Button
        className="m-3"
        variant="info"
        onClick={() => setShowAdd(!showAdd)}
      >
        Add
      </Button>
      {showAdd && <FormComponent onSubmit={onSubmit} />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Tel</th>
            <th>Address</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <ItemTable
            user={user}
            handleClickEditModal={handleClickEditModal}
            handleClickDeleteModal={handleClickDeleteModal}
          />
        </tbody>

        <ModalComponent
          title={"Edit"}
          handleClose={handleClose}
          show={show}
          onFinished={onFinished}
        >
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
        </ModalComponent>

        <ModalComponent
          title={"Delete"}
          handleClose={handleCloseDelete}
          show={showDeleteModal}
          onFinished={onFinishedDelete}
        >
          Are you sure you want to delete this item?
        </ModalComponent>
      </Table>
    </>
  );
};
export default Dashboard;
