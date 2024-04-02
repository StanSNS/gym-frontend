import React, {useState} from "react";
import "./Dashboard.css"
import {ArcElement, Chart} from 'chart.js'
import PieChart from "./PieChart/PieChart";

Chart.register(ArcElement);

const Dashboard = () => {
    const totalProductsChartData = {
        labels: ['Products', 'Available', ],
        values: [5900, 1108],
        colors: ['#20A8D8', '#333'],
    };

    const totalRegisteredUsers = {
        labels: ['Facebook', 'Instagram', 'Gmail', 'Regular'],
        values: [250, 317, 187, 974,],
        colors: ["#63C2DE", '#333'],
    };

    const totalRevenueByMonths = {
        labels: ['Gross', 'Net', 'Tax'],
        values: [3500.27, 2587.45, 987.48],
        colors: ['#FFC107', '#333'],
    };

    const totalOrders = {
        labels: ['Canceled', 'Completed', 'Returned'],
        values: [250, 745, 49],
        colors: ['#333', '#F86C6B'],
    };


    return (
        <div>
            <div className="miniBoxes">
                <div className="miniBox">
                    <div className="miniBoxHeader">
                        <h4>Products</h4>
                        <p>6974</p>
                    </div>

                    <div className="miniBoxContent">
                        <PieChart data={totalProductsChartData}/>
                    </div>

                    <div className="viewChartButton">
                        <button>View details</button>
                    </div>
                </div>

                <div className="miniBox">
                    <div className="miniBoxHeader">
                        <h4>Registered users</h4>
                        <p>489</p>
                    </div>

                    <div className="miniBoxContent">
                        <PieChart data={totalRegisteredUsers}/>
                    </div>
                </div>

                <div className="miniBox">
                    <div className="miniBoxHeader">
                        <h4>Total revenue</h4>
                        <p>$2587.58</p>
                    </div>

                    <div className="miniBoxContent">
                        <PieChart data={totalRevenueByMonths}/>
                    </div>
                </div>

                <div className="miniBox">
                    <div className="miniBoxHeader">
                        <h4>Total orders</h4>
                        <p>134</p>
                    </div>

                    <div className="miniBoxContent">
                        <PieChart data={totalOrders}/>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;