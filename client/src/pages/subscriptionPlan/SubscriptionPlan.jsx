import React, { useState, useEffect } from 'react';
import './SubscriptionPlan.css';
import { axiosClient } from '../../utils/axiosClient';
import { loadStripe } from '@stripe/stripe-js';

function SubscriptionPlans() {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosClient.get('/auth/update-user');
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUser();
    }, []);

    const handleCheckout = async (plan) => {
        try {
            setIsLoading(true);
            const response = await axiosClient.post('/questions/subscribe', { plan });
            if (response.data.sessionId) {
                const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
                const { error } = await stripe.redirectToCheckout({
                    sessionId: response.data.sessionId,
                });

                if (error) {
                    console.error('Error redirecting to Stripe Checkout:', error);
                } else {
                    await axiosClient.post('/update-subscription', { plan });
                    // After updating the subscription, refetch the user data
                    fetchUser();
                }
            } else {
                console.error('No sessionId received from backend');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="subscription-plans-container">
            <h2 style={{ textAlign: "center" }}>Choose a Subscription Plan</h2>
            {user && (
                <>
                    <div className='currentplan'>
                        <div><strong><h3 style={{ display: 'inline' }}>Current Plan:</h3></strong> {user.subscription.plan}</div>

                        {user.subscription.subscriptionEnd && (
                            <div>
                                <strong><h3 style={{ display: 'inline' }}>Validity: </h3></strong> {new Date(user.subscription.subscriptionEnd).toLocaleDateString()}
                            </div>
                        )}
                    </div>


                    <div className="p-grid">
                        <div className="card">
                            <h3>Free Plan</h3>
                            <p>Can post only 1 question a day</p>
                        </div>
                        <div className="card" >
                            <h3>Silver Plan</h3>
                            <p>₹100/month</p>
                            <p>Can post 5 questions a day</p>
                            <button className="s-button" disabled={isLoading || user?.subscription.plan === 'silver'} onClick={() => handleCheckout('silver')}>Subscribe</button>
                        </div>
                        <div className="card">
                            <h3>Gold Plan</h3>
                            <p>₹1000/month</p>
                            <p>Unlimited questions</p>
                            <button className="s-button" disabled={isLoading || user?.subscription.plan === 'gold'} onClick={() => handleCheckout('gold')}>Subscribe</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default SubscriptionPlans;
