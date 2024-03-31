import React from 'react';
import {Card, Button, Col} from 'react-bootstrap';
import {FaBolt, FaShoppingCart, FaStar, FaWeightHanging} from "react-icons/fa";
import {BiSolidCategory} from "react-icons/bi";
import {IoIosPricetag} from "react-icons/io";
import "./CardShop.css"
import {MdOutlineMoneyOffCsred} from "react-icons/md";

const CardShop = ({product}) => {
    return (
        <Col xl={3} lg={4} md={5} sm={12} className="mb-4">
            <Card className="h-100 shopCard">
                <div className="cardImageContainer">
                    {product.reducedTotalAmountPercentage && <span className="discountText"><FaBolt
                        className="mb-1"/> {product.reducedTotalAmountPercentage.toFixed(2)}%</span>}
                    <Card.Img variant="top" src={product.image} className="cardImage"/>
                </div>
                <Card.Body className="shopCardBody">
                    <Card.Title className="cardTitle">{product.name}</Card.Title>
                    <Card.Text className="cardText">
                        <span className="fw-bolder mt-2 cardCategory">
                            <span className="keyColorInfo"> <BiSolidCategory className="mb-1"/> Категория: </span>
                            {product.category}
                        </span>

                        <div dangerouslySetInnerHTML={{__html: product.description.replace(/<br\s*\/?>/gi, '')}}
                             className="cardDescription" style={null}/>

                        <div className="baseInfo">
                            <span className="fw-bolder mt-2">
                                <span className="keyColorInfo"> <FaStar className="mb-1"/> Рейтинг: </span>
                                {product.ratingValue}/5 ({product.ratingCount})
                            </span>

                            {product.weightKg !== "0.000" && (
                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo"> <FaWeightHanging className="mb-1"/> Тегло: </span>
                                    {product.weightKg} кг.
                                </span>
                            )}

                            <span className="fw-bolder mt-2">
                                  <span className="keyColorInfo strikeText"> <MdOutlineMoneyOffCsred  className="mb-1"/> Редовна цена: </span>
                                <span className="strikeText">{product.enemyPrice.toFixed(2)}лв</span>
                             </span>

                            <span className="fw-bolder mt-2">
                                  <span className="keyColorInfo"> <IoIosPricetag className="mb-1"/> Намалена цена: </span>
                                <span>{product.discountedPrice.toFixed(2)}лв</span>
                             </span>
                        </div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="cardFooter">
                    <Button variant="dark">
                        <FaShoppingCart className="align-baseline me-2"/>
                        Добави
                    </Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default CardShop;
