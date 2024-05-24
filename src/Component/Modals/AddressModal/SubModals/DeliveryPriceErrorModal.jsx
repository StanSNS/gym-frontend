import React from 'react';
import {Modal} from 'react-bootstrap';
import {MdOutlineError} from "react-icons/md";

const DeliveryPriceErrorModal = ({show, onHide, officeMaxWeightAllowed}) => (
    <Modal show={show} onHide={onHide} className="customModalPosition">
        <Modal.Header closeButton>
            <Modal.Title>
                <MdOutlineError className="errorColor mb-1 me-2"/>Възникна грешка
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex flex-column text-center">
                <div className="errorColor">
                    <MdOutlineError className="modalIcon"/>
                </div>
                <h2>Възникна грешка при избора на офис</h2>
                <br/>
                <h5>Избраният от вас офис може да обработва максимум
                    <span className="redColorText fw-bold"> до {officeMaxWeightAllowed}кг.</span>
                </h5>
                <h5>Моля, разделете поръчката си на две или повече части, или изберете друг офис.</h5>
            </div>
        </Modal.Body>
    </Modal>
);

export default DeliveryPriceErrorModal;
