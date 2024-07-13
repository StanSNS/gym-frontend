import React, {useEffect, useState} from 'react';
import {Col, Container, Pagination, Row} from 'react-bootstrap';
import "./Shop.css"
import {getAllSellableProducts} from "../../Service/ProductService";
import CardShop from "./Card/CardShop";
import SearchInput from "./SearchInput/SearchInput";
import DropdownButtons from "./DropDownButtons/DropDownButtons";
import Loader from "../STATIC/Loader/Loader";
import Hero from "../Hero/Hero";
import {useNavigate} from "react-router-dom";
import {getShopFilters, setShopFilters} from "../../Service/LocalStorageUtils";

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
    const [selectedWeight, setSelectedWeight] = useState("0.0-999999.0");
    const [minWeight, maxWeight] = selectedWeight.split('-').map(parseFloat);
    const productsPerPage = 20;
    const [isOpenFlashDeals, setIsOpenFlashDeals] = useState(false);
    const [isOpenCategory, setIsOpenCategory] = useState(false);
    const [isOpenOrderBy, setIsOpenOrderBy] = useState(false);
    const [isOpenBrand, setIsOpenBrand] = useState(false);
    const [isOpenWeight, setIsOpenWeight] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);
    const navigator = useNavigate();

    const weightData = [
        {id: 1, range: "0 - 0.300"},
        {id: 2, range: "0.300 - 0.500"},
        {id: 3, range: "0.500 - 1.000"},
        {id: 4, range: "1.000 - 2.000"},
        {id: 5, range: "2.000 - 3.500"},
        {id: 6, range: "3.500 - 5.000"},
        {id: 7, range: "5.000 - 20.000"}
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsDataLoading(true);
            try {
                const data = await getAllSellableProducts();
                setProducts(data.products);
                setBrands(data.brands);
                setCategories(data.categories);
            } catch (error) {
                navigator("/internal-server-error");
                console.error('Error fetching sellable products:');
            } finally {
                setIsDataLoading(false);
            }
        };

        const savedFilters = getShopFilters() || {};
        setSearchQuery(savedFilters.searchQuery || '');
        setSelectedCategory(savedFilters.selectedCategory || '');
        setSelectedBrand(savedFilters.selectedBrand || '');
        setSelectedOrderBy(savedFilters.selectedOrderBy || '');
        setSelectedDeal(savedFilters.selectedDeal || 0);
        setSelectedWeight(savedFilters.selectedWeight || '0.0-999999.0');
        setCurrentPage(savedFilters.currentPage || 1);

        fetchData();
    }, [navigator]);

    const handleSearchChange = (e) => {
        const newSearchQuery = e.target.value;
        setSearchQuery(newSearchQuery);
        setCurrentPage(1);
        saveFilters({ searchQuery: newSearchQuery });
    };

    const clearSearch = () => {
        setSearchQuery('');
        setCurrentPage(1);
        saveFilters({ searchQuery: '' });
    };

    const saveFilters = (newFilters) => {
        const savedFilters = getShopFilters() || {};
        const updatedFilters = { ...savedFilters, ...newFilters };
        setShopFilters(updatedFilters)
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = products.filter((product) =>
        (product.name.toLowerCase() + product.description.toLowerCase()).includes(searchQuery.toLowerCase()) &&
        (selectedBrand ? product.brandEntity.name === selectedBrand : true) &&
        (selectedCategory ? product.category === selectedCategory : true) &&
        (Math.abs(product.reducedTotalAmountPercentage) >= selectedDeal) &&
        (product.weightKg >= minWeight && product.weightKg < maxWeight)
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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const heroSectionHeight = document.querySelector('.carouselContainer').offsetHeight;
        window.scrollTo({
            top: heroSectionHeight + 80,
            behavior: "smooth"
        });
        saveFilters({ currentPage: pageNumber });
    };

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const toggleDropdown = (dropdown) => {
        setIsOpenFlashDeals(dropdown === 'flashDeals' ? !isOpenFlashDeals : false);
        setIsOpenCategory(dropdown === 'category' ? !isOpenCategory : false);
        setIsOpenOrderBy(dropdown === 'orderBy' ? !isOpenOrderBy : false);
        setIsOpenBrand(dropdown === 'brand' ? !isOpenBrand : false);
        setIsOpenWeight(dropdown === 'weight' ? !isOpenWeight : false);
        setIsOverlayVisible(!isOverlayVisible);
    };

    const selectCategory = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        saveFilters({ selectedCategory: category });
    };

    const selectBrand = (brand) => {
        setSelectedBrand(brand);
        setCurrentPage(1);
        saveFilters({ selectedBrand: brand });
    };

    const selectSort = (sort) => {
        setSelectedOrderBy(sort);
        setCurrentPage(1);
        sortProducts(sort);
        saveFilters({ selectedOrderBy: sort });
    };

    const sortProducts = (sortType) => {
        let sortedProducts = [...products];
        switch (sortType) {
            case "Цена най-евтино":
                sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
                break;
            case "Цена най-скъпо":
                sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
                break;
            case "Процент най-нисък":
                sortedProducts.sort((a, b) => (b.reducedTotalAmountPercentage || 0) - (a.reducedTotalAmountPercentage || 0));
                break;
            case "Процент най-висок":
                sortedProducts.sort((a, b) => (a.reducedTotalAmountPercentage || 0) - (b.reducedTotalAmountPercentage || 0));
                break;
            case "Тегло най-леко":
                sortedProducts.sort((a, b) => a.weightKg - b.weightKg);
                break;
            case "Тегло най-тежко":
                sortedProducts.sort((a, b) => b.weightKg - a.weightKg);
                break;
            case "Рейтинг най-нисък":
                sortedProducts.sort((a, b) => a.ratingValue - b.ratingValue);
                break;
            case "Рейтинг най-висок":
                sortedProducts.sort((a, b) => b.ratingValue - a.ratingValue);
                break;
            case "Ревюта най-малко":
                sortedProducts.sort((a, b) => a.ratingCount - b.ratingCount);
                break;
            case "Ревюта най-много":
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
        saveFilters({ selectedDeal: deal });
    };

    const selectWeight = (weight) => {
        setSelectedWeight(weight);
        setCurrentPage(1);
        saveFilters({ selectedWeight: weight });
    };

    const clearSortBy = () => {
        setSelectedOrderBy('');
        let sortedProducts = [...products];
        sortedProducts.sort((a, b) => (a.discountedPrice - a.enemyPrice) - (b.discountedPrice - b.enemyPrice));
        setProducts(sortedProducts);
        saveFilters({ selectedOrderBy: '' });
    }

    return (
        <>
            {isDataLoading && <Loader/>}

            <Hero/>

            <Container>
                <div className="topShopSection">
                    <SearchInput
                        myWidth={"100%"}
                        placeHolder="Потърси продукт..."
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        clearSearch={clearSearch}
                    />

                    <DropdownButtons
                        selectedDeal={selectedDeal}
                        isOpenFlashDeals={isOpenFlashDeals}
                        selectFlashDeal={selectFlashDeal}
                        isOpenOrderBy={isOpenOrderBy}
                        isOpenCategory={isOpenCategory}
                        selectCategory={selectCategory}
                        selectedCategory={selectedCategory}
                        isOpenWeight={isOpenWeight}
                        selectWeight={selectWeight}
                        selectedWeight={selectedWeight}
                        isOpenBrand={isOpenBrand}
                        selectBrand={selectBrand}
                        selectedBrand={selectedBrand}
                        brands={brands}
                        toggleDropdown={toggleDropdown}
                        selectSort={selectSort}
                        categories={categories}
                        clearSortBy={clearSortBy}
                        selectedOrderBy={selectedOrderBy}
                        weightData={weightData}
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
                    {currentProducts.map((product, index) => (
                        <CardShop key={index} product={product}/>
                    ))}
                </Row>

                {!isDataLoading && filteredProducts.length === 0 && (
                    <Row>
                        <div className="noResultsMessage">
                            <span>Съжаляваме, но не бяха намерени продукти по време на търсенето...</span>
                        </div>
                    </Row>
                )}

                <Row>
                    <Col className="d-flex justify-content-center mt-2 mb-5">
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
        </>
    );
};

export default Shop;
