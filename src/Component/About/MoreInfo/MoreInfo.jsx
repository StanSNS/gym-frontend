import React, {useState} from "react";
import './MoreInfo.css'
import {BiSupport} from "react-icons/bi";
import ContactUsModal from "../../Modals/User/ContactUsModal/ContactUsModal";
import {FaBusinessTime, FaClock} from "react-icons/fa";
import {BsFillCalendarWeekFill} from "react-icons/bs";
import {IoIosInformationCircle} from "react-icons/io";

function MoreInfo() {
    const [showContactUsModal, setShowContactUsModal] = useState(false);

    const handleContactUsModalClose = () => {
        setShowContactUsModal(false);
    };

    return (
        <div className="myWhiteColor">
            <h1 className="fw-bolder text-center"><IoIosInformationCircle className="mb-2 me-2 myGreenBlueColor"/>Още информация</h1>
            <div className="moreDetails">

                <div className="contactInfo">
                    <span className="fs-3 fw-bolder"><FaBusinessTime className="mb-1 me-2 myGreenBlueColor"/>Работно време:</span>
                    <span className="fs-4 fw-medium">
                        <BsFillCalendarWeekFill className="mb-1 me-2 myGreenBlueColor"/>От понеделник
                        <span className="ms-2 me-2">-</span>
                        <BsFillCalendarWeekFill className="mb-1 me-2 myGreenBlueColor"/>До неделя</span>

                    <div className="d-flex fs-4 mb-2">
                        <div className="me-2">
                            <FaClock className="mb-1 me-1 myGreenBlueColor"/>
                            <span className="fw-medium">От 10:00 ч.</span>
                        </div>

                        <span>-</span>

                        <div className="ms-2">
                            <FaClock className="mb-1 me-1 myGreenBlueColor"/>
                            <span className="fw-medium">До 20:00 ч.</span>
                        </div>
                    </div>

                    <button className="contactUsButton mt-4" onClick={() => setShowContactUsModal(true)}>
                        <BiSupport className="mb-1 me-1"/> Свържи се с нас
                    </button>
                </div>

                <div className="companyInfo">
                    Добре дошли в нашия онлайн магазин за хранителни добавки! Ние сме вашата дестинация за
                    висококачествени продукти, които подпомагат здравословния ви начин на живот. Ние предлагаме
                    разнообразие от добавки за вашето благополучие, избрано с грижа за вашия комфорт и удобство.
                    <br/>
                    <br/>
                    В нашия магазин няма физически обекти - всичко е достъпно само онлайн, за да можете да пазарувате от
                    всяко място, по всяко време. С нас можете да разгледате богатия ни асортимент, да получите
                    информация за продуктите и да направите вашите покупки с лекота и увереност.
                    <br/>
                    <br/>
                    Благодарим ви, че избрахте нас за вашия източник на хранителни добавки. Станете част от нашата
                    общност и започнете пътя си към по-здравословен начин на живот днес!
                </div>


            </div>


            <ContactUsModal show={showContactUsModal} handleClose={handleContactUsModalClose}/>
        </div>

    );
}

export default MoreInfo;