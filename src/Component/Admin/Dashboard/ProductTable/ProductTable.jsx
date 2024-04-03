import React, {useState} from "react";
import "./ProductTable.css"
import SearchInput from "../../../Shop/SearchInput/SearchInput";
import {Dropdown} from "react-bootstrap";

function ProductTable() {
    const ProductData = [
        {
            id: 1,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Performance Rock's with caffeine / 32g",
            category: "Гелове и желета",
            brand: "AMIX",
            bought: 258,
            status: "pending",
        },
        {
            id: 2,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Protein Chocolate Bar / 50g",
            category: "Барове и колбаси",
            brand: "Nutrend",
            bought: 183,
            status: "shipped",
        },
        {
            id: 3,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "BCAA Drink / 500ml",
            category: "Напитки",
            brand: "Scitec Nutrition",
            bought: 315,
            status: "delivered",
        },
        {
            id: 4,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Whey Protein / 1kg",
            category: "Протеини",
            brand: "Optimum Nutrition",
            bought: 501,
            status: "pending",
        },
        {
            id: 5,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Creatine Monohydrate / 300g",
            category: "Креатини",
            brand: "MuscleTech",
            bought: 104,
            status: "shipped",
        },
        {
            id: 6,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Pre-Workout Booster / 300g",
            category: "Предтренировъчни комплекси",
            brand: "BSN",
            bought: 227,
            status: "delivered",
        },
        {
            id: 7,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Protein Chocolate Bar / 50g",
            category: "Барове и колбаси",
            brand: "Nutrend",
            bought: 183,
            status: "shipped",
        },
        {
            id: 8,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "BCAA Drink / 500ml",
            category: "Напитки",
            brand: "Scitec Nutrition",
            bought: 315,
            status: "delivered",
        },
        {
            id: 9,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Protein Chocolate Bar / 50g",
            category: "Барове и колбаси",
            brand: "Nutrend",
            bought: 183,
            status: "shipped",
        },
        {
            id: 10,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "BCAA Drink / 500ml",
            category: "Напитки",
            brand: "Scitec Nutrition",
            bought: 315,
            status: "delivered",
        },
        {
            id: 11,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "Protein Chocolate Bar / 50g",
            category: "Барове и колбаси",
            brand: "Nutrend",
            bought: 183,
            status: "shipped",
        },
        {
            id: 12,
            image: "https://distro.silabg.com/uf/product/16356_pm_gel13.jpg",
            productName: "BCAA Drink / 500ml",
            category: "Напитки",
            brand: "Scitec Nutrition",
            bought: 315,
            status: "delivered",
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(ProductData);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = ProductData.filter(product => product.productName.toLowerCase().includes(value.toLowerCase()));
        setFilteredProducts(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredProducts(ProductData);
    };

    const handleSortByChange = (sortType) => {
        let sortedData = [...filteredProducts];
        switch (sortType) {
            case "id":
                sortedData.sort((a, b) => a.id - b.id);
                break;
            case "bought":
                sortedData.sort((a, b) => b.bought - a.bought);
                break;
            default:
                break;
        }
        setFilteredProducts(sortedData);
    };

    return (
        <div className="table-container">
            <div className="tableTopSection">
                <h2>Products</h2>

                <div className="tableSearchInputContainer">
                    <SearchInput
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        clearSearch={clearSearch}
                        placeHolder="Search by name"
                        myWidth={"100%"}
                        customClass="searchInputCustomClass"
                        buttonCustomClass="buttonCustomClass"
                    />
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Sort By
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortByChange("id")}>
                            ID
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("bought")}>
                            Bought
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>


            <div className="tableWrapper">
                <table className="table table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Bought</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td className="align-content-center">{product.id}</td>
                            <td className="imageTable align-content-center"><img className="me-2" src={product.image}
                                                            alt={product.id}/> {product.productName}</td>
                            <td className="align-content-center">{product.category}</td>
                            <td className="align-content-center">{product.brand}</td>
                            <td className="align-content-center">{product.bought}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ProductTable;