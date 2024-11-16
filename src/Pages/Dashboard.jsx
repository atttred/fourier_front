import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Sidebar from "./Sidebar";
import TaskTab from "./TaskTab";
import "../styles/styles.scss";

const Dashboard = () => {
    const { token, loading, logout } = useContext(AuthContext);
    const [module, setModule] = useState('tasks');

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const handleModuleChange = (e) => {
        console.log('Module changed:', e);
        setModule(e);
    }

    return (
        <div className="dashboard">
            <Sidebar onModuleChange={handleModuleChange} />
            <div className="content">
                {module === 'tasks' && <TaskTab />}
                <button className="logout-button" onClick={logout}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
