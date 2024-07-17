import React from 'react';
import {Modal} from 'react-bootstrap';
import {FaCheckCircle} from 'react-icons/fa';
import './SuccessOrderModal .css'

const SuccessOrderModal = ({show, onHide, randomOrderNumber}) => (
    <Modal show={show} onHide={onHide} className="modal-dialog-centered customModalPosition">
        <Modal.Header closeButton>
            <Modal.Title>
                <FaCheckCircle className="successColor mb-1 me-2"/>Успешна поръчка
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="d-flex flex-column text-center">
                <div className="successColor">
                    <FaCheckCircle className="modalIcon"/>
                </div>
                <h2>Заявката е приета</h2>
                <h6>Наш служител ще се свърже с вас за потвърждение.</h6>
                <div className="orderNumberBox">
                    <h5 className="mt-1">Проследяване на доставка</h5>
                    <h5 className="mt-1 mb-0">
                        № - {randomOrderNumber}
                    </h5>
                </div>
                <p className="disclaimer">
                    Ако имате въпроси или нужда от допълнителна помощ, не се колебайте да се свържете с нас.
                </p>
                <h4>Благодарим за вашата поръчка.</h4>
                <h4>С поздрав, <span className="myGreenBlueColor letterShadow">GymFit</span></h4>
            </div>
        </Modal.Body>
    </Modal>
);

export default SuccessOrderModal;
