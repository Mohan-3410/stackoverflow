import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function RequireBot() {
    const user = localStorage.getItem("botuser")
    if (!user) {
        alert("Verification required")
    }
    return (
        user ? <Outlet /> : <Navigate to="/" />
    );
}

export default RequireBot;