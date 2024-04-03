import React from "react";
import "./ProductTable.css"

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
    ];

    return (
        <div className="table-container">
            <div className="tableWrapper">
                <table className="table table-striped">
                    <thead className="table-dark sticky-top">
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Bought</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ProductData.map((product, index) => (
                        <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td>{product.id}</td>
                            <td className="imageTable"><img className="me-2" src={product.image} alt={product.id}/> {product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.bought}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default ProductTable;