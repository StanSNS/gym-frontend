import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaInfoCircle, FaTimes, FaTimesCircle, FaTruckLoading } from 'react-icons/fa';
import './TrackOrderModal.css';
import { FaEnvelopeCircleCheck, FaTruckArrowRight } from "react-icons/fa6";
import { HiRefresh } from "react-icons/hi";
import { findOrderByNumber, sendAllOrdersToEmail } from "../../../Service/OrderService";
import Loader from "../../STATIC/Loader/Loader";
import { useNavigate } from "react-router-dom";

function TrackOrderModal({ show, handleClose }) {
    const [recoverModalShow, setRecoverModalShow] = useState(false);
    const [orderModalShow, setOrderModalShow] = useState(false);
    const [recoveryStatus, setRecoveryStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const navigator = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateEmail = () => {
        if (!emailInput || !emailRegex.test(emailInput)) {
            setEmailError(true);
            return false;
        }
        setEmailError(false);
        return true;
    };

    const validateCode = () => {
        if (!codeInput || codeInput.length !== 10) {
            setCodeError(true);
            return false;
        }
        setCodeError(false);
        return true;
    };

    const handleRecoverModalClose = () => {
        setRecoverModalShow(false);
    };

    const handleOrderModalClose = () => {
        setOrderModalShow(false);
    };

    const handleSendAllOrdersToEmail = async () => {
        if (!validateEmail()) {
            return;
        }
        try {
            setIsLoading(true);
            const data = await sendAllOrdersToEmail(emailInput);
            setIsLoading(false);

            if (data.status === 200) {
                setRecoveryStatus(true);
                setRecoverModalShow(true);
            } else {
                setRecoveryStatus(false);
                setRecoverModalShow(true);
            }
        } catch (error) {
            navigator("/internal-server-error");
            console.error("Failed to send all orders to email: " + error);
        }
    };

    const handleSendOrderEmail = async () => {
        if (!validateCode()) {
            return;
        }
        try {
            setIsLoading(true);
            const data = await findOrderByNumber(codeInput);
            if (data.status === 200) {
                setOrderStatus(true);
                setOrderModalShow(true);
            } else {
                setOrderStatus(false);
                setOrderModalShow(true);
            }
        } catch (error) {
            setOrderStatus(false);
            setOrderModalShow(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className="trackOrderModal" centered="true" data-bs-theme="dark">
                {isLoading && <Loader />}

                <Modal.Header>
                    <Modal.Title><FaTruckLoading className="mb-1 me-1 myGreenBlueColor" /> Проследи своята поръчка</Modal.Title>
                    <button className="closingModalButton" onClick={handleClose}><FaTimes /></button>
                </Modal.Header>

                <Modal.Body>
                    <h3 className="text-center">Въведи
                        <span className="myGreenBlueColor"> 10 </span>
                        цифреният код от твоята порчъка
                    </h3>
                    <input
                        type="text"
                        className={`mb-2 trackOrderInput ${codeError ? 'input-error' : ''}`}
                        placeholder="Моля въведете 10 цифрен код"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                    />
                    {codeError && <h6 className="error-message mb-3 fw-bold">Моля въведете валиден 10 цифрен код.</h6>}

                    <Button className="trackOrderButtonSubmit fw-bold" onClick={handleSendOrderEmail}>
                        <FaTruckArrowRight className="mb-1 me-2" />
                        Проследи
                    </Button>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center p-4">
                    <h5 className="text-center pb-0 mb-0 ps-3 pe-3">Изгубили сте вашия код?
                        Проверете имейла си или възстановете вашият код.</h5>

                    <div className=" pt-0 pb-0 mt-0">
                        <h6 className="text-center mt-4">Въведете имейл на който ще изпратим всички поръчки свързани с него.</h6>
                        <input
                            type="text"
                            className={`mb-2 trackOrderInput ${emailError ? 'input-error' : ''}`}
                            placeholder="Моля въведете имейл..."
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        {emailError &&
                            <h6 className="error-message mb-2 text-center fw-bold">
                                Моля въведете валиден имейл адрес.
                            </h6>
                        }
                    </div>

                    <Button className="recoverEmailButton fw-bold" onClick={handleSendAllOrdersToEmail}>
                        <HiRefresh className="mb-1 me-2" />
                        Възстанови
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal className="modal-lg trackOrderModal darkerBackground" centered="true" show={recoverModalShow}
                   onHide={handleRecoverModalClose} data-bs-theme="dark">
                {recoveryStatus && (
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <FaEnvelopeCircleCheck className="mb-1 me-2 successColor" />
                                Имейл с всички поръчки беше изпратен.
                            </Modal.Title>
                            <button className="closingModalButton" onClick={handleRecoverModalClose}><FaTimes /></button>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor" />
                                Моля проверете имейла си за потвърждение.</h4>
                            <p className="fw-medium">Имейлът съдържа важна информация относно вашите поръчки. Ако не
                                откриете имейла във вашата основна пощенска кутия, моля, проверете папката със спам или
                                изчакайте между 5 и 10 минути, за да се появи. Ако дори след този период не получите
                                имейл, моля, свържете се с нас за помощ.</p>
                        </Modal.Body>
                    </>
                )}

                {!recoveryStatus && (
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <FaTimesCircle className="mb-1 me-2 errorColor" />
                                Няма намерени поръчки.
                            </Modal.Title>
                            <button className="closingModalButton" onClick={handleRecoverModalClose}><FaTimes /></button>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor" />
                                Няма намерени поръчки свързани с въведения от вас имейл.</h4>
                            <p className="fw-medium">Моля, уверете се, че сте въвели правилния имейл адрес. Ако сте
                                сигурни, че сте го въвели правилно и все пак не откривате поръчките си, моля, не се
                                колебайте да се свържете с нас. Нашите служители са тук, за да ви помогнат и
                                разрешат всички въпроси или проблеми, които може да имате.</p>
                        </Modal.Body>
                    </>
                )}
            </Modal>

            <Modal className="modal-lg trackOrderModal darkerBackground" centered="true" show={orderModalShow}
                   onHide={handleOrderModalClose} data-bs-theme="dark">
                {orderStatus && (
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <FaEnvelopeCircleCheck className="mb-1 me-2 successColor" />
                                Поръчка намерена успешно.</Modal.Title>
                            <button className="closingModalButton" onClick={handleOrderModalClose}><FaTimes /></button>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor" />
                                Поръчка с номер {codeInput} беше намерена успешно.</h4>
                            <p className="fw-medium">Благодарим ви, че избрахте нашата услуга. Моля, проверете вашата
                                електронна поща за подробности относно поръчката.</p>
                        </Modal.Body>
                    </>
                )}

                {!orderStatus && (
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <FaTimesCircle className="mb-1 me-2 errorColor" />
                                Поръчка не е намерена.
                            </Modal.Title>
                            <button className="closingModalButton" onClick={handleOrderModalClose}><FaTimes /></button>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor" />
                                Извинявайте, поръчка с номер {codeInput} не беше намерена.</h4>
                            <p className="fw-medium">Моля, уверете се, че сте въвели правилния номер на поръчката. Ако
                                се съмнявате или имате въпроси, не се колебайте да се свържете с нас за помощ.</p>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>
    );
}

export default TrackOrderModal;
