import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {FaCartPlus, FaTimes} from "react-icons/fa";
import "./AddressModal.css"
import {MdEmail} from "react-icons/md";

function AddressModal({show, handleClose, cartItems}) {
    const handleCloseAddressModal = () => {
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleCloseAddressModal} className="modal-xl modal-dialog-centered">
            <Modal.Header className="sticky-header d-flex flex-row">
                <h3>Address Modal</h3>
                <button className="closingModalButton" onClick={handleCloseAddressModal}>
                    <FaTimes/>
                </button>
            </Modal.Header>
            <Modal.Body>
                <div className="personalData">
                    <div className="namesContainer">
                        <div className="input_container">
                            <label className="input_label">Име</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                        <div className="input_container">
                            <label className="input_label">Фамилия</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                    </div>

                    <div className="emailAndPhoneContainer">
                        <div className="input_container">
                            <label className="input_label">Емайл</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                        <div className="input_container">
                            <label className="input_label">Телефон</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                    </div>
                </div>

                <div className="addressData">
                    <div className="countryAndTown">
                        <div className="countryInputContainer">
                            <label className="input_label">Държава</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                        <div className="townInputContainer">
                            <label className="input_label">Населено място</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                    </div>
                </div>

                <div className="detailedAddressData">
                    <div className="radio-button-container">
                        <div className="radio-button">
                            <input type="radio" className="radio-button__input" id="radio1" name="radio-group"/>
                                <label className="radio-button__label" htmlFor="radio1">
                                    <span className="radio-button__custom"></span>
                                    Адрес
                                </label>
                        </div>
                        <div className="radio-button">
                            <input type="radio" className="radio-button__input" id="radio2" name="radio-group"/>
                                <label className="radio-button__label" htmlFor="radio2">
                                    <span className="radio-button__custom"></span>
                                    Еконт
                                </label>
                        </div>
                        <div className="radio-button">
                            <input type="radio" className="radio-button__input" id="radio3" name="radio-group"/>
                                <label className="radio-button__label" htmlFor="radio3">
                                    <span className="radio-button__custom"></span>
                                    Спиди
                                </label>
                        </div>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default AddressModal;
