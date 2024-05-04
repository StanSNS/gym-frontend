import React, {useState} from "react";
import './FAQ.css'
import {Accordion} from "react-bootstrap";
import {faqData} from "../../Resources/FAQ/faqData";
import {FaMoneyBillWave, FaQuestionCircle, FaShieldAlt, FaShoppingBag, FaTruck, FaUndo} from 'react-icons/fa';
import {BiSupport} from "react-icons/bi";

function FAQ() {
    const [selectedTypes, setSelectedTypes] = useState([]);

    const getIconByType = (type) => {
        switch (type) {
            case 'delivery':
                return <FaTruck className="mb-1 me-2 deliveryIconColor"/>;
            case 'product':
                return <FaShoppingBag className="mb-1 me-2 productIconColor"/>;
            case 'refund':
                return <FaUndo className="mb-1 me-2 returnIconColor"/>;
            case 'privacy':
                return <FaShieldAlt className="mb-1 me-2 privacyIconColor"/>;
            case 'payment':
                return <FaMoneyBillWave className="mb-1 me-2 paymentIconColor"/>;
            case 'support':
                return <BiSupport className="mb-1 me-2 supportIconColor"/>;
            default:
                return null;
        }
    };

    const getButtonNameByType = (type) => {
        switch (type) {
            case 'delivery':
                return "Доставка";
            case 'product':
                return "Продукт";
            case 'refund':
                return "Връщане";
            case 'privacy':
                return "Сигурност";
            case 'payment':
                return "Плащане";
            case 'support':
                return "Помощ";
            default:
                return null;
        }
    };

    const toggleType = (type) => {
        if (selectedTypes.includes(type)) {
            setSelectedTypes(selectedTypes.filter(selectedType => selectedType !== type));
        } else {
            setSelectedTypes([...selectedTypes, type]);
        }
    };

    const isSelected = (type) => {
        return selectedTypes.includes(type);
    };

    const faqItems = selectedTypes.length === 0 ? faqData : faqData.filter(data => selectedTypes.includes(data.type));

    return (
        <div className="faqSection">
            <h1 className="mt-4 fw-bolder d-flex ">
                Често задавани въпроси (ЧЗВ)
                <div className="customIcon ms-2 d-flex mt-1">
                    <FaQuestionCircle className=""/>
                </div>
            </h1>

            <div className="faqSortingButtons">
                {['delivery', 'product', 'refund', 'privacy', 'payment', 'support'].map(type => (
                    <button
                        key={type}
                        className={isSelected(type) ? 'selectedFaqButton' : 'faqButton'}
                        onClick={() => toggleType(type)}
                    >
                        {getIconByType(type)}{getButtonNameByType(type)}
                    </button>
                ))}
            </div>

            <div className="faqContent">
                <Accordion>
                    {faqItems.map((faqData, index) => (
                        <Accordion.Item eventKey={index} key={index} className="mt-3">
                            <Accordion.Header className="mt-2">
                                <div className="faqIconWrapper">{getIconByType(faqData.type)}</div>
                                <span className="mb-1 fw-bolder fs-5"> {faqData.title}</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="accBodyBorder"></div>
                                {faqData.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default FAQ;
