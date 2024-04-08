import React, {useRef, useState} from 'react';
import {
    FaBolt,
    FaSort,
    FaListAlt,
    FaLayerGroup,
    FaPercentage,
    FaStar,
    FaCommentDots,
    FaWeightHanging, FaTimes, FaBalanceScaleRight
} from "react-icons/fa";
import {IoPricetag} from "react-icons/io5";
import {MdOutlineDoubleArrow} from "react-icons/md";
import {Link} from "react-router-dom";
import "./DropDownButtons.css"
import SearchInput from "../SearchInput/SearchInput";
import {BiSolidCategory} from "react-icons/bi";

const DropdownButtons = ({
                             selectedDeal,
                             isOpenFlashDeals,
                             isOpenOrderBy,
                             isOpenCategory,
                             isOpenBrand,
                             toggleDropdown,
                             selectFlashDeal,
                             selectSort,
                             selectCategory,
                             selectBrand,
                             categories,
                             brands,
                             selectedCategory,
                             selectedBrand,
                             clearSortBy,
                             selectedOrderBy,
                             isOpenWeight,
                             selectWeight,
                             selectedWeight,
                             weightData,
                         }) => {
    const flashDealsRef = useRef(null);
    const orderByRef = useRef(null);
    const categoryRef = useRef(null);
    const brandRef = useRef(null);
    const weightRef = useRef(null);

    const [categorySearchQuery, setCategorySearchQuery] = useState('');
    const [brandSearchQuery, setBrandSearchQuery] = useState('');

    return (
        <div className="dropDownButtons">
            {/* Flash Deals */}
            <div className="dropdown" ref={flashDealsRef}>
                {selectedDeal !== 0 && (
                    <button className="halfButton" onClick={() => selectFlashDeal(0)}>
                        <span>Над -{selectedDeal}<FaPercentage/></span>
                        <FaTimes className="deleteIcon"/>
                    </button>
                )}

                <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                        onClick={() => toggleDropdown('flashDeals')}>
                    <FaBolt className="me-1"/>Топ Оферти
                </button>
                <div className={`dropdown-menu${isOpenFlashDeals ? ' show' : ''} mt-1`}>
                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(70);
                    }}><MdOutlineDoubleArrow className="redColorText mb-1 rotateIcon"/> Над -70%
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(50);
                    }}><MdOutlineDoubleArrow className="redColorText mb-1 rotateIcon"/> Над -50%
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(30);
                    }}><MdOutlineDoubleArrow className="redColorText mb-1 rotateIcon"/> Над -30%
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(15);
                    }}><MdOutlineDoubleArrow className="redColorText mb-1 rotateIcon"/> Над -15%
                    </Link>
                </div>
            </div>

            {/* Order By */}
            <div className="dropdown" ref={orderByRef}>
                {selectedOrderBy && (
                    <button className="halfButton" onClick={clearSortBy}>
                        {selectedOrderBy}
                        <FaTimes className="deleteIcon"/>
                    </button>
                )}

                <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                        onClick={() => toggleDropdown('orderBy')}>
                    <FaSort className="me-1"/>Подреди по
                </button>

                <div className={`dropdown-menu${isOpenOrderBy ? ' show' : ''} mt-1`}>
                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Намалена цена");
                    }}>
                        <IoPricetag className="mb-1 me-1 redColorText"/>Намалена цена
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Процент")
                    }}>
                        <FaPercentage className="mb-1 me-1 redColorText"/>Процент
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Тегло")
                    }}>
                        <FaWeightHanging className="mb-1 me-1 redColorText"/>Тегло
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Рейтинг");
                    }}>
                        <FaStar className="mb-1 me-1 redColorText"/>Рейтинг
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Ревюта")
                    }}>
                        <FaCommentDots className="mb-1 me-1 redColorText"/>Ревюта
                    </Link>
                </div>
            </div>

            {/* Weight */}
            <div className="dropdown" ref={weightRef}>
                {selectedWeight !== "0.0-999999.0" && (
                    <button className="halfButton" onClick={() => selectWeight("0.0-999999.0")}>
                        {selectedWeight} кг
                        <FaTimes className="deleteIcon"/>
                    </button>
                )}
                <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                        onClick={() => toggleDropdown('weight')}>
                    <FaWeightHanging className="me-1"/>Количество
                </button>
                <div className={`dropdown-menu${isOpenWeight ? ' show' : ''} mt-1 myScrollable`} style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                }}>
                    {weightData.map((weight, index) => (
                        <Link
                            key={index}
                            to="#"
                            className={`dropdown-item fw-bolder${selectWeight === weight.range ? ' active' : ''}`}
                            onClick={() => {
                                toggleDropdown('weight');
                                selectWeight(weight.range);
                            }}
                        >
                            <span> <FaBalanceScaleRight className="mb-1 redColorText"/> {weight.range} кг</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div className="dropdown" ref={categoryRef}>
                {selectedCategory && (
                    <button className="halfButton" onClick={() => selectCategory('')}>
                        {selectedCategory.split(" ")[0].split("-")[0]}
                        <FaTimes className="deleteIcon"/>
                    </button>
                )}
                <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                        onClick={() => toggleDropdown('category')}>
                    <BiSolidCategory className="me-1"/>Категория
                </button>
                <div className={`dropdown-menu${isOpenCategory ? ' show' : ''} mt-1 myScrollable`} style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                }}>

                    <SearchInput
                        buttonCustomClass="dropDownButtonSearchClearButton"
                        customClass="dropDownButtonSearch"
                        myWidth={'60%'}
                        placeHolder="Потърси категория..."
                        searchQuery={categorySearchQuery}
                        handleSearchChange={(e) => setCategorySearchQuery(e.target.value)}
                        clearSearch={() => setCategorySearchQuery('')}
                    />

                    {categories.map((item, index) => {
                        const category = Object.keys(item)[0];
                        const quantity = item[category];

                        if (category.toLowerCase().includes(categorySearchQuery.toLowerCase())) {
                            return (
                                <Link
                                    key={index}
                                    to="#"
                                    className={`dropdown-item fw-bolder${selectedCategory === category ? ' active' : ''}`}
                                    onClick={() => {
                                        toggleDropdown('category');
                                        selectCategory(category);
                                    }}
                                >
                                    <span className="redColorText">{quantity}</span> {category}
                                </Link>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>

            {/* Brand */}
            <div className="dropdown myDropDownButton" ref={brandRef}>
                {selectedBrand && (
                    <button className="halfButton" onClick={() => selectBrand('')}>
                        {selectedBrand.split(" ")[0]}
                        <FaTimes className="deleteIcon"/>
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

                    <SearchInput
                        buttonCustomClass="dropDownButtonSearchClearButton"
                        customClass="dropDownButtonSearch"
                        myWidth={'65%'}
                        placeHolder="Потърси марка..."
                        searchQuery={brandSearchQuery}
                        handleSearchChange={(e) => setBrandSearchQuery(e.target.value)}
                        clearSearch={() => setBrandSearchQuery('')}
                    />

                    {brands.map((item, index) => {
                        const brand = Object.keys(item)[0];
                        const quantity = item[brand];

                        if (brand.toLowerCase().includes(brandSearchQuery.toLowerCase())) {
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
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    );
};

export default DropdownButtons;
