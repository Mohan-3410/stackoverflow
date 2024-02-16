import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import "./SubscriptionConfirmation.css"

function SubscriptionFailed() {
    const redirectToHome = () => {
        window.location.replace('/', '_self');
    };
    return (
        <div className="subscription-confirmation-container">
            <div className="confirmation-content">
                <h2 className="confirmation-message">Subscription Failed</h2>
                <p className="confirmation-message">Your subscription could not be processed. Please try again later.</p>
                <div className="confirmation-icon" style={{ color: "#ff7f7f" }}><FaTimesCircle /></div>
                <div onClick={redirectToHome} className="back-to-home-link">Back to Home</div>
            </div>
        </div>
    );
}

export default SubscriptionFailed;
