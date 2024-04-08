import React, {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import SearchInput from "../../../Shop/SearchInput/SearchInput";
import {getAllTastes} from "../../../../Service/AdminService";

function TasteTable() {

    const [tasteData, setTasteData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("vlizame ?")
                const data = await getAllTastes();
                console.log(data)
                setTasteData(data);
            } catch (error) {
                console.error('Error fetching current product:', error);
            }
        };
        fetchData();
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(tasteData);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        const filteredData = tasteData.filter(user => user.userEmail.toLowerCase().includes(value.toLowerCase()));
        setFilteredOrders(filteredData);
    };

    const clearSearch = () => {
        setSearchQuery('');
        setFilteredOrders(tasteData);
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
            setFilteredOrders(tasteData);
        } else {
            const filteredData = tasteData.filter(order => order.status === status);
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
                        <Dropdown.Item onClick={() => handleStatusChange("All")}>
                            All
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange("Completed")}>
                            Completed
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange("Pending")}>
                            Pending
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleStatusChange("Cancelled")}>
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
                    {/*{filteredOrders.map((order, index) => (*/}
                    {/*    <tr className={index % 2 === 0 ? "even" : "odd"} key={order.id}>*/}
                    {/*        <td className="align-content-center">{order.id}</td>*/}
                    {/*        <td className="align-content-center">{order.dateIssued}</td>*/}
                    {/*        <td className="align-content-center">{order.userEmail}</td>*/}
                    {/*        <td className="align-content-center">{order.amount}</td>*/}
                    {/*        <td className="align-content-center">{order.productsQty}</td>*/}
                    {/*        <td className="align-content-center">*/}
                    {/*            <span style={{color: getStatusColor(order.status)}}>*/}
                    {/*                 {order.status}*/}
                    {/*             </span>*/}
                    {/*        </td>*/}
                    {/*        <td className="align-content-center"><Button variant="dark">View</Button></td>*/}
                    {/*    </tr>*/}
                    {/*))}*/}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TasteTable;