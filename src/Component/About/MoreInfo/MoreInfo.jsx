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
            <h1 className="fw-bolder text-center"><IoIosInformationCircle className="mb-2 me-2 myGreenBlueColor"/>Още
                информация</h1>
            <div className="moreDetails">

                <div className="contactInfo">
                    <span className="fs-3 fw-bolder"><FaBusinessTime className="mb-1 me-2 myGreenBlueColor"/>Работно време:</span>
                    <span className="fs-4 fw-medium">
                        <BsFillCalendarWeekFill className="mb-2 me-2 myGreenBlueColor"/>От понеделник
                        <span className="ms-2 me-2">-</span>
                        <BsFillCalendarWeekFill className="mb-2 me-2 myGreenBlueColor"/>До неделя</span>

                    <div className="d-flex fs-4 mb-2">
                        <div className="me-2">
                            <FaClock className="mb-2 me-2 myGreenBlueColor"/>
                            <span className="fw-medium">От 10:00 ч.</span>
                        </div>

                        <span>-</span>

                        <div className="ms-2">
                            <FaClock className="mb-2 me-2 myGreenBlueColor"/>
                            <span className="fw-medium">До 20:00 ч.</span>
                        </div>
                    </div>

                    <button className="contactUsButton mt-4" onClick={() => setShowContactUsModal(true)}>
                        <BiSupport className="mb-1 me-1"/> Свържи се с нас
                    </button>
                </div>

                <div className="companyInfo">
                    Добре дошли в нашия
                    <span className="myGreenBlueColor"> онлайн магазин </span>
                    за
                    <span className="myGreenBlueColor"> хранителни добавки</span>
                    ! Ние сме вашата дестинация за
                    <span className="myGreenBlueColor"> висококачествени продукти</span>
                    , които подпомагат
                    <span className="myGreenBlueColor"> здравословния </span>
                    ви начин на живот. Ние предлагаме
                    разнообразие от добавки за вашето
                    <span className="myGreenBlueColor"> благополучие</span>
                    , избрано с грижа за вашия
                    <span className="myGreenBlueColor"> комфорт </span>
                    и
                    <span className="myGreenBlueColor"> удобство</span>
                    .
                    <br/>
                    <br/>
                    Нашият магазин няма физически обекти - всичко е
                    <span className="myGreenBlueColor"> достъпно само онлайн</span>
                    , за да можете да пазарувате от
                    <span className="myGreenBlueColor"> всяко място</span>
                    , по
                    <span className="myGreenBlueColor"> всяко време</span>
                    . С нас можете да разгледате
                    <span className="myGreenBlueColor"> богатия </span>
                    ни
                    <span className="myGreenBlueColor"> асортимент</span>
                    , да получите информация за продуктите и да
                    <span className="myGreenBlueColor"> направите </span>
                    вашите
                    <span className="myGreenBlueColor"> покупки </span>
                    с
                    <span className="myGreenBlueColor"> лекота </span>
                    и
                    <span className="myGreenBlueColor"> увереност</span>
                    .
                    <br/>
                    <br/>
                    <span className="myGreenBlueColor">Благодарим ви</span>
                    , че избрахте нас за вашия
                    <span className="myGreenBlueColor"> източник </span>
                    на хранителни добавки. Станете част от нашата
                    <span className="myGreenBlueColor"> общност </span>
                    и започнете пътя си към
                    <span className="myGreenBlueColor"> по-здравословен </span>
                    начин на живот днес!
                </div>
            </div>

            <ContactUsModal show={showContactUsModal} handleClose={handleContactUsModalClose}/>
        </div>

    );
}

export default MoreInfo;