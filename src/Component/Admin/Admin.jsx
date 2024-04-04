import React from "react";
import "./Admin.css"
import UserTable from "./Dashboard/UserTable/UserTable";
import ProductTable from "./Dashboard/ProductTable/ProductTable";
import OrderTable from "./Dashboard/OrderTable/OrderTable";
import MiniBoxes from "./Dashboard/MiniBoxes/MiniBoxes";
import Actions from "./Dashboard/Actions/Actions";
import RevenueTable from "./Dashboard/RevenueTable/RevenueTble";

function Admin() {
    return (
        <div className="adminAppContainer">

            <MiniBoxes/>

            <div className="adminTables">
                <ProductTable/>

                <UserTable/>

                <RevenueTable/>

                <OrderTable/>

            </div>

            <Actions/>
        </div>
    );
}

export default Admin;