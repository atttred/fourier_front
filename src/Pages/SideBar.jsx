import React from "react";
import "../styles/styles.scss";

const Sidebar = ({ onModuleChange }) => {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li className="sidebar-items">
                    <button onClick={() => onModuleChange('tasks')}>Tasks</button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;