import React, {useState} from "react";
import "./OrderTable.css"
import {Button, Dropdown} from "react-bootstrap";
import SearchInput from "../../../Shop/SearchInput/SearchInput";

function OrderTable() {
    const OrderData = [
        {
            id: 1,
            dateIssued: '2023-01-01',
            userEmail: 'john.doe@example.com',
            amount: '258.45',
            productsQty: '4',
            status: "Pending",
        },
        {
            id: 2,
            dateIssued: '2023-02-05',
            userEmail: 'jane.smith@example.com',
            amount: '175.99',
            productsQty: '2',
            status: "Completed",
        },
        {
            id: 3,
            dateIssued: '2023-03-10',
            userEmail: 'bob.johnson@example.com',
            amount: '99.99',
            productsQty: '1',
            status: "Pending",
        },
        {
            id: 4,
            dateIssued: '2023-04-15',
            userEmail: 'mary.jones@example.com',
            amount: '349.75',
            productsQty: '3',
            status: "Cancelled",
        },
        {
            id: 5,
            dateIssued: '2023-05-20',
            userEmail: 'chris.wilson@example.com',
            amount: '500.00',
            productsQty: '5',
            status: "Completed",
        },
        {
            id: 6,
            dateIssued: '2023-06-25',
            userEmail: 'emily.brown@example.com',
            amount: '129.95',
            productsQty: '2',
            status: "Pending",
        },
        {
            id: 7,
            dateIssued: '2023-07-30',
            userEmail: 'david.miller@example.com',
            amount: '75.50',
            productsQty: '1',
            status: "Completed",
        },
        {
            id: 8,
            dateIssued: '2023-08-05',
            userEmail: 'sarah.white@example.com',
            amount: '299.99',
            productsQty: '4',
            status: "Pending",
        },
        {
            id: 9,
            dateIssued: '2023-09-10',
            userEmail: 'michael.jackson@example.com',
            amount: '199.00',
            productsQty: '3',
            status: "Completed",
        },
        {
            id: 10,
            dateIssued: '2023-10-15',
            userEmail: 'amanda.green@example.com',
            amount: '429.85',
            productsQty: '5',
            status: "Cancelled",
        }
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(OrderData);


    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = OrderData.filter(user => user.userEmail.toLowerCase().includes(value.toLowerCase()));
        setFilteredOrders(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredOrders(OrderData);
    };

    const handleSortByChange = (sortType) => {
        let sortedData = [...filteredOrders];
        switch (sortType) {
            case "id":
                sortedData.sort((a, b) => a.id - b.id);
                break;
            case "date":
                sortedData.sort((a, b) => a.dateIssued - b.dateIssued);
                break;
            case "email":
                sortedData.sort((a, b) => a.userEmail - b.userEmail);
                break;
            case "amount":
                sortedData.sort((a, b) => b.amount - a.amount);
                break;
            case "quantity":
                sortedData.sort((a, b) => b.productsQty - a.productsQty);
                break;
            case "status":
                sortedData.sort((a, b) => a.status - b.status);
                break;
            default:
                break;
        }
        setFilteredOrders(sortedData);
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
            setFilteredOrders(OrderData);
        } else {
            const filteredData = OrderData.filter(order => order.status === status);
            setFilteredOrders(filteredData);
        }
    };

    return (
        <div className="table-container">
            <div className="tableTopSection">
                <h2>Orders</h2>

                <div className="tableSearchInputContainer ms-2">
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
                        <Dropdown.Item onClick={() => handleSortByChange("date")}>
                            Date issued
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("email")}>
                            Email
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("amount")}>
                            Amount
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("quantity")}>
                            Quantity
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortByChange("status")}>
                            Status
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
                        <th>#</th>
                        <th>Date issued</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr className={index % 2 === 0 ? "even" : "odd"} key={order.id}>
                            <td className="align-content-center">{order.id}</td>
                            <td className="align-content-center">{order.dateIssued}</td>
                            <td className="align-content-center">{order.userEmail}</td>
                            <td className="align-content-center">{order.amount}</td>
                            <td className="align-content-center">{order.productsQty}</td>
                            <td className="align-content-center">
                                <span style={{color: getStatusColor(order.status)}}>
                                     {order.status}
                                 </span>
                            </td>
                            <td className="align-content-center"> <Button variant="dark">View</Button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderTable;