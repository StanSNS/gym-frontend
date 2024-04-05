import React from "react";
import "./Admin.css"
import Gauges from "./Dashboard/Gauges/Gauges";

function Admin() {
    return (
        <div className="adminAppContainer">
            <Gauges/>
        </div>
    );
}

export default Admin;