import React, {useEffect, useState} from "react";
import {checkIfProductExists, getProductByModelId,} from "../../Service/ProductService";
import './Product.css'
import {Button, Dropdown, Modal} from "react-bootstrap";
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
import {IoColorFilter} from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {addToCart, getSelectedProductFromStorage, setSelectedProductFromStorage} from "../../Service/localStorageUtils";

function Product() {
    const [product, setProduct] = useState(() => {
        const savedProduct = getSelectedProductFromStorage();
        return savedProduct ? savedProduct : null;
    });
    const [tasteData, setTasteData] = useState(null);
    const [selectedTaste, setSelectedTaste] = useState(null);
    const [selectTasteErrorModal, setSelectTasteErrorModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showUnavailableProductErrorModal, setShowUnavailableProductErrorModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [isProductCheckIsLoading, setIsProductCheckIsLoading] = useState(false);
    const [unavailableTastes] = useState(new Set());
    const navigator = useNavigate();

    useEffect(() => {
        fetchSingleProduct();
        // eslint-disable-next-line
    }, [product]);

    const fetchSingleProduct = async () => {
        try {
            const modelId = localStorage.getItem("modelId");
            if (modelId) {
                setIsDataLoading(true)
                const data = await getProductByModelId(modelId);
                setProduct(data);
                setSelectedProductFromStorage(data)
                localStorage.removeItem("modelId");
                localStorage.removeItem("sku");
                unavailableTastes.clear()
                setSelectedTaste(null)
            }
        } catch (error) {
            navigator("/internal-server-error");
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
        colors: ['#0fffa4', '#333'],
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
                setSelectTasteErrorModal(true);
            } else {
                checkProductAvailability(product)
            }
        }
    }

    const checkProductAvailability = async (product) => {
        try {
            setIsProductCheckIsLoading(true)
            const data = await checkIfProductExists(product?.brandEntity.brandID, product.modelId, selectedTaste?.silaTasteID);
            if (data.status === 204) {
                if (product.taste.length > 0) {
                    setShowErrorModal(true);
                    unavailableTastes.add(selectedTaste?.name)
                    setSelectedTaste(null)
                } else {
                    setShowUnavailableProductErrorModal(true);
                }
            } else if (data.status === 200) {
                setShowSuccessModal(true);
                addToCart(product, selectedTaste);
            }
            setIsProductCheckIsLoading(false)
        } catch (error) {
            navigator("/internal-server-error");
            console.error("Failed to check product," + error)
        }
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
                                            <h3 className="text-center mb-4">{product?.name} - {product?.brandEntity.name}</h3>

                                            <div className="fw-bolder">
                                                <span className="keyColorInfo me-2">
                                                    <BiSolidCategory className="mb-1"/>Категория
                                                </span>
                                                {product.category}
                                            </div>

                                            {product.weightKg !== "0.000" && (
                                                <div className="fw-bolder mt-2">
                                                     <span className="keyColorInfo me-2">
                                                         <FaWeightHanging className="mb-1"/>Тегло
                                                     </span>
                                                    {product.weightKg} кг.
                                                </div>
                                            )}

                                            <div className="fw-bolder mt-2">
                                                <span className="keyColorInfo me-2">
                                                    <MdOutlineMoneyOffCsred className="mb-1"/>Редовна цена
                                                </span>
                                                <span className="strikeText">
                                                   {product.regularPrice.toFixed(2)} лв.
                                               </span>
                                            </div>

                                            <div className="fw-bolder mt-2">
                                                <span className="keyColorInfo me-2">
                                                    <IoIosPricetag className="mb-1"/>Намалена цена
                                                </span>
                                                <span>
                                                     {product.discountedPrice.toFixed(2)} лв.
                                               </span>
                                            </div>

                                            {product.taste.length > 0 && (
                                                <div className="tastes mt-2">
                                                    <div className="fw-bolder">
                                                          <span className="keyColorInfo me-2">
                                                              <GiWrappedSweet className="mb-1"/>Вкусове
                                                          </span>
                                                    </div>

                                                    <Dropdown>
                                                        <Dropdown.Toggle variant={"dark"} id="dropdown-basic"
                                                                         className="dropDownButton fw-bolder">
                                                            <IoColorFilter className="mb-1 me-2 myGreenBlueColor"/>
                                                            Избери вкус
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="fw-bolder">
                                                            {product?.taste.map((taste, index) => (
                                                                <Dropdown.Item
                                                                    disabled={unavailableTastes.has(taste.name)}
                                                                    key={index}
                                                                    onClick={() => {
                                                                        if (!unavailableTastes.has(taste.name)) {
                                                                            setTasteData(taste);
                                                                            setSelectedTaste(taste);
                                                                        }
                                                                    }}
                                                                    className={unavailableTastes.has(taste.name) ? "disabled-dropdown-item" : ""}
                                                                >
                                                                    <GiWrappedSweet className="redColorText mb-1 me-2"/>
                                                                    <span className="fw-bold">{taste.name}</span>
                                                                </Dropdown.Item>
                                                            ))}
                                                        </Dropdown.Menu>

                                                    </Dropdown>
                                                </div>
                                            )}

                                            <div className="fw-bolder mt-1">
                                                 <span className="keyColorInfo me-2">
                                                     <FaStar className="mb-1 me-1"/>Рейтинг</span>
                                                {product?.ratingValue.toFixed(1)}/5 ({product?.ratingCount})
                                            </div>

                                            <div className="barChart">
                                                <div className="chartStars">
                                                    <div className="oneStar myGreenBlueColor">
                                                        <FaStar/>
                                                    </div>

                                                    <div className="twoStar myBlackColor">
                                                        <FaStar/>
                                                        <FaStar/>
                                                    </div>

                                                    <div className="threeStars myGreenBlueColor">
                                                        <FaStar/>
                                                        <FaStar/>
                                                        <FaStar/>
                                                    </div>

                                                    <div className="fourStars myBlackColor">
                                                        <FaStar/>
                                                        <FaStar/>
                                                        <FaStar/>
                                                        <FaStar/>
                                                    </div>

                                                    <div className="fiveStars myGreenBlueColor">
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
                                                <button onClick={() => handleAddProductToCart(product)}>
                                                    <FaCartPlus className="mb-1 me-2"/>
                                                    Добави
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
                    </div>

                    <div className="singleProductSwiper">

                        <h1 className="text-center">
                            Още
                            <span className="myGreenBlueColor"> ТОП </span>
                            продукти от
                            <span className="myGreenBlueColor"> {product?.brandEntity.name}</span>
                        </h1>

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
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                            initialSlide={1}
                        >
                            {product?.singleProducts.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <div className="swiperCard">
                                        <img src={product.image} alt={product.name}/>
                                        <div className="singleProductText">
                                            <h4 className="fw-bold text-center">{product.name}</h4>

                                            <div className="fw-bolder mt-2 cardCategory">
                                                  <span className="keyColorInfo me-2">
                                                      <BiSolidCategory className="mb-1"/>Категория
                                                   </span>
                                                <span className="fs-5">{product.category}</span>
                                            </div>

                                            {product.weightKg !== "0.000" && (
                                                <div className="fw-bolder mt-2">
                                                    <span className="keyColorInfo me-2">
                                                        <FaWeightHanging className="mb-1"/>Тегло
                                                    </span>
                                                    <span className="fs-5">{product.weightKg} кг.</span>
                                                </div>
                                            )}
                                            <div className="fw-bolder mt-2">
                                                <span className="keyColorInfo me-2">
                                                    <MdOutlineMoneyOffCsred className="mb-1"/>Редовна цена
                                                </span>
                                                <span className="strikeText fs-5">
                                                 {product.regularPrice.toFixed(2)} лв.
                                                </span>
                                            </div>

                                            <div className="fw-bolder mt-2">
                                                <span className="keyColorInfo me-2">
                                                    <IoIosPricetag className="mb-1"/>Намалена цена
                                                </span>
                                                <span className="fs-5">
                                                    {product.discountedPrice.toFixed(2)} лв.
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="loadSingleProductButtonContainer">
                                        <Button className="detailsButton" onClick={() => loadNewProduct(product)}>
                                            <BiSolidDetail className="me-2 myGreenBlueColor"/>Виж детайли
                                        </Button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <Modal show={selectTasteErrorModal} onHide={() => setSelectTasteErrorModal(false)}>
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

                    <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
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

                    <Modal show={showUnavailableProductErrorModal}
                           onHide={() => setShowUnavailableProductErrorModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title><FaTimesCircle className="mb-1 me-2 redColorText"/>Грешка</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="d-flex text-center">
                                <h4>
                                    Избраният от вас продукт не е наличен в момента, молим ви да
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
                </>
            }
        </>

    );
}

export default Product;
