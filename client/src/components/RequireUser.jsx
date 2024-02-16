import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RequireUser() {
    const user = localStorage.getItem("Profile");
    if (!user) {
        alert("Login/Signup is required")
    }
    return (
        user ? <Outlet /> : <Navigate to="/auth" />
    );
}

export default RequireUser