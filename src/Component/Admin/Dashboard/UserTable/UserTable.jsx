import React from "react";
import "./UserTable.css"
import {Button} from "react-bootstrap";

function UserTable() {

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
        <div className="table-container">
            <div className="tableWrapper">
                <table className="table table-striped">
                    <thead className="table-dark sticky-top">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Revenue</th>
                        <th>First Login</th>
                        <th>Last Login</th>
                        <th>Orders</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {UserData.map((user, index) => (
                        <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.revenue}</td>
                            <td>{user.firstLogin}</td>
                            <td>{user.lastLogin}</td>
                            <td><Button variant="dark">View</Button></td>
                            <td><Button variant="danger">Ban</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default UserTable;