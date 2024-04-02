import React from "react";
import "./MiniBoxes.css"
import PieChart from "./PieChart/PieChart";


function MiniBoxes() {
    const Products = {
        labels: ['Not Available', 'Available', "Too expensive"],
        values: [4500, 1108, 1400],
        colors: ['#20A8D8', '#333'],
    };

    const Users = {
        labels: ['Facebook', 'Instagram', 'Gmail', 'Regular'],
        values: [250, 317, 187, 974,],
        colors: ["#63C2DE", '#333'],
    };

    const Revenue = {
        labels: ['Gross', 'Net', 'Tax', "Unknown"],
        values: [3500.27, 2587.45, 987.48],
        colors: ['#FFC107', '#333'],
    };

    const Orders = {
        labels: ['Canceled', 'Completed', 'Returned'],
        values: [250, 745, 49],
        colors: ['#333', '#F86C6B'],
    };

    return (
        <div className="miniBoxes">
            <div className="miniBox">
                <div className="miniBoxHeader">
                    <h4>Products</h4>
                    <p>6974</p>
                </div>

                <div className="miniBoxContent">
                    <PieChart data={Products}/>
                </div>
            </div>

            <div className="miniBox">
                <div className="miniBoxHeader">
                    <h4>Users</h4>
                    <p>489</p>
                </div>

                <div className="miniBoxContent">
                    <PieChart data={Users}/>
                </div>
            </div>

            <div className="miniBox">
                <div className="miniBoxHeader">
                    <h4>Revenue</h4>
                    <p>$2587.58</p>
                </div>

                <div className="miniBoxContent">
                    <PieChart data={Revenue}/>
                </div>
            </div>

            <div className="miniBox">
                <div className="miniBoxHeader">
                    <h4>Orders</h4>
                    <p>134</p>
                </div>

                <div className="miniBoxContent">
                    <PieChart data={Orders}/>
                </div>
            </div>
        </div>
    );
}

export default MiniBoxes;