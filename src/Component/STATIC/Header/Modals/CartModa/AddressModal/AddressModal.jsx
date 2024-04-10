import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {FaTimes, FaWeightHanging} from "react-icons/fa";
import "./AddressModal.css"
import {MdEmail} from "react-icons/md";

import speedy from '../../../../../../Resources/AddressModal/speedy.jpg'
import econt from '../../../../../../Resources/AddressModal/econt.png'
import sameday from '../../../../../../Resources/AddressModal/sameday.png'

function AddressModal({show, handleClose, cartItems, totalWeight, productCount, totalAmount, totalSaving}) {
    const handleCloseAddressModal = () => {
        handleClose();
    };

    const deliveryPrice = 7.34

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

                <div className="radio-inputs">
                    <label>
                        <input className="radio-input" type="radio" name="engine"/>
                        <span className="radio-tile">
                          <img src={speedy} alt="Speedy" className="courierLogoImage"/>
                        </span>
                    </label>

                    <label>
                        <input className="radio-input" type="radio" name="engine"/>
                        <span className="radio-tile">
                          <img src={econt} alt="Econt" className="courierLogoImage p-2"/>
                        </span>
                    </label>

                    <label>
                        <input className="radio-input" type="radio" name="engine"/>
                        <span className="radio-tile">
                          <img src={sameday} alt="Sameday" className="courierLogoImage p-1"/>
                        </span>
                    </label>
                </div>

                <div className="deliveryType">
                    <label className="radio-button">
                        <input type="radio" name="example-radio" value="option1"/>
                        <span className="radio"></span>
                        Доставка до адрес
                    </label>

                    <label className="radio-button">
                        <input type="radio" name="example-radio" value="option2"/>
                        <span className="radio"></span>
                        Доставка до офис
                    </label>
                </div>

                <div className="detailedAddress">
                    <div className="addressContainer">
                        <label className="input_label">Адрес</label>
                        <MdEmail className="icon"/>
                        <input placeholder="Въведете първо име" type="text" className="input_field"/>
                    </div>
                    <div className="addressContainer">
                        <label className="input_label">Допълнителна инфоррмация за адреса</label>
                        <MdEmail className="icon"/>
                        <input placeholder="Въведете първо име" type="text" className="input_field"/>
                    </div>
                </div>

                <div className="orderDetails">
                    <div className="orderDetailsText">
                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Брой продукти в количката:
                                </span>
                            {productCount} бр.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Сума без намаление:
                                </span>
                            {totalAmount.toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Сума с намаление:
                                </span>
                            {(totalAmount - totalSaving).toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Спестявате:
                                </span>
                            {totalSaving.toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Доставка:
                                </span>
                            {deliveryPrice} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Тегло:
                                </span>
                            {totalWeight} кг.
                        </span>

                        <span className="fw-bolder">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Дължима сума при доставка:
                                </span>
                            {totalAmount - totalSaving + deliveryPrice} лв.
                        </span>
                    </div>

                    <div className="buttonBox">
                        <button className="animated-button">
                            <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                            <span className="text">Направи поръчка</span>
                            <span className="circle"></span>
                            <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    );
}

export default AddressModal;
