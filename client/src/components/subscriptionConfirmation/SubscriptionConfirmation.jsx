// SubscriptionConfirmation.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosClient } from '../../utils/axiosClient';
import "./SubscriptionConfirmation.css"
import { FaCheckCircle } from 'react-icons/fa';

function SubscriptionConfirmation() {
    const [loading, setLoading] = useState(true);
    const [subscriptionConfirmed, setSubscriptionConfirmed] = useState(false);
    const param = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                await axiosClient.post('/auth/update-subscription', {
                    plan: param.id
                });


                setLoading(false);
                setSubscriptionConfirmed(true);
            } catch (error) {
                console.error('Error updating subscription:', error);
                setLoading(false);
            }
        }
        fetchData();
    }, [param.id]);
    const redirectToHome = () => {
        window.location.replace('/', '_self');
    };

    return (
        <div className="subscription-confirmation-container">
            {loading ? (
                <div className="loading-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                <div className="confirmation-content">
                    <h2 className="confirmation-message">Subscription Confirmed</h2>
                    <p className="confirmation-message">Your subscription has been successfully processed.</p>
                    {subscriptionConfirmed && <FaCheckCircle className="confirmation-icon" />}
                    <div onClick={redirectToHome} className="back-to-home-link">Back to Home</div>
                </div>
            )}
        </div>
    );
}

export default SubscriptionConfirmation;
