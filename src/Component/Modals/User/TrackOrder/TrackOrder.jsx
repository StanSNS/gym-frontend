import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {FaInfoCircle, FaTimes, FaTimesCircle} from 'react-icons/fa';
import './TrackOrder.css';
import {FaEnvelopeCircleCheck, FaTruckArrowRight} from "react-icons/fa6";
import {HiRefresh} from "react-icons/hi";
import {findOrderByNumber, sendAllOrdersToEmail} from "../../../../Service/OrderService";
import Loader from "../../../STATIC/Loader/Loader";

function TrackOrderModal({show, handleClose}) {
    const [recoverModalShow, setRecoverModalShow] = useState(false);
    const [orderModalShow, setOrderModalShow] = useState(false);
    const [recoveryStatus, setRecoveryStatus] = useState(false);
    const [orderStatus, setOrderStatus] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [codeInput, setCodeInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleRecoverModalClose = () => {
        setRecoverModalShow(false);
    };

    const handleOrderModalClose = () => {
        setOrderModalShow(false);
    };

    const handleSendAllOrdersToEmail = async () => {
        setIsLoading(true);
        const data = await sendAllOrdersToEmail(emailInput);
        setIsLoading(false);

        if (data.status === 200) {
            setRecoveryStatus(true)
            setRecoverModalShow(true);
        } else {
            setRecoveryStatus(false)
            setRecoverModalShow(true);
        }
    };

    const handleSendOrderEmail = async () => {
        setIsLoading(true);
        const data = await findOrderByNumber(codeInput);
        setIsLoading(false);
        if (data.status === 200) {
            setOrderStatus(true)
            setOrderModalShow(true);
        } else if (data.status === 204) {
            setOrderStatus(false)
            setOrderModalShow(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} className="trackOrderModal" centered="true" data-bs-theme="dark">
                {isLoading && <Loader/>}

                <Modal.Header>
                    <Modal.Title>Проследи своята поръчка</Modal.Title>
                    <FaTimes className="loginModalClose" onClick={handleClose}/>
                </Modal.Header>

                <Modal.Body>
                    <h3 className="text-center">Въведи 10 цифреният код от твоята порчъка</h3>
                    <input
                        type="text"
                        className="trackOrderInput"
                        placeholder="Моля въвдете 10 цифрен код"
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                    />

                    <Button className="trackOrderButtonSubmit fw-bold" onClick={handleSendOrderEmail}>
                        <FaTruckArrowRight className="mb-1 me-2"/>
                        Проследи
                    </Button>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center p-4">
                    <h5 className="text-center">Изгубили сте вашия код ?
                        Проверете имейла си или възстановете вашият код.</h5>

                    <div className="p-3 pt-0 pb-0">
                        <h6 className="text-center mt-4">Въведете имейл на който ще изпратим всички поръчки свързани с
                            него.</h6>
                        <input
                            type="text"
                            className="trackOrderInput mb-2"
                            placeholder="Моля въвдете имейл..."
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </div>

                    <Button className="recoverEmailButton fw-bold" onClick={handleSendAllOrdersToEmail}>
                        <HiRefresh className="mb-1 me-2"/>
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
                                <FaEnvelopeCircleCheck className="mb-1 me-2 successColor"/>
                                Имейл с всички поръчки беше изпратен.
                            </Modal.Title>
                            <FaTimes className="loginModalClose" onClick={handleRecoverModalClose}/>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor"/>
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
                                <FaTimesCircle className="mb-1 me-2 errorColor"/>
                                Няма намерени поръчки.
                            </Modal.Title>
                            <FaTimes className="loginModalClose" onClick={handleRecoverModalClose}/>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor"/>
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
                                <FaEnvelopeCircleCheck className="mb-1 me-2 successColor"/>
                                Поръчка намерена успешно.</Modal.Title>
                            <FaTimes className="loginModalClose" onClick={handleOrderModalClose}/>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor"/>
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
                                <FaTimesCircle className="mb-1 me-2 errorColor"/>
                                Поръчка не е намерена.
                            </Modal.Title>
                            <FaTimes className="loginModalClose" onClick={handleOrderModalClose}/>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor"/>
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
