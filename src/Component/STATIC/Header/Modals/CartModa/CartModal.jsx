import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './CartModal.css'

function CartModal({ show, handleClose, cartItems }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>{item.name} - Quantity: {item.quantity}</li>
                    ))}
                </ul>
            </Modal.Body>
        </Modal>
    );
}

export default CartModal;
