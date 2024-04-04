import React, {useState} from "react";
import "./RevenueTable.css"
import SearchInput from "../../../Shop/SearchInput/SearchInput";
import {Dropdown} from "react-bootstrap";

function RevenueTable() {
    const RevenueData = [
        {
            transaction: 1564984156201,
            userEmail: "david@example.com",
            amount: 120.50,
            date: "29.11.2024",
            status: "Cancelled",
        },
        {
            transaction: 1564984156202,
            userEmail: "lisa@example.com",
            amount: 275.30,
            date: "30.11.2024",
            status: "Pending",
        },
        {
            transaction: 1564984156203,
            userEmail: "michael@example.com",
            amount: 500.00,
            date: "01.12.2024",
            status: "Completed",
        },
        {
            transaction: 1564984156204,
            userEmail: "emily@example.com",
            amount: 150.75,
            date: "02.12.2024",
            status: "Cancelled",
        },
        {
            transaction: 1564984156205,
            userEmail: "chris@example.com",
            amount: 210.20,
            date: "03.12.2024",
            status: "Completed",
        },
        {
            transaction: 1564984156206,
            userEmail: "jessica@example.com",
            amount: 400.50,
            date: "04.12.2024",
            status: "Pending",
        },
        {
            transaction: 1564984156207,
            userEmail: "andrew@example.com",
            amount: 180.90,
            date: "05.12.2024",
            status: "Completed",
        },
        {
            transaction: 1564984156208,
            userEmail: "sophia@example.com",
            amount: 320.25,
            date: "06.12.2024",
            status: "Pending",
        },
        {
            transaction: 1564984156209,
            userEmail: "ryan@example.com",
            amount: 245.60,
            date: "07.12.2024",
            status: "Completed",
        },
        {
            transaction: 1564984156210,
            userEmail: "olivia@example.com",
            amount: 175.45,
            date: "08.12.2024",
            status: "Pending",
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRevenueData, setFilteredRevenueData] = useState(RevenueData);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = RevenueData.filter(product => product.userEmail.toLowerCase().includes(value.toLowerCase()));
        setFilteredRevenueData(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredRevenueData(RevenueData);
    };

    const handleSortByChange = (sortType) => {
        let sortedData = [...filteredRevenueData];
        switch (sortType) {
            case "amount":
                sortedData.sort((a, b) => a.amount - b.amount);
                break;
            case "date":
                sortedData.sort((a, b) => b.date - a.date);
                break;
            default:
                break;
        }
        setFilteredRevenueData(sortedData);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Pending":
                return "skyblue";
            case "Completed":
                return "limegreen";
            case "Cancelled":
                return "red";
            default:
                return "";
        }
    };

    const handleStatusChange = (status) => {
        if (status === 'All') {
            setFilteredRevenueData(RevenueData);
        } else {
            const filteredData = RevenueData.filter(order => order.status === status);
            setFilteredRevenueData(filteredData);
        }
    };

    return (
        <div className="table-container">
            <div className="tableTopSection">
                <h2>Revenue</h2>

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
                        <Dropdown.Item onClick={() => handleSortByChange("amount")}>
                            Amount
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("date")}>
                            Date
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                        Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() =>  handleStatusChange("All")}>
                            All
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() =>  handleStatusChange("Completed")}>
                            Completed
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() =>  handleStatusChange("Pending")}>
                            Pending
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() =>  handleStatusChange("Cancelled")}>
                            Canceled
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="tableWrapper">
                <table className="table table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th>Transaction</th>
                        <th>User</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRevenueData.map((revenue, index) => (
                        <tr className={index % 2 === 0 ? 'even' : 'odd'}>
                            <td className="align-content-center">{revenue.transaction}</td>
                            <td className="align-content-center">{revenue.userEmail}</td>
                            <td className="align-content-center">{revenue.amount}</td>
                            <td className="align-content-center">{revenue.date}</td>
                            <td className="align-content-center">
                                <span style={{color: getStatusColor(revenue.status)}}>
                                     {revenue.status}
                                 </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default RevenueTable;