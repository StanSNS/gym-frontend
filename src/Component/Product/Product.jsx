import React, {useEffect, useState} from "react";
import {addToCart, checkIfProductExists, getProductBySkuAndModelId} from "../../Service/ProductService";
import './Product.css'
import {Button, Dropdown, Modal} from "react-bootstrap";
import BarChart from "./BarChart/BarChart";
import {FaCartPlus, FaStar, FaWeightHanging} from "react-icons/fa";
import DoughnutChart from "./DoughnutChart/DoughnutChart";
import {BiSolidCategory} from "react-icons/bi";
import {MdOutlineMoneyOffCsred} from "react-icons/md";
import {IoIosPricetag} from "react-icons/io";
import {GiWrappedSweet} from "react-icons/gi";

function Product() {
    const [product, setProduct] = useState(() => {
        const savedProduct = localStorage.getItem('selectedProduct');
        return savedProduct ? JSON.parse(savedProduct) : null;
    });
    const [tasteData, setTasteData] = useState(null);
    const [selectedTaste, setSelectedTaste] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showTasteModal, setShowTasteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const modelId = localStorage.getItem("modelId");
                const sku = localStorage.getItem("sku");
                if (modelId && sku && !product) {
                    const data = await getProductBySkuAndModelId(sku, modelId);
                    setProduct(data);
                    localStorage.setItem('selectedProduct', JSON.stringify(data));
                }
                localStorage.removeItem("modelId");
                localStorage.removeItem("sku");
            } catch (error) {
                console.error('Error fetching current product:', error);
            }
        };
        fetchData();
    }, [product]);

    const starData = {
        labels: ['', '', "", "", ""],
        values: [product?.oneStarRatingCount, product?.twoStarRatingCount, product?.threeStarRatingCount, product?.fourStarRatingCount, product?.fiveStarRatingCount],
        colors: ['#FFC107FF', '#333'],
    };

    const doughnutData = {
        labels: tasteData?.colorNames.split(',').filter(name => name.trim() !== ''),
        values: new Array(tasteData?.colorNames.split(',').filter(name => name.trim() !== '').length).fill(100),
        colors: tasteData?.colors.split(',').filter(color => color.trim() !== ''),
    };

    const handleAddProductToCart = async (product) => {
        if (!selectedTaste) {
            setShowModal(true);
        } else {
            const data = await checkIfProductExists(product.brandEntity.brandID, product.modelId, selectedTaste?.silaTasteID);
            if (data.status === 204) {
                setShowTasteModal(true);
            } else if (data.status === 200) {
                setShowSuccessModal(true);
                addToCart(product, selectedTaste);
            }
        }
    }


    return (
        <div className="productContainer">
            {product ? (
                <>
                    <div className="leftSection">
                        <div className="productCard">
                            <div className="imageContainer me-4">
                                {selectedTaste && (
                                    <div className="doughnutChartContainer">
                                        <DoughnutChart data={doughnutData}/>
                                        <p className="doughnutText">{selectedTaste.name}</p>
                                    </div>
                                )}
                                <img src={product.image} alt={product.name}/>
                            </div>

                            <div className="productText">
                                <h3 className="text-center">{product.name} - {product.brandEntity.name}</h3>

                                <span className="fw-bolder mt-2 cardCategory">
                                   <span className="keyColorInfo me-2">
                                       <BiSolidCategory className="mb-1"/> Категория:
                                   </span>
                                    {product.category}
                                </span>

                                {product.weightKg !== "0.000" && (
                                    <span className="fw-bolder mt-2">
                                        <span className="keyColorInfo me-2">
                                            <FaWeightHanging className="mb-1"/> Тегло:
                                        </span>
                                        {product.weightKg} кг.
                                    </span>
                                )}

                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo strikeText me-2">
                                        <MdOutlineMoneyOffCsred className="mb-1"/> Редовна цена:
                                    </span>
                                    <span className="strikeText">
                                        {product.regularPrice.toFixed(2)}лв
                                    </span>
                                </span>

                                <span className="fw-bolder mt-2">
                                    <span className="keyColorInfo me-2">
                                        <IoIosPricetag className="mb-1"/> Намалена цена:
                                    </span>
                                    <span>
                                        {product.discountedPrice.toFixed(2)}лв
                                    </span>
                                </span>

                                {product.taste.length > 0 && (
                                    <div className="tastes">
                                        <span className="fw-bolder mt-2">
                                              <span className="keyColorInfo me-2"><GiWrappedSweet className="mb-1"/> Вкусове: </span>
                                        </span>

                                        <Dropdown>
                                            <Dropdown.Toggle variant={"dark"} id="dropdown-basic"
                                                             className="dropDownButton">
                                                Избери
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {product.taste.map((taste, index) => (
                                                    <Dropdown.Item key={index} onClick={() => {
                                                        setTasteData(taste);
                                                        setSelectedTaste(taste);
                                                    }}>
                                                        <GiWrappedSweet
                                                            className="redColorText mb-1 me-1"/> {taste.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )}

                                <span className="fw-bolder">
                                     <span className="keyColorInfo me-2"><FaStar className="mb-1 me-1"/>Рейтинг:</span>
                                    {product?.ratingValue.toFixed(1)}/5 ({product?.ratingCount})
                                </span>
                                <div className="barChart">
                                    <div className="chartStars">
                                        <div className="oneStar yellowStar">
                                            <FaStar/>
                                        </div>

                                        <div className="twoStar blackStar">
                                            <FaStar/>
                                            <FaStar/>
                                        </div>

                                        <div className="threeStars yellowStar">
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div>

                                        <div className="fourStars blackStar">
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div>

                                        <div className="fiveStars yellowStar">
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                            <FaStar/>
                                        </div>
                                    </div>

                                    <BarChart data={starData}/>
                                </div>

                                <div className="addButtonContainer">
                                    <button onClick={() => handleAddProductToCart(product)}><FaCartPlus
                                        className="mb-1 me-2"/>Добави
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="rightSection">
                        <div dangerouslySetInnerHTML={{
                            __html: product.description.indexOf('СИЛА БГ Тийм') !== -1
                                ? product.description.substring(0, product.description.indexOf('СИЛА БГ Тийм'))
                                : product.description
                        }}
                             className="productDescription" style={null}/>
                    </div>

                </>
            ) : (
                <div className="productNotSelectedError">
                    <h1 className="redColorText">Моля изберете продукт...</h1>
                </div>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please select a taste for your product.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showTasteModal} onHide={() => setShowTasteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>The selected taste is not available right now. Please choose another one.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowTasteModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal for successful addition to cart */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>The product has been added to the cart successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Product;
