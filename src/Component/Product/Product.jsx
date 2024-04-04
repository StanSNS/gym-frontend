import React, {useEffect, useState} from "react";
import {getProductBySkuAndModelId} from "../../Service/ProductService";
import './Product.css'
import {Dropdown} from "react-bootstrap";
import BarChart from "./BarChart/BarChart";

function Product() {
    const [product, setProduct] = useState();

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
        labels: ['1.0', '2.0', "3.0","4.0", "5.0"],
        values: [111, 40, 30, 11, 85],
        colors: ['orangered', '#333'],
    };

    return (
        <div className="productContainer">
            {product ? (
                <>
                    <div className="leftSection">
                        <div className="imageContainer">
                            <img src={product.image} alt=""/>
                        </div>

                        <div className="productText">
                            <h2>{product.name} - {product.brandEntity.name}</h2>
                            <h5>Категория: {product.category}</h5>
                            <h5>Тегло: {product.weightKg} кг.</h5>
                            <h5>Рейтинг: {product.ratingValue}/5</h5>
                            <h5>Цена: {product.discountedPrice.toFixed(2)} лв.</h5>

                            <div className="tastes">
                                <h5>Вкусове:</h5>

                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        Вкусове
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {product.taste.map((taste, index) => (
                                            <Dropdown.Item key={index}>
                                                {taste.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <div className="tastes">
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

                            <div className="barChart">
                                <BarChart data={starData} />

                            </div>


                        </div>



                    </div>

                    <div className="productDescription">
                        <div dangerouslySetInnerHTML={{
                            __html: product.description.indexOf('СИЛА БГ Тийм') !== -1
                                ? product.description.substring(0, product.description.indexOf('СИЛА БГ Тийм'))
                                : product.description
                        }}
                             className="" style={null}/>
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
