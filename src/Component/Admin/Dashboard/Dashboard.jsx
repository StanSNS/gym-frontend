import React from "react";
import {ArcElement, Chart} from 'chart.js'
import MiniBoxes from "./MiniBoxes/MiniBoxes";
import UserTable from "./UserTable/UserTable";
import ProductTable from "./ProductTable/ProductTable";
import OrderTable from "./OrderTable/OrderTable";

Chart.register(ArcElement);

const Dashboard = () => {


    return (
        <div>

            <MiniBoxes/>

            <UserTable/>

            <ProductTable/>

            <OrderTable/>

        </div>
    );
}

export default Dashboard;