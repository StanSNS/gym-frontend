import Modal from "react-bootstrap/Modal";
import Loader from "../../../STATIC/Loader/Loader";
import React, {useState} from "react";
import {FaEnvelopeOpenText, FaInfoCircle, FaLocationArrow, FaTimes, FaTimesCircle} from "react-icons/fa";
import './ContactUsModal.css'
import {BiSupport} from "react-icons/bi";
import {BsEnvelopeAtFill} from "react-icons/bs";
import {sendRequestEmail} from "../../../../Service/EmailService";
import {FaEnvelopeCircleCheck} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";

function ContactUsModal({show, handleClose}) {
    const [isLoading, setIsLoading] = useState(false);
    const [contactModalShow, setContactModalShow] = useState(false);
    const [contactStatus, setContactStatus] = useState(false);
    const [email, setEmail] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigator = useNavigate();

    const handleContactStatusModal = () => {
        setContactModalShow(false)
        handleClose();
    };

    const handleSendEmail = async () => {
        try {
            setIsLoading(true)
            const data = await sendRequestEmail(email, title, description);
            setIsLoading(false)

            if (data.status === 200) {
                setContactStatus(true)
                setContactModalShow(true);
            } else {
                setContactStatus(false)
                setContactModalShow(true);
            }
            setEmail('');
            setTitle('')
            setDescription('')
        } catch (error) {
            navigator("/internal-server-error");
            console.error("Failed to send email: " + error)
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className="trackOrderModal modal-lg" data-bs-theme="dark">
                {isLoading && <Loader/>}

                <Modal.Header>
                    <Modal.Title><BiSupport className="mb-1 me-2 myGreenBlueColor"/>Свържи се с нас</Modal.Title>
                    <button className="closingModalButton" onClick={() => handleContactStatusModal()}><FaTimes/></button>
                </Modal.Header>

                <Modal.Body className="contactModalBody">
                    <h6 className="ms-2"><BsEnvelopeAtFill className="mb-1 me-2 myGreenBlueColor"/>Имейл за контакт:
                    </h6>
                    <input
                        type="text"
                        className="trackOrderInput mt-0 mb-4"
                        placeholder="Моля въвдете вашият имейл за контакт..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h6 className="ms-2"><FaEnvelopeOpenText className="mb-1 me-2 myGreenBlueColor"/>Заглавие:</h6>
                    <input
                        type="text"
                        className="trackOrderInput mt-0 mb-4"
                        placeholder="Моля въвдете заглавието на имейла..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <h6 className="ms-2"><FaEnvelopeOpenText className="mb-1 me-2 myGreenBlueColor"/>Съдържание:</h6>
                    <textarea
                        className="trackOrderInput textArea mt-0 mb-4"
                        placeholder="Моля въведете съдържанието на имейла..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </Modal.Body>

                <Modal.Footer className="removeBorder">
                    <button className="sendEmail mb-4" onClick={handleSendEmail}>
                        <div className="svg-wrapper-1">
                            <div className="svg-wrapper">
                                <FaLocationArrow/>
                            </div>
                        </div>
                        <span>Изпрати запитване</span>
                    </button>
                </Modal.Footer>
            </Modal>

            <Modal className="trackOrderModal darkerBackground" centered="true" show={contactModalShow}
                   onHide={handleContactStatusModal} data-bs-theme="dark">
                {contactStatus && (
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <FaEnvelopeCircleCheck className="mb-1 me-2 successColor"/>
                                Успешно изпратен имейл
                            </Modal.Title>
                            <button className="closingModalButton" onClick={handleContactStatusModal}><FaTimes/></button>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor"/>
                                Получихме вашият имейл
                            </h4>

                            <p className="fw-medium">Имейлът беше изпратен успешно. Ще се сцържем с вас при първа
                                възможност.
                            </p>
                        </Modal.Body>
                    </>
                )}

                {!contactStatus && (
                    <>
                        <Modal.Header>
                            <Modal.Title>
                                <FaTimesCircle className="mb-1 me-2 errorColor"/>
                                Неуспешно изпратен имейл
                            </Modal.Title>
                            <button className="closingModalButton" onClick={handleContactStatusModal}><FaTimes/></button>
                        </Modal.Header>

                        <Modal.Body className="text-center">
                            <h4>
                                <FaInfoCircle className="mb-2 me-2 infoColor"/>
                                Съжаляваме, но не успяхме да получим запитването ви
                            </h4>

                            <p className="fw-medium">Извиняваме се, но имейлът не беше изпратен успешно. Моля, проверете
                                връзката си с интернет или опитайте отново по-късно.</p>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </>

    )
}

export default ContactUsModal;