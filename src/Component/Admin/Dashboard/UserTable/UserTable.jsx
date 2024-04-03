import React, {useState} from "react";
import "./UserTable.css"
import {Button, Dropdown} from "react-bootstrap";
import SearchInput from "../../../Shop/SearchInput/SearchInput";

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
            firstName: 'John',
            middleName: 'Doe',
            lastName: 'Smith',
            email: 'john.doe@example.com',
            orders: 10,
            revenue: 3000,
            firstLogin: '2023-01-01',
            lastLogin: '2024-03-31',
        },
        {
            id: 3,
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
            id: 4,
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
            id: 5,
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
            id: 6,
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
            id: 7,
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
            id: 8,
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
            id: 9,
            firstName: 'Jane',
            middleName: 'Marie',
            lastName: 'Johnson',
            email: 'jane.johnson@example.com',
            orders: 15,
            revenue: 750,
            firstLogin: '2022-12-15',
            lastLogin: '2024-04-01',
        },
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(UserData);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = UserData.filter(user => user.email.toLowerCase().includes(value.toLowerCase()));
        setFilteredUsers(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredUsers(UserData);
    };

    const handleSortByChange = (sortType) => {
        let sortedData = [...filteredUsers];
        switch (sortType) {
            case "id":
                sortedData.sort((a, b) => a.id - b.id);
                break;
            case "revenue":
                sortedData.sort((a, b) => b.revenue - a.revenue);
                break;
            case "firstLogin":
                sortedData.sort((a, b) => b.firstLogin - a.firstLogin);
                break;
            case "lastLogin":
                sortedData.sort((a, b) => b.lastLogin - a.lastLogin);
                break;
            default:
                break;
        }
        setFilteredUsers(sortedData);
    };

    return (
        <div className="table-container">
            <div className="tableTopSection">
                <h2>Users</h2>

                <div className="tableSearchInputContainer">
                    <SearchInput
                        searchQuery={searchQuery}
                        handleSearchChange={handleSearchChange}
                        clearSearch={clearSearch}
                        placeHolder="Search by email"
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
                        <Dropdown.Item onClick={() => handleSortByChange("revenue")}>
                            Revenue
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("firstLogin")}>
                            First Login
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("lastLogin")}>
                            Last Login
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="tableWrapper">
                <table className="table table-striped">
                    <thead className="table-dark">
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
                    {filteredUsers.map((user, index) => (
                        <tr className={index % 2 === 0 ? "even" : "odd"} key={user.id}>
                            <td className="align-content-center">{user.id}</td>
                            <td className="align-content-center">{user.firstName}</td>
                            <td className="align-content-center">{user.lastName}</td>
                            <td className="align-content-center">{user.email}</td>
                            <td className="align-content-center">{user.revenue}</td>
                            <td className="align-content-center">{user.firstLogin}</td>
                            <td className="align-content-center">{user.lastLogin}</td>
                            <td className="align-content-center">
                                <Button variant="dark">View</Button>
                            </td>
                            <td className="align-content-center">
                                <Button variant="danger">Ban</Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default UserTable;