import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import './LoginModal.css';

function LoginModal({ show, handleClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = () => {
        if (email === 'distributionmanager@silabg.com' && password === 'Georgi Petrov') {
            setMessage('Login successful');
        } else {
            setMessage('Invalid email or password');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} className="loginModal" centered="true" data-bs-theme="dark">
            <Modal.Header>
                <Modal.Title>Login</Modal.Title>
                <FaTimes className="loginModalClose" onClick={handleClose} />
            </Modal.Header>
            <Modal.Body>
                <div className="emailLoginContainer">
                    <h5>Email:</h5>
                    <div className="input-wrapper">
                        <input className="input-box" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <span className="underline"></span>
                    </div>
                </div>

                <div className="passwordLoginContainer">
                    <h5>Password: </h5>
                    <div className="input-wrapper">
                        <input className="input-box" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <span className="underline"></span>
                    </div>
                </div>

                <div className="loginButtonContainer">
                    <button className="loginButton" onClick={handleLogin}>
                        Login
                    </button>
                </div>

            </Modal.Body>
            <Modal.Footer>
                {message && <p className={message === 'Login successful' ? 'successLogin' : 'errorLogin'}>{message}</p>}
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
