import React, {useEffect, useState} from "react";
import {addToCart, checkIfProductExists, getProductBySkuAndModelId} from "../../Service/ProductService";
import './Product.css'
import {Dropdown, Modal} from "react-bootstrap";
import BarChart from "./BarChart/BarChart";
import {FaCartPlus, FaCheckCircle, FaStar, FaTimesCircle, FaWeightHanging} from "react-icons/fa";
import DoughnutChart from "./DoughnutChart/DoughnutChart";
import {BiSolidCategory, BiSolidDetail} from "react-icons/bi";
import {MdOutlineMoneyOffCsred} from "react-icons/md";
import {IoIosPricetag} from "react-icons/io";
import {GiWrappedSweet} from "react-icons/gi";
import Loader from "../STATIC/Loader/Loader";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCoverflow, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

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
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isProductCheckIsLoading, setIsProductCheckIsLoading] = useState(false);

    useEffect(() => {
        fetchSingleProduct();
    }, [product]);

    const fetchSingleProduct = async () => {
        try {
            const modelId = localStorage.getItem("modelId");
            const sku = localStorage.getItem("sku");
            if (modelId && sku) {
                setIsDataLoading(true)
                const data = await getProductBySkuAndModelId(sku, modelId);
                console.log(data)
                setProduct(data);
                localStorage.setItem('selectedProduct', JSON.stringify(data));
                localStorage.removeItem("modelId");
                localStorage.removeItem("sku");
            }
        } catch (error) {
            console.error('Error fetching current product:', error);
        } finally {
            setIsDataLoading(false)
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    };

    const loadNewProduct = (newProduct) => {
        localStorage.setItem('sku', newProduct.sku);
        localStorage.setItem('modelId', newProduct.modelId);
        fetchSingleProduct()
    };


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

    const handleAddProductToCart = (product) => {
        if (product.taste.length === 0) {
            checkProductAvailability(product)
        } else {
            if (!selectedTaste) {
                setShowModal(true);
            } else {
                checkProductAvailability(product)
            }
        }
    }

    const checkProductAvailability = async (product) => {
        setIsProductCheckIsLoading(true)
        const data = await checkIfProductExists(product.brandEntity.brandID, product.modelId, selectedTaste?.silaTasteID);
        if (data.status === 204) {
            setShowTasteModal(true);
        } else if (data.status === 200) {
            setShowSuccessModal(true);
            addToCart(product, selectedTaste);
        }
        setIsProductCheckIsLoading(false)
    }

    return (
        <>
            {isDataLoading ? (
                    <div className="vh-100">
                        <Loader/>
                    </div>
                ) :

                <>
                    <div className="productContainer">
                        {product ? (
                            <>
                                {isProductCheckIsLoading && (
                                    <Loader/>
                                )}
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
                                <Modal.Title><FaTimesCircle className="mb-1 me-2 redColorText"/>Грешка</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="d-flex text-center">
                                    <h4>
                                        Моля преди да добавите продукта в кошницата си,
                                        <span className="redColorText"> изберете вкус </span>
                                        за него.
                                    </h4>
                                </div>
                            </Modal.Body>
                        </Modal>
                        <Modal show={showTasteModal} onHide={() => setShowTasteModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title><FaTimesCircle className="mb-1 me-2 redColorText"/>Грешка</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="d-flex text-center">
                                    <h4>
                                        Избраният от вас вкус не е наличен в момента, молим ви да
                                        <span className="redColorText"> изберете друг.</span>
                                    </h4>
                                </div>
                            </Modal.Body>
                        </Modal>

                        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title><FaCheckCircle className="mb-1 me-2 successColor"/>Продукта беше
                                    добавен</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="d-flex text-center">
                                    <h4>
                                        Избраният от вас продукт беше добавен успшно в кошницата.
                                    </h4>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>

                    <div className="singleProductSwiper">

                        <h1 className="text-center">Още <span className="redColorText">ТОП</span> продукти от марка <span className="redColorText">{product.brandEntity.name}</span></h1>

                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={3}
                            coverflowEffect={{
                                rotate: 60,
                                stretch: 0,
                                depth: 100,
                                modifier: 1,
                                slideShadows: false,
                            }}
                            pagination={false}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                            initialSlide={1}
                        >
                            {product.singleProducts.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <div className="swiperCard">
                                        <img src={product.image} alt={product.name}/>
                                        <div className="singleProductText">
                                            <h4>{product.name}</h4>

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
                                        </div>
                                    </div>

                                    <div className="loadSingleProductButtonContainer">
                                        <button className="newProductButton" onClick={() => loadNewProduct(product)}>
                                            <span> <BiSolidDetail className="mb-1 me-2 "/>Детайли</span>
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}

                        </Swiper>
                    </div>
                </>


            }
        </>

    );
}

export default Product;
