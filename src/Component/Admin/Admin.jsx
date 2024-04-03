import React, {useState} from "react";
import "./Admin.css"
import MiniBoxes from "./Dashboard/MiniBoxes/MiniBoxes";
import UserTable from "./Dashboard/UserTable/UserTable";
import ProductTable from "./Dashboard/ProductTable/ProductTable";
import OrderTable from "./Dashboard/OrderTable/OrderTable";
import {ArcElement, Chart} from "chart.js";
import {Link} from "react-router-dom";

function Admin() {
    const [widgetVisibility, setWidgetVisibility] = useState(true);
    const [userTableVisibility, setUserTableVisibility] = useState(true);
    const [productTableVisibility, setProductTableVisibility] = useState(true);
    const [orderTableVisibility, setOrderTableVisibility] = useState(true);

    Chart.register(ArcElement);
    return (
        <div className="adminAppContainer">
            <div className="sidebar">
                <div className="sidebar-header">
                    Admin Dashboard
                </div>

                <div>
                    <button onClick={() => setWidgetVisibility(!widgetVisibility)}>Widgets</button>
                    <button onClick={() => setUserTableVisibility(!userTableVisibility)}>Users</button>
                    <button onClick={() => setProductTableVisibility(!productTableVisibility)}>Product</button>
                    <button onClick={() => setOrderTableVisibility(!orderTableVisibility)}>Order</button>
                </div>

            </div>
            <div className="adminAppContent">
                <div>
                    {widgetVisibility && (
                        <MiniBoxes/>
                    )}

                    {userTableVisibility && (
                        <UserTable/>
                    )}

                    {productTableVisibility && (
                        <ProductTable/>
                    )}

                    {orderTableVisibility && (
                        <OrderTable/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;