import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Users from "./Users";
import Settings from "./Settings";
import {Route, Routes,} from 'react-router-dom';
import "./Admin.css"

function Admin() {
    return (
        <div className="adminAppContainer">
            <Sidebar/>
            <div className="adminAppContent">
                <Routes>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default Admin;