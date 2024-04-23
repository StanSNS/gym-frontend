import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import {FaTimes} from 'react-icons/fa';
import './TrackOrder.css';
import {FaTruckArrowRight} from "react-icons/fa6";
import {HiRefresh} from "react-icons/hi";

function TrackOrderModal({show, handleClose}) {

    return (
        <>
            <Modal show={show} onHide={handleClose} className="trackOrderModal" centered="true" data-bs-theme="dark">
                <Modal.Header>
                    <Modal.Title>Проследи своята поръчка</Modal.Title>
                    <FaTimes className="loginModalClose" onClick={handleClose}/>
                </Modal.Header>

                <Modal.Body>
                    <h3 className="text-center">Въведи 10 цифреният код от твоята порчъка</h3>

                    <input type="text" className="trackOrderInput" placeholder="Моля въвдете 10 цифрен код"/>

                    <Button className="trackOrderButtonSubmit fw-bold">
                        <FaTruckArrowRight className="mb-1 me-2"/>
                        Проследи</Button>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center p-4">
                    <h5 className="text-center">Изгубили сте вашия код ?
                        Проверете имейла си или възстановете вашият код.</h5>

                    <Button className="recoverEmailButton mt-2 fw-bold">
                        <HiRefresh className="mb-1 me-2"/>
                        Възстанови</Button>
                </Modal.Footer>
            </Modal>






        </>
    );
}

export default TrackOrderModal;
