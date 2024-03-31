import React, {useEffect, useState} from 'react';
import {Col, Container, Pagination, Row} from 'react-bootstrap';
import "./Shop.css"
import {getAllSellableProducts} from "../../Service/ProductService";
import CardSkeletonLoader from "./SkeletonLoader/CardSkeletonLoader";
import CardShop from "./Card/CardShop";
import SearchInput from "./SearchInput/SearchInput";
import DropdownButtons from "./DropDownButtons/DropDownButtons";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedOrderBy, setSelectedOrderBy] = useState('')
    const [selectedDeal, setSelectedDeal] = useState(0)
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

    const filteredProducts = products.filter((product) =>
        (product.name.toLowerCase() + product.description.toLowerCase()).includes(searchQuery.toLowerCase()) &&
        (selectedBrand ? product.brandEntity.name === selectedBrand : true) &&
        (selectedCategory ? product.category === selectedCategory : true) &&
        (Math.abs(product.reducedTotalAmountPercentage) >= selectedDeal)
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

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const selectBrand = (brand) => {
        setSelectedBrand(brand);
        setCurrentPage(1);
    };

    const selectSort = (sort) => {
        setSelectedOrderBy(sort);
        setCurrentPage(1);
        sortProducts(sort);
    };

    const sortProducts = (sortType) => {
        let sortedProducts = [...products];
        switch (sortType) {
            case "Намалена цена":
                sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
                break;
            case "Процент":
                sortedProducts.sort((a, b) => (a.reducedTotalAmountPercentage || 0) - (b.reducedTotalAmountPercentage || 0));
                break;
            case "Рейтинг":
                sortedProducts.sort((a, b) => b.ratingValue - a.ratingValue);
                break;
            case "Ревюта":
                sortedProducts.sort((a, b) => b.ratingCount - a.ratingCount);
                break;
            default:
                break;
        }
        setProducts(sortedProducts);
    };

    const selectFlashDeal = (deal) => {
        setSelectedDeal(deal);
        setCurrentPage(1);
    };

    const clearSortBy = () => {
        setSelectedOrderBy('');
        let sortedProducts = [...products];
        sortedProducts.sort((a, b) => (a.discountedPrice - a.enemyPrice) - (b.discountedPrice - b.enemyPrice));
        setProducts(sortedProducts);
    }

    return (
        <Container>
            <div className="topShopSection">
                <SearchInput
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    clearSearch={clearSearch}
                />

                <DropdownButtons
                    selectedDeal={selectedDeal}
                    isOpenFlashDeals={isOpenFlashDeals}
                    isOpenOrderBy={isOpenOrderBy}
                    isOpenCategory={isOpenCategory}
                    isOpenBrand={isOpenBrand}
                    toggleDropdown={toggleDropdown}
                    selectFlashDeal={selectFlashDeal}
                    selectSort={selectSort}
                    selectCategory={selectCategory}
                    selectBrand={selectBrand}
                    categories={categories}
                    brands={brands}
                    selectedCategory={selectedCategory}
                    selectedBrand={selectedBrand}
                    clearSortBy={clearSortBy}
                    selectedOrderBy={selectedOrderBy}
                />

                <div
                    className={`overlay${isOverlayVisible ? ' visible' : ''}`}
                    onClick={() => {
                        toggleDropdown()
                        setIsOverlayVisible(false)
                    }}>
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

            {filteredProducts.length === 0 && (
                <Row>
                    <div className="noResultsMessage">
                        <span>Sorry, no products were found during the search...</span>
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
