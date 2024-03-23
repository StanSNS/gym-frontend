import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import './TrackOrder.css';

function TrackOrderModal({show, handleClose}) {

    return (
        <Modal show={show} onHide={handleClose} className="trackOrderModal" centered="true" data-bs-theme="dark">
            <Modal.Header>
                <Modal.Title>Track Order</Modal.Title>
                <FaTimes className="loginModalClose" onClick={handleClose}/>
            </Modal.Header>
            <Modal.Body>

                <h2>Track your order</h2>

                <input type="text" className="trackOrderInput" placeholder="Please enter a 20 digit number."/>

                <Button variant="light">Track</Button>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default TrackOrderModal;
