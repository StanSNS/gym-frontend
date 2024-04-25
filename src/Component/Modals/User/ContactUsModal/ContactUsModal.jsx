import Modal from "react-bootstrap/Modal";
import Loader from "../../../STATIC/Loader/Loader";
import React, {useState} from "react";
import {FaTimes} from "react-icons/fa";
import './ContactUsModal.css'

function ContactUsModal({show, handleClose}) {
    const [isLoading, setIsLoading] = useState(false);
    const [emailInput, setEmailInput] = useState('');


    return (
        <Modal show={show} onHide={handleClose} className="trackOrderModal modal-lg" data-bs-theme="dark">
            {isLoading && <Loader/>}

            <Modal.Header>
                <Modal.Title>Свържи се с нас</Modal.Title>
                <FaTimes className="loginModalClose" onClick={handleClose}/>
            </Modal.Header>

            <Modal.Body className="contactModalBody">
                <h6 className="ms-2">Имейл за контакт:</h6>
                <input
                    type="text"
                    className="trackOrderInput mt-1"
                    placeholder="Моля въвдете вашият имейл за контакт..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />

                <h6 className="ms-2">Заглавие на имейл:</h6>
                <input
                    type="text"
                    className="trackOrderInput mt-1"
                    placeholder="Моля въвдете заглавието на имейла..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                />

                <h6 className="ms-2">Съдържание на имейл:</h6>
                <textarea
                    className="trackOrderInput textArea mt-1"
                    placeholder="Моля въведете съдържанието на имейла..."
                    // value={emailContent}
                    // onChange={(e) => setEmailContent(e.target.value)}
                ></textarea>
            </Modal.Body>

            <Modal.Footer>
                <button className="contactUs">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Изпрати</span>
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ContactUsModal;