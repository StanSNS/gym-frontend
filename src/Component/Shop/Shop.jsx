import React, {useEffect, useRef, useState} from 'react';
import {Col, Container, Pagination, Row} from 'react-bootstrap';
import "./Shop.css"
import {FaLayerGroup, FaListAlt, FaSort} from "react-icons/fa";
import {FaBolt} from "react-icons/fa6";
import {getAllSellableProducts} from "../../Service/ProductService";
import CardSkeletonLoader from "./SkeletonLoader/CardSkeletonLoader";
import CardShop from "./Card/CardShop";
import SearchInput from "./SearchInput/SearchInput";
import {Link} from "react-router-dom";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const productsPerPage = 20;

    const [isOpenFlashDeals, setIsOpenFlashDeals] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenOrderBy, setIsOpenOrderBy] = useState(false);
    const [isOpenBrand, setIsOpenBrand] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllSellableProducts();
                console.log(data)
                setProducts(data.products);
                setBrands(data.brands);
                setCategories(data.categories);
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

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    // Filter products based on search query and selected category
    const filteredProducts = products.filter((product) =>
        (product.name.toLowerCase() + product.description.toLowerCase()).includes(searchQuery.toLowerCase()) &&
        (selectedBrand ? product.brandEntity.name === selectedBrand : true) &&
        (selectedCategory ? product.category === selectedCategory : true)
    );
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxPagesToShow = 5;
    const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPagesToShow, 1);
    const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);
    if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleDropdown = (dropdown) => {
        setIsOpenFlashDeals(dropdown === 'flashDeals' ? !isOpenFlashDeals : false);
        setIsOpenCategory(dropdown === 'category' ? !isOpenCategory : false);
        setIsOpenOrderBy(dropdown === 'orderBy' ? !isOpenOrderBy : false);
        setIsOpenBrand(dropdown === 'brand' ? !isOpenBrand : false);
        setIsOverlayVisible(!isOverlayVisible);
    };

    // Function to handle category selection
    const selectCategory = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const selectBrand = (brand) => {
        setSelectedBrand(brand);
        setCurrentPage(1);
    };

    return (
        <Container>
            <div className="topShopSection">
                <SearchInput
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    clearSearch={clearSearch}
                />

                <div className="dropDownButtons">
                    <div className="dropdown" ref={useRef(null)}>
                        <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                                onClick={() => toggleDropdown('flashDeals')}>
                            <FaBolt className="me-1"/>Топ Оферти
                        </button>
                        <div className={`dropdown-menu${isOpenFlashDeals ? ' show' : ''} mt-1`}>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('flashDeals')}>
                                -70% Off
                            </Link>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('flashDeals')}>
                                -50% Off
                            </Link>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('flashDeals')}>
                                -30% Off
                            </Link>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('flashDeals')}>
                                -15% Off
                            </Link>
                        </div>
                    </div>

                    <div className="dropdown" ref={useRef(null)}>
                        {selectedCategory && (
                            <button className="halfButton" onClick={() => setSelectedCategory('')}>
                                {selectedCategory.split(" ")[0].split("-")[0]}
                            </button>
                        )}
                        <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                                onClick={() => toggleDropdown('category')}>
                            <FaListAlt className="me-1"/>Категория
                        </button>
                        <div className={`dropdown-menu${isOpenCategory ? ' show' : ''} mt-1 myScrollable`} style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                        }}>
                            {categories.map((item, index) => {
                                const category = Object.keys(item)[0];
                                const quantity = item[category];

                                return (<Link
                                    key={index}
                                    to="#"
                                    className={`dropdown-item fw-bolder${selectedCategory === category ? ' active' : ''}`}
                                    onClick={() => {
                                        toggleDropdown('category');
                                        selectCategory(category);
                                    }}
                                >
                                    <span className="redColorText">{'{'}{quantity}{'}'}</span> {category}
                                </Link>);
                            })}
                        </div>
                    </div>

                    <div className="dropdown" ref={useRef(null)}>
                        <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                                onClick={() => toggleDropdown('orderBy')}>
                            <FaSort className="me-1"/>Подреди по
                        </button>
                        <div className={`dropdown-menu${isOpenOrderBy ? ' show' : ''} mt-1`}>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('orderBy')}>
                                Price
                            </Link>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('orderBy')}>
                                Newest
                            </Link>
                            <Link to={"#"} className="dropdown-item" onClick={() => toggleDropdown('orderBy')}>
                                Rating
                            </Link>
                        </div>
                    </div>

                    <div className="dropdown myDropDownButton" ref={useRef(null)}>
                        {selectedBrand && (
                            <button className="halfButton" onClick={() => setSelectedBrand('')}>
                                {selectedBrand.split(" ")[0]}
                            </button>
                        )}
                        <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                                onClick={() => toggleDropdown('brand')}>
                            <FaLayerGroup className="me-1"/>Марка
                        </button>
                        <div className={`dropdown-menu${isOpenBrand ? ' show' : ''} mt-1 myScrollable`} style={{
                            maxHeight: '500px',
                            overflowY: 'auto',
                        }}>
                            {brands.map((item, index) => {
                                const brand = Object.keys(item)[0];
                                const quantity = item[brand];

                                return (<Link
                                        key={index}
                                        to={"#"}
                                        className={`dropdown-item fw-bolder${selectedBrand === brand ? ' active' : ''}`}
                                        onClick={() => {
                                            toggleDropdown('brand');
                                            selectBrand(brand)
                                        }}>
                                        <span className="redColorText">{'{'}{quantity}{'}'}</span> {brand}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div
                    className={`overlay${isOverlayVisible ? ' visible' : ''}`}
                    onClick={() => {
                        toggleDropdown()
                        setIsOverlayVisible(false)
                    }}
                ></div>
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
