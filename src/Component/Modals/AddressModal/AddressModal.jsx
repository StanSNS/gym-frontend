import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {FaGlobeAmericas, FaMap, FaTimes, FaUser} from "react-icons/fa";
import "./AddressModal.css"
import {MdEmail, MdLocationPin} from "react-icons/md";

import speedy from '../../../Resources/AddressModal/speedy.jpg'

import {FaPhoneVolume} from "react-icons/fa6";
import {RiRoadMapFill} from "react-icons/ri";
import {CART_KEY, checkIfProductExists} from "../../../Service/ProductService";
import {getDeliveryPrice, sendOrder} from "../../../Service/OrderService";
import Loader from "../../STATIC/Loader/Loader";
import {useNavigate} from "react-router-dom";
import UnavailableProductModal from "./SubModals/UnavailableProductModal";
import ErrorOrderModal from "./SubModals/ErrorOrderModal ";
import SuccessOrderModal from "./SubModals/SuccessOrderModal ";
import DeliveryPriceErrorModal from "./SubModals/DeliveryPriceErrorModal";
import OrderDetailsFooter from "./OrderDetailsFooter/OrderDetailsFooter";

function AddressModal({show, handleClose, cartItems, totalWeight, productCount, totalAmount, totalSaving, addresses}) {
    const [firstName, setFirstName] = useState('Станимир'); //FIXME
    const [lastName, setLastName] = useState('Сергев'); //FIXME
    const [email, setEmail] = useState('stanimirsergev159@gmail.com'); //FIXME
    const [phone, setPhone] = useState('0895225759'); //FIXME
    const [town, setTown] = useState('');
    const [postCode, setPostCode] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [randomOrderNumber, setRandomOrderNumber] = useState('');
    const [unavailableProductName, setUnavailableProductName] = useState('');
    const [unavailableProductTaste, setUnavailableProductTaste] = useState('');
    const [showUnavailableModal, setShowUnavailableModal] = useState(false);
    const [showSuccessOrderModal, setShowSuccessOrderModal] = useState(false);
    const [showErrorOrderModal, setShowErrorOrderModal] = useState(false);
    const [showDeliveryPriceErrorModal, setShowDeliveryPriceErrorModal] = useState(false);
    const [officeMaxWeightAllowed, setOfficeMaxWeightAllowed] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [officeID, setOfficeID] = useState(0);
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
                    setOfficeID(officeID)

                    const amountWithoutDelivery = (totalAmount - totalSaving).toFixed(2);

                    const deliveryPriceDTOReq = {
                        officeID,
                        amountWithoutDelivery,
                        totalWeight
                    };

                    setIsLoading(true)
                    const response = await getDeliveryPrice(deliveryPriceDTOReq);
                    if (response.status === 200) {
                        setDeliveryPrice(response.data.calculations[0].price.total)
                    } else if (response.status === 203) {
                        setDeliveryPrice(0)
                        for (const calculation of response.data?.calculations) {
                            if (calculation.error) {
                                const isKgOverMaxAllowed = calculation.error.context === "weight.pick-up-weight-over-maximum"
                                    || calculation.error.context === "content.parcels.parcel-weight-over-maximum"

                                if (isKgOverMaxAllowed) {
                                    const weightRegex = /(\d+)kg/;
                                    const match = calculation.error.message.match(weightRegex);
                                    if (match) {
                                        const weight = match[1];
                                        setOfficeMaxWeightAllowed(weight);
                                        setShowDeliveryPriceErrorModal(true)
                                    } else {
                                        console.log('Weight not found in the text.');
                                    }
                                    break;
                                }
                            }
                        }
                    }
                } catch (error) {
                    console.error(error)
                } finally {
                    setIsLoading(false)
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
            town,
            postCode,
            officeAddress,
            cartItems,
            totalWeight,
            totalAmount,
            productCount,
            deliveryPrice,
            totalSaving,
            officeID
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

    const handleCloseAddressModal = () => {
        handleClose()
        setDeliveryPrice(0);
    }

    return (
        <>
            <Modal show={show} onHide={handleCloseAddressModal} className="modal-xl customModalPosition">
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
                                    value={"България"}
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
                            <input className="radio-input" type="radio" name="engine" defaultChecked/>
                            <span className="radio-tile">
                             <img src={speedy} alt="Speedy" className="courierLogoImage"/>
                            </span>
                        </label>
                    </div>

                    <div className="detailedAddress">
                        <div className="addressContainer">
                            <label className="input_label">
                                <span className="redColorText fs-5 me-1">*</span>
                                <span className="fw-bold fs-6">Офис за доставка</span>
                            </label>
                            <MdLocationPin className="icon"/>
                            <select
                                value={officeAddress}
                                onChange={(e) => {
                                    setOfficeAddress(e.target.value)
                                    handleGetDeliveryPrice(e.target.value)
                                }}
                                className="input_field fw-bolder"
                                disabled={!town}
                            >
                                <option value="" disabled={true}>Изберете офис</option>
                                {selectedAddresses.map((office, index) => (
                                    <option key={index}
                                            value={office.fullAddress}
                                    >
                                        {office.fullAddress}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    {deliveryPrice > 0 &&
                        <OrderDetailsFooter
                            productCount={productCount}
                            totalAmount={totalAmount}
                            totalSaving={totalSaving}
                            deliveryPrice={deliveryPrice}
                            totalWeight={totalWeight}
                            handleSendOrder={handleSendOrder}
                        />
                    }
                </Modal.Body>
            </Modal>

            <UnavailableProductModal
                show={showUnavailableModal}
                onHide={() => setShowUnavailableModal(false)}
                unavailableProductName={unavailableProductName}
                unavailableProductTaste={unavailableProductTaste}
            />

            <SuccessOrderModal
                show={showSuccessOrderModal}
                onHide={handleCloseSuccessModal}
                randomOrderNumber={randomOrderNumber}
            />

            <ErrorOrderModal
                show={showErrorOrderModal}
                onHide={() => setShowErrorOrderModal(false)}
            />

            <DeliveryPriceErrorModal
                show={showDeliveryPriceErrorModal}
                onHide={() => setShowDeliveryPriceErrorModal(false)}
                officeMaxWeightAllowed={officeMaxWeightAllowed}
            />
        </>

    );
}

export default AddressModal;
