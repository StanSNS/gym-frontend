import {Link} from "react-router-dom";
import React from "react";
import "./Sidebar.css"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                Admin Dashboard
            </div>

            <div>
                <button><Link to="/admin">Dashboard</Link></button>
                <button><Link to="/admin/users">Users</Link></button>
                <button><Link to="/admin/settings">Settings</Link></button>
            </div>

        </div>
    );
}
export default Sidebar;