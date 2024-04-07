import React, {useEffect, useState} from "react";
import {getProductBySkuAndModelId} from "../../Service/ProductService";
import './Product.css'
import {Dropdown} from "react-bootstrap";
import BarChart from "./BarChart/BarChart";
import {FaCartPlus, FaRulerCombined, FaRulerHorizontal, FaStar, FaWeightHanging} from "react-icons/fa";
import DoughnutChart from "./DoughnutChart/DoughnutChart";
import {BiSolidCategory} from "react-icons/bi";
import {MdOutlineMoneyOffCsred} from "react-icons/md";
import {IoIosPricetag} from "react-icons/io";
import {GiWrappedSweet} from "react-icons/gi";

function Product() {
    const [product, setProduct] = useState();
    const [tasteData, setTasteData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const modelId = localStorage.getItem("modelId");
                const sku = localStorage.getItem("sku");
                if (modelId && sku && !product) {
                    const data = await getProductBySkuAndModelId(sku, modelId);
                    console.log(data)
                    setProduct(data);
                }
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

    return (
        <div className="productContainer">
            {product ? (
                <>
                    <div className="leftSection">
                        <div className="productCard">
                            <div className="imageContainer me-4">
                                {tasteData && (
                                    <div className="doughnutChartContainer">
                                        <DoughnutChart data={doughnutData}/>
                                        <p className="doughnutText">{tasteData.name}</p>
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
                                                    <Dropdown.Item key={index} onClick={() => setTasteData(taste)}>
                                                        <GiWrappedSweet
                                                            className="redColorText mb-1 me-1"/> {taste.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )}

                                {product.size.length > 0 && (
                                    <div className="sizes">
                                        <span className="fw-bolder mt-2">
                                              <span className="keyColorInfo me-2"><FaRulerCombined className="mb-1"/> Размери: </span>
                                        </span>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic"
                                                             className="dropDownButton">
                                                Избери
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {product.size.map((size, index) => (
                                                    <Dropdown.Item key={index}>
                                                        <FaRulerHorizontal
                                                            className="redColorText mb-1 me-1"/> {size.name}
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
                                    <button><FaCartPlus className="mb-1 me-2"/>Добави</button>
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
    );
}

export default Product;
