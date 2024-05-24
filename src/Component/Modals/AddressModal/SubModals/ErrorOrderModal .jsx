import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimesCircle } from 'react-icons/fa';

const ErrorOrderModal = ({ show, onHide }) => (
    <Modal show={show} onHide={onHide} className="customModalPosition">
        <Modal.Header closeButton>
            <Modal.Title>
                <FaTimesCircle className="errorColor mb-1 me-2"/>Поръчката не беше успешна
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex flex-column text-center">
                <div className="errorColor">
                    <FaTimesCircle className="modalIcon"/>
                </div>
                <h2>Поръчката не е завършена</h2>
                <h5>Моля свържете се с нас за допълнителна информация</h5>
            </div>
        </Modal.Body>
    </Modal>
);

export default ErrorOrderModal;
