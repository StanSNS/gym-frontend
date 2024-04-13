import React, {useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {
    FaCheckCircle,
    FaGlobeAmericas,
    FaShoppingCart,
    FaTimes,
    FaTimesCircle,
    FaTruckLoading,
    FaUser,
    FaWeightHanging
} from "react-icons/fa";
import "./AddressModal.css"
import {MdEmail, MdLocationPin} from "react-icons/md";

import speedy from '../../../../../../Resources/AddressModal/speedy.jpg'
import econt from '../../../../../../Resources/AddressModal/econt.png'
import sameday from '../../../../../../Resources/AddressModal/sameday.png'
import {FaMapLocationDot, FaPhoneVolume} from "react-icons/fa6";
import {IoPricetag, IoPricetags} from "react-icons/io5";
import {GiPiggyBank} from "react-icons/gi";
import {RiHandCoinFill} from "react-icons/ri";
import {sendOrder} from "../../../../../../Service/OrderService";
import {checkIfProductExists} from "../../../../../../Service/ProductService";

function AddressModal({show, handleClose, cartItems, totalWeight, productCount, totalAmount, totalSaving}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [town, setTown] = useState('');
    const [address, setAddress] = useState('');
    const [additionalAddress, setAdditionalAddress] = useState('');
    const [delivery, setDelivery] = useState('ADDRESS');
    const [courier, setCourier] = useState('');
    const [unavailableProductName, setUnavailableProductName] = useState('');
    const [unavailableProductTaste, setUnavailableProductTaste] = useState('');
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [showSuccessOrderModal, setShowSuccessOrderModal] = useState(false);
    const [showErrorOrderModal, setShowErrorOrderModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);


    const deliveryPrice = 7.34;

    const handleSendOrder = async () => {
        const deliveryData = {
            firstName,
            lastName,
            email,
            phone,
            country,
            town,
            address,
            additionalAddress,
            delivery,
            courier,
            cartItems,
            totalWeight,
            totalAmount,
        };

        deliveryData.totalAmount = (totalAmount - totalSaving + deliveryPrice)

        for (const item of cartItems) {
            const data = await checkIfProductExists(item.brandEntity.brandID, item.modelId, item.selectedTaste?.silaTasteID);
            if (data.status === 204) {
                setUnavailableProductName(item.name);
                setUnavailableProductTaste(item.selectedTaste.name);
                setShowUnavailableModal(true);
                return;
            }
        }

        const sendOrderData = await sendOrder(deliveryData);

        if (sendOrderData.status === 200) {
            setShowSuccessOrderModal(true)
        } else {
            setShowErrorOrderModal(true)
        }
    };

    const handleCloseAddressModal = () => {
        handleClose();
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };


    return (
        <>
            <Modal show={show} onHide={handleCloseAddressModal} className="modal-xl customModalPosition">
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
                                <label className="input_label"><span className="redColorText fs-6 me-1">*</span>
                                    Име
                                </label>
                                <FaUser className="icon"/>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Въведете първо име"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                            <div className="input_container">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Фамилия
                                </label>
                                <FaUser className="icon"/>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Въведете фамилия"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                        </div>

                        <div className="emailAndPhoneContainer">
                            <div className="input_container">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Имейл
                                </label>
                                <MdEmail className="icon"/>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Въведете имейл"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                            <div className="input_container">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Телефон
                                </label>
                                <FaPhoneVolume className="icon"/>
                                <input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Въведете телефонен номер"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="addressData">
                        <div className="countryAndTown">
                            <div className="countryInputContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Държава
                                </label>
                                <FaGlobeAmericas className="icon"/>
                                <input
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Въведете държава"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                            <div className="townInputContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Населено място
                                </label>
                                <FaMapLocationDot className="icon"/>
                                <input
                                    value={town}
                                    onChange={(e) => setTown(e.target.value)}
                                    placeholder="Въведете град"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="radio-inputs">
                        <label>
                            <input className="radio-input" type="radio" name="engine"
                                   onClick={() => setCourier('SPEEDY')}/>
                            <span className="radio-tile">
                          <img src={speedy} alt="Speedy" className="courierLogoImage"/>
                        </span>
                        </label>

                        <label>
                            <input className="radio-input" type="radio" name="engine"
                                   onClick={() => setCourier('ECONT')}/>
                            <span className="radio-tile">
                          <img src={econt} alt="Econt" className="courierLogoImage p-2"/>
                        </span>
                        </label>

                        <label>
                            <input className="radio-input" type="radio" name="engine"
                                   onClick={() => setCourier('SAMEDAY')}/>
                            <span className="radio-tile">
                          <img src={sameday} alt="Sameday" className="courierLogoImage p-1"/>
                        </span>
                        </label>
                    </div>

                    <div className="deliveryType">
                        <label className="radio-button">
                            <input
                                onClick={() => setDelivery("ADDRESS")}
                                type="radio"
                                name="example-radio"
                                value="option1"
                                defaultChecked
                            />
                            <span className="radio"></span>
                            Доставка до адрес
                        </label>

                        <label className="radio-button">
                            <input
                                onClick={() => setDelivery("OFFICE")}
                                type="radio"
                                name="example-radio"
                                value="option2"
                            />
                            <span className="radio"></span>
                            Доставка до офис
                        </label>
                    </div>

                    <div className="detailedAddress">

                        {delivery === 'ADDRESS' && (
                            <div className="addressContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Адрес
                                </label>
                                <MdLocationPin className="icon"/>
                                <input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Въведете адреса за доставка"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                        )}

                        {delivery === 'OFFICE' && (
                            <div className="addressContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Избери офис
                                </label>
                                <MdLocationPin className="icon"/>
                                <select
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="input_field">
                                    <option value="">Изберете офис</option>
                                    <option value="office1">Офис 1</option>
                                    <option value="office2">Офис 2</option>
                                    <option value="office2">Офис 3</option>
                                    <option value="office2">Офис 4</option>
                                </select>
                            </div>
                        )}

                        {delivery === 'ADDRESS' && (
                            <div className="addressContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Допълнителна инфоррмация за адреса
                                </label>
                                <MdLocationPin className="icon"/>
                                <input
                                    value={additionalAddress}
                                    onChange={(e) => setAdditionalAddress(e.target.value)}
                                    placeholder="Въведете допълнителна инфоррмация за адреса"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                        )}

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
                            <button className="animated-button" onClick={() => handleSendOrder()}>
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

            <Modal show={showUnavailableModal} onHide={() => setShowUnavailableModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Unavailable</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {unavailableProductName} - {unavailableProductTaste}
                </Modal.Body>
            </Modal>

            <Modal show={showSuccessOrderModal} onHide={() => setShowSuccessOrderModal(false)}
                   className="modal-dialog-centered customModalPosition">
                <Modal.Header closeButton>
                    <Modal.Title><FaCheckCircle className="successColor mb-1 me-2"/>Успешна поръчка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column  text-center">
                        <h4>Благодарим за направената от вас поръчка, очаквайте доставка от 3-5 работни дни. </h4>
                        <br/>
                        <h4>Номер за просляване на пратка.</h4>
                        <h5>№ - 21341237861282397</h5>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showErrorOrderModal} onHide={() => setShowErrorOrderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><FaTimesCircle className="errorColor mb-1 me-2"/>Поръчката не беше
                        успешна</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column  text-center">
                        <h4>Поръчката която се опитахте да направите не беше изпълнена успешно.</h4>
                        <br/>
                        <h4>Молим ви да се свържете с нас за допълнитекно информация</h4>

                        <button>Свържи се с нас</button>
                    </div>
                </Modal.Body>
            </Modal>

        </>

    );
}

export default AddressModal;
