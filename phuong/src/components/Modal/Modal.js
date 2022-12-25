import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalComponent = ({ show, colorBtn, nameBtn, handleClose, title, children, onFinished }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {children}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant={colorBtn} onClick={onFinished}>
                    {nameBtn}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalComponent;