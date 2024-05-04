import React, {useRef, useState} from 'react';
import {
    FaBalanceScaleRight,
    FaBolt,
    FaCommentDots,
    FaLayerGroup, FaLongArrowAltDown, FaLongArrowAltUp,
    FaPercentage,
    FaSort,
    FaStar,
    FaTimes,
    FaWeightHanging
} from "react-icons/fa";
import {IoPricetag} from "react-icons/io5";
import {MdOutlineDoubleArrow} from "react-icons/md";
import {Link} from "react-router-dom";
import "./DropDownButtons.css"
import SearchInput from "../SearchInput/SearchInput";
import {BiSolidCategory} from "react-icons/bi";
import {TbSort09, TbSort90} from "react-icons/tb";
import {GiWeight} from "react-icons/gi";

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
                        <span>Над -{selectedDeal}<FaPercentage className="mb-1 ms-1"/></span>
                        <FaTimes className="deleteIcon"/>
                    </button>
                )}

                <button className="orderButton align-bottom ml-2 dropdown-toggle" type="button"
                        onClick={() => toggleDropdown('flashDeals')}>
                    <FaBolt className="me-1 fs-5 myGreenBlueColor"/>Топ Оферти
                </button>
                <div className={`dropdown-menu${isOpenFlashDeals ? ' show' : ''} mt-1`}>
                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(70);
                    }}><MdOutlineDoubleArrow className="mb-1 rotateIcon me-2"/>Над -70%
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(50);
                    }}><MdOutlineDoubleArrow className="mb-1 rotateIcon me-2"/>Над -50%
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(30);
                    }}><MdOutlineDoubleArrow className="mb-1 rotateIcon me-2"/>Над -30%
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('flashDeals');
                        selectFlashDeal(15);
                    }}><MdOutlineDoubleArrow className="mb-1 rotateIcon me-2"/>Над -15%
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
                    <FaSort className="me-1 fs-5 myGreenBlueColor"/>Подреди по
                </button>

                <div className={`dropdown-menu${isOpenOrderBy ? ' show' : ''} mt-1`}>
                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Цена най-евтино");
                    }}>
                        <IoPricetag className="mb-1 me-2"/>
                        Цена
                        <TbSort09 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltUp className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Цена най-скъпо");
                    }}>
                        <IoPricetag className="mb-1 me-2"/>
                        Цена
                        <TbSort90 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltDown className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Процент най-нисък")
                    }}>
                        <FaPercentage className="mb-1 me-2"/>
                        Процент
                        <TbSort09 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltUp className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Процент най-висок")
                    }}>
                        <FaPercentage className="mb-1 me-2"/>
                        Процент
                        <TbSort90 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltDown className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Тегло най-леко")
                    }}>
                        <FaWeightHanging className="mb-1 me-2"/>
                        Тегло
                        <TbSort09 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltUp className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Тегло най-тежко")
                    }}>
                        <FaWeightHanging className="mb-1 me-2"/>
                        Тегло
                        <TbSort90 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltDown className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Рейтинг най-нисък");
                    }}>
                        <FaStar className="mb-1 me-2"/>
                        Рейтинг
                        <TbSort09 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltUp className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Рейтинг най-висок");
                    }}>
                        <FaStar className="mb-1 me-2"/>
                        Рейтинг
                        <TbSort90 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltDown className="mb-1" />
                    </Link>

                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Ревюта най-малко")
                    }}>
                        <FaCommentDots className="mb-1 me-2"/>
                        Ревюта
                        <TbSort09 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltUp className="mb-1" />
                    </Link>
                    <Link to={"#"} className="dropdown-item fw-bolder" onClick={() => {
                        toggleDropdown('orderBy');
                        selectSort("Ревюта най-много")
                    }}>
                        <FaCommentDots className="mb-1 me-2"/>
                        Ревюта
                        <TbSort90 className="ms-1 fs-3 mb-1"/>
                        <FaLongArrowAltDown className="mb-1" />
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
                    <GiWeight  className="me-1 fs-4 myGreenBlueColor"/>Количество
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
                            <span> <FaBalanceScaleRight className="mb-1 me-2"/> {weight.range} кг.</span>
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
                    <BiSolidCategory className="me-1 fs-5 myGreenBlueColor"/>Категория
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
                                    <span className="productAmount">({quantity})</span> {category}
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
                    <FaLayerGroup className="me-2 fs-5 myGreenBlueColor"/>Марка
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
                                    <span className="productAmount">({quantity})</span> {brand}
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
