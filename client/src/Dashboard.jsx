import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function Dashboard() { 
    const handleAuth = () => {
        axios.get("http://localhost:3001/checkauth",{
            headers: {
                "access-token": localStorage.getItem("token")
            }
        
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const removeAuth = () => {
        localStorage.removeItem("token");
    }

    return (
        <div>
        <h1>Dashboard</h1>
        <button onClick={handleAuth} className="btn btn-primary">CheckAuth</button>
        <Link to="/login" className="btn btn-primary" onClick={removeAuth}>Logout</Link>
        </div>
    );
    }
export default Dashboard;