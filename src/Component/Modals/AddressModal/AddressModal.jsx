import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {
    FaBoxOpen,
    FaCheckCircle,
    FaClipboardList,
    FaGlobeAmericas,
    FaMap,
    FaShoppingCart,
    FaTimes,
    FaTimesCircle,
    FaTruckLoading,
    FaUser,
    FaWeightHanging
} from "react-icons/fa";
import "./AddressModal.css"
import {MdEmail, MdLocationPin} from "react-icons/md";

import speedy from '../../../Resources/AddressModal/speedy.jpg'

import {FaPhoneVolume, FaTruckArrowRight} from "react-icons/fa6";
import {IoBag, IoPricetag, IoPricetags, IoShieldCheckmark} from "react-icons/io5";
import {GiPiggyBank} from "react-icons/gi";
import {RiHandCoinFill, RiRoadMapFill} from "react-icons/ri";
import {CART_KEY, checkIfProductExists} from "../../../Service/ProductService";
import {Button} from "react-bootstrap";
import {getDeliveryPrice, sendOrder} from "../../../Service/OrderService";
import {LuCandy} from "react-icons/lu";
import Loader from "../../STATIC/Loader/Loader";
import {useNavigate} from "react-router-dom";

function AddressModal({show, handleClose, cartItems, totalWeight, productCount, totalAmount, totalSaving, addresses}) {
    const [firstName, setFirstName] = useState('Станимир'); //FIXME
    const [lastName, setLastName] = useState('Сергев'); //FIXME
    const [email, setEmail] = useState('stanimirsergevsns@gmail.com'); //FIXME
    const [phone, setPhone] = useState('0895225759'); //FIXME
    const [town, setTown] = useState('');
    const [postCode, setPostCode] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [selectedAddresses, setSelectedAddresses] = useState([]);

    const country = 'България';
    const [delivery, setDelivery] = useState('OFFICE');
    const [courier, setCourier] = useState('SPEEDY');
    const [randomOrderNumber, setRandomOrderNumber] = useState('');
    const [unavailableProductName, setUnavailableProductName] = useState('');
    const [unavailableProductTaste, setUnavailableProductTaste] = useState('');
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [showSuccessOrderModal, setShowSuccessOrderModal] = useState(false);
    const [showErrorOrderModal, setShowErrorOrderModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const navigator = useNavigate();


    useEffect(() => {
        if (town) {
            const selectedTown = addresses.find(address => address.cityName === town);
            if (selectedTown) {
                setPostCode(selectedTown.postCode);
                setSelectedAddresses(selectedTown.addresses)
            }
        }
    }, [town, addresses]);

    const handleGetDeliveryPrice = async (officeAddressFromEvent) => {
        if (town && officeAddressFromEvent) {
            function getOfficeID(fullAddress) {
                const office = selectedAddresses.find(office => office.fullAddress === fullAddress);
                return office ? office.officeID : null;
            }

            const officeID = getOfficeID(officeAddressFromEvent);

            if (officeID) {
                try {
                    const amountWithoutDelivery = (totalAmount - totalSaving).toFixed(2);

                    const deliveryPriceDTOReq = {
                        officeID,
                        amountWithoutDelivery,
                        totalWeight
                    };

                    const data =  await getDeliveryPrice(deliveryPriceDTOReq);

                    console.log(data)
                } catch (error) {

                }
            }
        }
    }

    const handleSendOrder = async () => {
        const deliveryData = {
            firstName,
            lastName,
            email,
            phone,
            country,
            town,
            postCode,
            officeAddress,
            delivery,
            courier,
            cartItems,
            totalWeight,
            totalAmount,
            productCount,
            deliveryPrice,
            totalSaving
        };

        deliveryData.totalAmount = (totalAmount - totalSaving + deliveryPrice)

        for (const item of cartItems) {
            try {
                const data = await checkIfProductExists(item.brandEntity.brandID, item.modelId, item.selectedTaste?.silaTasteID);
                if (data.status === 204) {
                    setUnavailableProductName(item.name);
                    setUnavailableProductTaste(item.selectedTaste.name);
                    setShowUnavailableModal(true);
                    return;
                }
            } catch (error) {
                navigator("/internal-server-error");
                console.error("Failed to check product," + error)
            }
        }

        setIsLoading(true)
        const sendOrderData = await sendOrder(deliveryData);
        setIsLoading(false)

        if (sendOrderData.status === 200) {
            setRandomOrderNumber(sendOrderData.data)
            setShowSuccessOrderModal(true)
        } else {
            setShowErrorOrderModal(true)
        }
    };

    const handleCloseSuccessModal = () => {
        localStorage.removeItem(CART_KEY);
        window.location.href = '/';
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(randomOrderNumber)
            .then(() => {
                console.log('Text copied to clipboard:', randomOrderNumber);
            })
            .catch(err => {
                console.error('Error copying text to clipboard:', err);
            });
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className="modal-xl customModalPosition">
                {isLoading && <Loader/>}
                <Modal.Header className="sticky-header d-flex flex-row">
                    <h3>Моля добавете вашият адрес тук</h3>
                    <button className="closingModalButton" onClick={handleClose}>
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
                                    disabled
                                    value={country}
                                    className="input_field"
                                />
                            </div>

                            <div className="countryInputContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Град/Село
                                </label>
                                <FaMap className="icon"/>
                                <select
                                    value={town}
                                    onChange={(e) => {
                                        setOfficeAddress('')
                                        setTown(e.target.value)
                                    }}
                                    className="input_field">
                                    <option value="" disabled={true}>Изберете град/село</option>
                                    {addresses.map((address, index) => (
                                        <option key={index} value={address.cityName}>{address.cityName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="countryInputContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    Пощенски код
                                </label>
                                <RiRoadMapFill className="icon"/>
                                <input
                                    disabled
                                    value={postCode}
                                    onChange={(e) => setPostCode(e.target.value)}
                                    placeholder="Моля изберете град"
                                    type="text"
                                    className="input_field"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="radio-inputs">
                        <label>
                            <input className="radio-input" type="radio" name="engine"
                                   onClick={() => setCourier('SPEEDY')} defaultChecked/>
                            <span className="radio-tile">
                             <img src={speedy} alt="Speedy" className="courierLogoImage"/>
                            </span>
                        </label>
                    </div>

                    <div className="deliveryType">
                        <label className="radio-button">
                            <input
                                onClick={() => setDelivery("OFFICE")}
                                type="radio"
                                name="example-radio"
                                value="option2"
                                defaultChecked
                            />
                            <span className="radio"></span>
                            <span className="fw-bolder">Доставка до офис</span>
                        </label>
                    </div>

                    <div className="detailedAddress">
                        {delivery === 'OFFICE' && (
                            <div className="addressContainer">
                                <label className="input_label">
                                    <span className="redColorText fs-6 me-1">*</span>
                                    <span className="fw-bold">Офис за доставка</span>
                                </label>
                                <MdLocationPin className="icon"/>
                                <select
                                    value={officeAddress}
                                    onChange={(e) => {
                                        setOfficeAddress(e.target.value)
                                        handleGetDeliveryPrice(e.target.value)
                                    }}
                                    className="input_field fw-medium"
                                    disabled={!town}
                                >
                                    <option value="" className="fw-medium" disabled={true}>Изберете офис</option>
                                    {selectedAddresses.map((office, index) => (
                                        <option className="fw-medium"
                                                key={index}
                                                value={office.fullAddress}
                                        >
                                            {office.fullAddress}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className="orderDetails">
                        <div className="orderDetailsText">
                            <div className="fw-bolder fs-5 mt-1">
                                <span className="keyColorInfo me-2">
                                    <FaShoppingCart className="mb-1 me-1"/>
                                    Продукти в количката
                                </span>
                                {productCount} бр.
                            </div>

                            <div className="fw-bolder fs-5 mt-1">
                                <span className="keyColorInfo me-2">
                                    <IoPricetags className="mb-1 me-1"/>
                                    Сума без намаление
                                </span>
                                {totalAmount.toFixed(2)} лв.
                            </div>

                            <div className="fw-bolder fs-5 mt-1">
                                <span className="keyColorInfo me-2">
                                    <IoPricetag className="mb-1 me-1"/>
                                    Сума с намаление
                                </span>
                                {(totalAmount - totalSaving).toFixed(2)} лв.
                            </div>

                            <div className="fw-bolder fs-5 mt-1">
                                <span className="keyColorInfo me-2">
                                    <GiPiggyBank className="mb-1 me-1"/>
                                    Спестявате
                                </span>
                                {totalSaving.toFixed(2)} лв.
                            </div>

                            <div className="fw-bolder fs-5 mt-1">
                                <span className="keyColorInfo me-2">
                                    <FaTruckLoading className="mb-1 me-1"/>
                                    Доставка
                                </span>
                                {deliveryPrice.toFixed(2)} лв.
                            </div>

                            <div className="fw-bolder fs-5 mt-1">
                                 <span className="keyColorInfo me-2">
                                    <FaWeightHanging className="mb-1 me-1"/>
                                    Тегло
                                </span>
                                {totalWeight.toFixed(3)} кг.
                            </div>

                            <div className="fw-bolder fs-5 mt-1">
                                <span className="keyColorInfo me-2">
                                    <RiHandCoinFill className="mb-1 me-1"/>
                                    Дължима сума при доставка
                                </span>
                                {(totalAmount - totalSaving + deliveryPrice).toFixed(2)} лв.
                            </div>
                        </div>

                        <div className="buttonBox">
                            <div>
                                <div className="orderContent">
                                    <IoShieldCheckmark/>
                                    <FaTruckArrowRight/>
                                    <FaBoxOpen/>
                                </div>
                                <h5 className="mt-2 text-center fw-bold">Пазарувай сигурно и надеждно с нас. </h5>
                            </div>

                            <button className="learn-more" onClick={() => handleSendOrder()}>
                                <span className="circle" aria-hidden="true">
                                    <span className="icon arrow"></span>
                                </span>
                                <span className="button-text">Поръчай сега</span>
                            </button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showUnavailableModal} onHide={() => setShowUnavailableModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title><FaTimesCircle className="errorColor mb-1 me-2"/>Продукта не е наличен.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column text-center">
                        <h2>Моля премахнете следните продукти от количката си.</h2>
                        <h5>
                            <IoBag className="mb-2 me-1 errorColor"/>{unavailableProductName} -
                            <LuCandy className="mb-1 ms-1 me-1 errorColor"/>{unavailableProductTaste}
                        </h5>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showSuccessOrderModal} onHide={() => handleCloseSuccessModal()}
                   className="modal-dialog-centered customModalPosition">
                <Modal.Header closeButton>
                    <Modal.Title><FaCheckCircle className="successColor mb-1 me-2"/>Успешна поръчка</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column text-center">
                        <div className="successColor"><FaCheckCircle className="modalIcon"/></div>
                        <h2>Поръчката е завършена</h2>
                        <h6>Наш служител ще се свърже с вас за потвърждение на поръчката.</h6>
                        <div className="orderNumberBox">
                            <h5 className="mt-1">
                                Проследяване на доставка
                            </h5>
                            <h5 className="mt-1 mb-0">
                                № - {randomOrderNumber}
                                <Button className="clipboardButton" onClick={handleCopyToClipboard}>
                                    <FaClipboardList className="fs-5 mb-2"/>
                                </Button>
                            </h5>
                        </div>
                        <p className="disclaimer">Ако имате въпроси или нужда от допълнителна помощ, не се колебайте да
                            се свържете с нас.</p>
                        <h4>Благодарим за вашата поръчка.</h4>
                        <h4>С поздрав, <span className="errorColor">GymFit</span></h4>
                    </div>
                </Modal.Body>

            </Modal>

            <Modal show={showErrorOrderModal} onHide={() => setShowErrorOrderModal(false)}
                   className="customModalPosition">
                <Modal.Header closeButton>
                    <Modal.Title><FaTimesCircle className="errorColor mb-1 me-2"/>Поръчката не беше
                        успешна</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column text-center">
                        <div className="errorColor"><FaTimesCircle className="modalIcon"/></div>
                        <h2>Поръчката не е завършена</h2>
                        <h5>Моля свържете се с нас за допълнително информация</h5>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
}

export default AddressModal;
