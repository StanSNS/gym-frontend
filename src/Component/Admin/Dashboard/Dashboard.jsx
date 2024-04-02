import React from "react";
import "./Dashboard.css"
import {ArcElement, Chart} from 'chart.js'
import PieChart from "../PieChart";

Chart.register(ArcElement);

const Dashboard = () => {
    const totalProductsChartData = {
        labels: ['Total Products'],
        values: [6974],
        colors: ['rgb(75, 192, 192)'],
    };

    const totalRegisteredUsers = {
        labels: ['Facebook', 'Instagram', 'Gmail', 'Regular'],
        values: [250, 317, 187, 974,],
        colors: ['rgb(54, 162, 235)','rgb(157,101,218)','rgb(255, 205, 86)','rgb(255, 99, 132)',],
    };

    const totalRevenueByMonths = {
        labels: ['Gross', 'Net', 'Tax'],
        values: [3500.27, 2587.45, 987.48],
        colors: ['rgb(255, 205, 86)','rgb(73, 203, 95)','rgb(255, 99, 132)'],
    };

    const totalOrders = {
        labels: ['Canceled', 'Completed', 'Returned'],
        values: [250, 745, 49],
        colors: ['rgb(201, 203, 207)','rgb(73, 203, 95)','rgb(255, 99, 132)'],
    };

    return (
        <div>
            <div className="miniBoxes">

                <div className="miniBox">
                    <div className="miniBoxHeader">
                        <h4>Total products</h4>
                        <p>6974</p>
                    </div>

                    <div className="miniBoxContent">
                        <PieChart data={totalProductsChartData}/>
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