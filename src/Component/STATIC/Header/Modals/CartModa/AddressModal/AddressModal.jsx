import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {FaGlobeAmericas, FaShoppingCart, FaTimes, FaTruckLoading, FaUser, FaWeightHanging} from "react-icons/fa";
import "./AddressModal.css"
import {MdEmail, MdLocationPin} from "react-icons/md";

import speedy from '../../../../../../Resources/AddressModal/speedy.jpg'
import econt from '../../../../../../Resources/AddressModal/econt.png'
import sameday from '../../../../../../Resources/AddressModal/sameday.png'
import {FaMapLocationDot, FaPhoneVolume} from "react-icons/fa6";
import {IoPricetag, IoPricetags} from "react-icons/io5";
import {GiPiggyBank} from "react-icons/gi";
import {RiHandCoinFill} from "react-icons/ri";

function AddressModal({show, handleClose, cartItems, totalWeight, productCount, totalAmount, totalSaving}) {
    const handleCloseAddressModal = () => {
        handleClose();
    };

    const deliveryPrice = 7.34

    return (
        <Modal show={show} onHide={handleCloseAddressModal} className="modal-xl">
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
                            <label className="input_label"><span className="redColorText fs-6 me-1">*</span>Име</label>
                            <FaUser className="icon"/>
                            <input placeholder="Въведете първо име" type="text" className="input_field"/>
                        </div>
                        <div className="input_container">
                            <label className="input_label"><span
                                className="redColorText fs-6 me-1">*</span>Фамилия</label>
                            <FaUser className="icon"/>
                            <input placeholder="Въведете фамилия" type="text" className="input_field"/>
                        </div>
                    </div>

                    <div className="emailAndPhoneContainer">
                        <div className="input_container">
                            <label className="input_label"><span
                                className="redColorText fs-6 me-1">*</span>Имейл</label>
                            <MdEmail className="icon"/>
                            <input placeholder="Въведете имейл" type="text" className="input_field"/>
                        </div>
                        <div className="input_container">
                            <label className="input_label"><span
                                className="redColorText fs-6 me-1">*</span>Телефон</label>
                            <FaPhoneVolume className="icon"/>
                            <input placeholder="Въведете телефонен номер" type="text" className="input_field"/>
                        </div>
                    </div>
                </div>

                <div className="addressData">
                    <div className="countryAndTown">
                        <div className="countryInputContainer">
                            <label className="input_label"><span
                                className="redColorText fs-6 me-1">*</span>Държава</label>
                            <FaGlobeAmericas className="icon"/>
                            <input placeholder="Въведете държава" type="text" className="input_field"/>
                        </div>
                        <div className="townInputContainer">
                            <label className="input_label"><span className="redColorText fs-6 me-1">*</span>Населено
                                място</label>
                            <FaMapLocationDot className="icon"/>
                            <input placeholder="Въведете град" type="text" className="input_field"/>
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
                        <label className="input_label"><span className="redColorText fs-6 me-1">*</span>Адрес</label>
                        <MdLocationPin className="icon"/>
                        <input placeholder="Въведете адреса за доставка" type="text" className="input_field"/>
                    </div>
                    <div className="addressContainer">
                        <label className="input_label"><span className="redColorText fs-6 me-1">*</span>Допълнителна
                            инфоррмация за адреса</label>
                        <MdLocationPin className="icon"/>
                        <input placeholder="Въведете допълнителна инфоррмация за адреса" type="text"
                               className="input_field"/>
                    </div>
                </div>

                <div className="orderDetails">
                    <div className="orderDetailsText">
                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaShoppingCart className="mb-1 me-1"/>
                                    Брой продукти в количката:
                                </span>
                            {productCount} бр.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <IoPricetags className="mb-1 me-1"/>
                                    Сума без намаление:
                                </span>
                            {totalAmount.toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <IoPricetag className="mb-1 me-1"/>
                                    Сума с намаление:
                                </span>
                            {(totalAmount - totalSaving).toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <GiPiggyBank className="mb-1 me-1"/>
                                    Спестявате:
                                </span>
                            {totalSaving.toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaTruckLoading className="mb-1 me-1"/>
                                    Доставка:
                                </span>
                            {deliveryPrice.toFixed(2)} лв.
                        </span>

                        <span className="fw-bolder ">
                            <span className="keyColorInfo me-2">
                                <FaWeightHanging className="mb-1 me-1"/>
                                    Тегло:
                                </span>
                            {totalWeight.toFixed(3)} кг.
                        </span>

                        <span className="fw-bolder">
                            <span className="keyColorInfo me-2">
                                <RiHandCoinFill className="mb-1 me-1"/>
                                    Дължима сума при доставка:
                                </span>
                            {(totalAmount - totalSaving + deliveryPrice).toFixed(2)} лв.
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
