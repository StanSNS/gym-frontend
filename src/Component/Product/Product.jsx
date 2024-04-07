import React, {useEffect, useState} from "react";
import {getProductBySkuAndModelId} from "../../Service/ProductService";
import './Product.css'
import {Dropdown} from "react-bootstrap";
import BarChart from "./BarChart/BarChart";
import {FaStar} from "react-icons/fa";
import DoughnutChart from "./DoughnutChart/DoughnutChart";

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
                                <h3>{product.name} - {product.brandEntity.name}</h3>
                                <h5>Категория: {product.category}</h5>
                                <h5>Тегло: {product.weightKg} кг.</h5>
                                <h5>Цена: {product.discountedPrice.toFixed(2)} лв.</h5>

                                {product.taste.length > 0 && (
                                    <div className="tastes">
                                        <Dropdown>
                                            <Dropdown.Toggle variant={"dark"} id="dropdown-basic" className="dropDownButton">
                                                Вкусове
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {product.taste.map((taste, index) => (
                                                    <Dropdown.Item key={index} onClick={() => setTasteData(taste)}>
                                                        {taste.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )}

                                {product.size.length > 0 && (
                                    <div className="sizes">
                                        <h5>Размери:</h5>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                                Размери
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {product.size.map((size, index) => (
                                                    <Dropdown.Item key={index}>
                                                        {size.name}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                )}

                                <h4>Рейтинг: {product.ratingValue}/5 ({product.ratingCount})</h4>
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
                                    <button>Добави</button>
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
                <div>
                    Product is not present.
                </div>
            )}
        </div>
    );
}

export default Product;
