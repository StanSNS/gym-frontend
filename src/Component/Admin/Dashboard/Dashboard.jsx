import React from "react";
import "./Dashboard.css"
import {ArcElement, Chart} from 'chart.js'
import PieChart from "./PieChart/PieChart";
import {Button} from "react-bootstrap";

Chart.register(ArcElement);

const Dashboard = () => {
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

    const UserData = [
        {
            id: 1,
            firstName: 'John',
            middleName: 'Doe',
            lastName: 'Smith',
            email: 'john.doe@example.com',
            orders: 10,
            revenue: 500,
            firstLogin: '2023-01-01',
            lastLogin: '2024-03-31',
        },
        {
            id: 2,
            firstName: 'Jane',
            middleName: 'Marie',
            lastName: 'Johnson',
            email: 'jane.johnson@example.com',
            orders: 15,
            revenue: 750,
            firstLogin: '2022-12-15',
            lastLogin: '2024-04-01',
        },
        // Add more mock data if needed
    ];

    return (
        <div>
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

            <div className="table-container">
                <table className="myTable">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Middle Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Orders</th>
                        <th>Revenue</th>
                        <th>First Login</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {UserData.map((user, index) => (
                        <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.middleName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.orders}</td>
                            <td>{user.revenue}</td>
                            <td>{user.firstLogin}</td>
                            <td>{user.lastLogin}</td>
                            <td>Actions</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Dashboard;