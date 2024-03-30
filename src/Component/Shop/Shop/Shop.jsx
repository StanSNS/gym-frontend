import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Dropdown, Pagination, Row} from 'react-bootstrap';
import "./Shop.css"
import {FaListAlt, FaSearch, FaSort, FaTimes} from "react-icons/fa";
import {FaBolt} from "react-icons/fa6";
import {getAllSellableProducts} from "../../../Service/ProductService";
import CardSkeletonLoader from "../SkeletonLoader/CardSkeletonLoader";
import CardShop from "../Card/CardShop";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 20;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSellableProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching sellable products:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1);
    };

    // Pagination logic
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    // Logic to display 5 boxes of pages with current page in the middle
    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);
    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                {products.length === 0 ? (
                    <CardSkeletonLoader/>
                ) : (
                    currentProducts.map((product, index) => (
                        <CardShop key={index} product={product}/>
                    ))
                )}
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
                        {pageNumbers.slice(startPage - 1, endPage).map((number) => (
                            <Pagination.Item key={number} onClick={() => paginate(number)}
                                             active={number === currentPage}>
                                {number}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;