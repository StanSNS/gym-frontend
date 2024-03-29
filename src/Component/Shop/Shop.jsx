import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Dropdown, Pagination, Row} from 'react-bootstrap';
import "./Shop.css"
import {FaListAlt, FaSearch, FaShoppingCart, FaSort, FaTimes} from "react-icons/fa";
import {CgDollar} from "react-icons/cg";
import {FaBolt} from "react-icons/fa6";
import {BiSolidCategory} from "react-icons/bi";
import {getAllSellableProducts} from "../../Service/ProductService";

const Shop = () => {
    const [products, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 16;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1);

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSellableProducts();
                setProducts(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching sellable products:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Container>
            <div className="topShopSection">
                <div className="searchInputContainer">
                    <h4 className="fw-bolder"><FaSearch className="mb-1"/> Search:</h4>

                    <input
                        maxLength={20}
                        type="text"
                        className="searchInput"
                        placeholder="Search for product..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />

                    {searchQuery && (
                        <Button variant={"dark"} className="inputClearButton fw-bolder ms-2" onClick={clearSearch}>
                            Clear <FaTimes/>
                        </Button>
                    )}
                </div>

                <div className="dropDownButtons">
                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <FaBolt className="align-baseline"/>
                            <span className="ms-1 fw-bolder align-text-bottom">Flash Deals</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">-70% Off</Dropdown.Item>
                            <Dropdown.Item href="#/action-1">-50% Off</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">-30% Off</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">-15% Off</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <FaListAlt className="align-baseline"/>
                            <span className="ms-2 fw-bolder align-text-bottom">Category</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Fat Burners</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Proteins</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Gym equipment</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown>
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            <FaSort className="align-baseline"/>
                            <span className="ms-1 fw-bolder align-text-bottom">Order by:</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Price</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Newest</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Rating</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <Row>
                {currentProducts.map((product, index) => (
                    <Col xl={3} lg={4} md={5} sm={12} key={index} className="mb-4">
                        <Card className="h-100 shopCard">
                            <div className="cardImageContainer">
                                {product.discount && <span className="discountText"><FaBolt
                                    className="discountIcon mb-1"/> {product.discount}</span>}
                                <Card.Img variant="top" src={product.image} className="cardImage"/>
                            </div>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text className="cardText">
                                    <span className="fw-bolder mt-2 cardCategory"> <BiSolidCategory
                                        className="mb-1"/> Category: {product.category}</span>
                                    <div dangerouslySetInnerHTML={{ __html: product.description }}  className="cardDescription"/>
                                    {/*<span className="fw-bolder mt-2"><FaStar className="mb-1"/> Rating: {product.rating.toFixed(2)}/5</span>*/}
                                    <span className="fw-bolder mt-2"> <CgDollar
                                        className="mb-1"/> Price: ${product.price}</span>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="dark">
                                    <FaShoppingCart className="align-baseline me-2"/>
                                    Add to cart
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {filteredProducts.length === 0 && searchQuery && (
                <Row>
                    <div className="noResultsMessage">
                        <span>No products found for:</span>
                        <span>'{searchQuery}'.</span>
                    </div>
                </Row>
            )}

            <Row>
                <Col className="d-flex justify-content-center mt-4">
                    <Pagination>
                        {Array.from({length: Math.ceil(products.length / productsPerPage)}, (_, i) => (
                            <Pagination.Item key={i + 1} onClick={() => paginate(i + 1)} active={i + 1 === currentPage}>
                                {i + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;