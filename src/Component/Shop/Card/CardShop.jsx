import React from 'react';
import {Button, Card, Col} from 'react-bootstrap';
import {FaBolt, FaLayerGroup, FaStar, FaWeightHanging} from "react-icons/fa";
import {BiSolidCategory, BiSolidDetail} from "react-icons/bi";
import {IoIosPricetag} from "react-icons/io";
import "./CardShop.css"
import {MdOutlineMoneyOffCsred} from "react-icons/md";
import {Link} from "react-router-dom";

const CardShop = ({product}) => {
    return (
        <Col xl={3} lg={4} md={5} sm={12} className="mb-5">
            <Link to={`/product/${product.modelId}`} className="linkUnderline">
                <Card className="h-100 shopCard">
                    <div className="cardImageContainer">
                        {product.reducedTotalAmountPercentage && <span className="discountText"><FaBolt
                            className="mb-1"/> {product.reducedTotalAmountPercentage.toFixed(2)}%</span>}
                        <Card.Img variant="top" src={product.image} className="cardImage"/>
                    </div>
                    <Card.Body className="shopCardBody">
                        <Card.Title className="cardTitle">{product.name}</Card.Title>
                        <div className="cardText">

                            <span className="fw-medium cardCategory">
                                <span className="keyColorInfo me-2"> <FaLayerGroup className="mb-1"/>Марка</span>
                                <span className="fw-bolder">{product.brandEntity.name}</span>
                            </span>

                            <span className="fw-medium cardCategory mt-1 mb-2">
                                <span className="keyColorInfo me-2"> <BiSolidCategory className="mb-1"/>Категория</span>
                                <span className="fw-bolder">{product.category.substring(0, 14)}</span>
                            </span>

                            <div
                                dangerouslySetInnerHTML={{__html: product.description.replace(/<br\s*\/?>/gi, '')}}
                                className="cardDescription"
                                style={null}
                            />

                            <div className="baseInfo">
                                <span className="fw-medium mt-1">
                                     <span className="keyColorInfo me-2"><FaStar className="mb-1 me-1"/>Рейтинг</span>

                                      <span className="fw-bolder">
                                         {product?.ratingValue.toFixed(1)}/5 ({product?.ratingCount})
                                      </span>
                                </span>

                                {product.weightKg !== "0.000" && (
                                    <span className="fw-medium mt-1">
                                        <span className="keyColorInfo me-2">
                                            <FaWeightHanging className="mb-1 me-1"/>Тегло
                                        </span>
                                        <span className="fw-bolder">
                                            {product.weightKg} кг.
                                        </span>
                                    </span>)}

                                <span className="fw-medium mt-1">
                                    <span className="keyColorInfo me-2"><MdOutlineMoneyOffCsred
                                        className="mb-1 me-1"/>
                                        Редовна цена
                                    </span>
                                    <span className="strikeText fw-bolder">
                                        {product.regularPrice.toFixed(2)} лв.
                                    </span>
                                </span>

                                <span className="fw-medium mt-1">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPricetag className="mb-1"/> Намалена цена
                                    </span>
                                    <span className="fw-bolder">
                                        {product.discountedPrice.toFixed(2)} лв.
                                    </span>
                                </span>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Footer className="cardFooter">
                        <Button className="detailsButton">
                            <BiSolidDetail className="me-2 myGreenBlueColor"/>Виж детайли
                        </Button>
                    </Card.Footer>
                </Card>
            </Link>
        </Col>
    );
}

export default CardShop;
