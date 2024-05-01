import React, {useState} from "react";
import './MoreInfo.css'
import {BiSupport} from "react-icons/bi";
import ContactUsModal from "../../Modals/User/ContactUsModal/ContactUsModal";
import {FaClock} from "react-icons/fa";

function MoreInfo() {
    const [showContactUsModal, setShowContactUsModal] = useState(false);

    const handleContactUsModalClose = () => {
        setShowContactUsModal(false);
    };

    return (
        <>
            <h3 className="fw-bolder text-center">Детайли</h3>
            <div className="moreDetails">

                <div className="contactInfo">
                    <span className="fs-4 fw-bolder">Свържете се с нас:</span>
                    <div className="d-flex flex-column">
                        <div>
                            <FaClock className="mb-1 me-1"/>
                            <span className="fw-medium">От 10:00</span>
                        </div>

                        <div>
                            <FaClock className="mb-1 me-1"/>
                            <span className="fw-medium">До 20:00</span>
                        </div>

                    </div>
                    <span className="fs-5 fw-medium">(Пенеделник - Неделя)</span>

                    <button className="contactUsButton contactButton mt-2" onClick={() => setShowContactUsModal(true)}>
                        <BiSupport className="mb-1 me-1"/> Свържи се с нас
                    </button>
                </div>

                <div className="companyInfo">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, aspernatur atque cum ducimus
                    eveniet
                    explicabo fugit iure, labore libero nam nihil nobis nulla, odio provident tempora tempore vitae!
                    Accusantium aperiam architecto, at aut doloribus eaque iure maxime officiis recusandae repellat.
                    Aliquam
                    assumenda consequuntur culpa dignissimos doloribus ducimus ea eius facere libero magnam minus natus
                    nemo
                    nesciunt nobis numquam odit officiis omnis quo quod ratione repellat repellendus, rerum sint
                    tempora,
                    voluptate voluptatem voluptates voluptatibus. Animi dolores itaque magnam nesciunt perspiciatis,
                    quae
                    voluptatem. Accusamus atque distinctio doloremque illo iste laudantium magni nisi numquam obcaecati
                    officia officiis, pariatur praesentium quo reiciendis voluptas, voluptates.
                </div>


            </div>


            <ContactUsModal show={showContactUsModal} handleClose={handleContactUsModalClose}/>
        </>

    );
}

export default MoreInfo;