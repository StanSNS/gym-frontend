import React, {useState} from "react";
import "./Admin.css"
import MiniBoxes from "./Dashboard/MiniBoxes/MiniBoxes";
import UserTable from "./Dashboard/UserTable/UserTable";
import ProductTable from "./Dashboard/ProductTable/ProductTable";
import OrderTable from "./Dashboard/OrderTable/OrderTable";
import {ArcElement, Chart} from "chart.js";
import Actions from "./Dashboard/Actions/Actions";

function Admin() {
    const [widgetVisibility, setWidgetVisibility] = useState(true);
    const [userTableVisibility, setUserTableVisibility] = useState(true);
    const [productTableVisibility, setProductTableVisibility] = useState(true);
    const [orderTableVisibility, setOrderTableVisibility] = useState(true);
    const [actionVisibility, setActionVisibility] = useState(true);

    Chart.register(ArcElement);
    return (
        <div className="adminAppContainer">
            <div className="sidebar">
                <div className="sidebar-header">
                    Admin Dashboard
                </div>

                <div className="switchButtons">

                    <div className="textAndSwitch">
                        <h5>Gauges: </h5>

                        <div className="checkbox-wrapper-25">
                            <input type="checkbox" onClick={() => setWidgetVisibility(!widgetVisibility)}
                                   checked={widgetVisibility}/>
                        </div>
                    </div>

                    <div className="textAndSwitch">
                        <h5>User Table: </h5>

                        <div className="checkbox-wrapper-25">
                            <input type="checkbox" onClick={() => setUserTableVisibility(!userTableVisibility)}
                                   checked={userTableVisibility}/>
                        </div>
                    </div>

                    <div className="textAndSwitch">
                        <h5>Product table: </h5>

                        <div className="checkbox-wrapper-25">
                            <input type="checkbox" onClick={() => setProductTableVisibility(!productTableVisibility)}
                                   checked={productTableVisibility}/>
                        </div>
                    </div>

                    <div className="textAndSwitch">
                        <h5>Order table: </h5>

                        <div className="checkbox-wrapper-25">
                            <input type="checkbox" onClick={() => setOrderTableVisibility(!orderTableVisibility)}
                                   checked={orderTableVisibility}/>
                        </div>
                    </div>

                    <div className="textAndSwitch">
                        <h5>Actions: </h5>

                        <div className="checkbox-wrapper-25">
                            <input type="checkbox" onClick={() => setActionVisibility(!actionVisibility)}
                                   checked={actionVisibility}/>
                        </div>
                    </div>
                </div>

            </div>
            <div className="adminAppContent">
                <div>
                    {widgetVisibility && (
                        <MiniBoxes/>
                    )}

                    {userTableVisibility && (
                        <UserTable/>
                    )}

                    {productTableVisibility && (
                        <ProductTable/>
                    )}

                    {orderTableVisibility && (
                        <OrderTable/>
                    )}

                    {actionVisibility && (
                        <Actions/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;