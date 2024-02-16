const axios = require('axios');
const OpenAI = require('openai');
const User = require('../models/User');
const stripe = require('stripe')("sk_test_51ODibrSF3koiYipSi7hpLVMsQZOP0BZy2C1arpOvnxRODxLCl9tSh92OfOTMkQ2c1uhTnhZIQqYrvk8wi9dRKwtK001fXUWy1q");
let origin = 'http://localhost:5173';

console.log("here env", process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    origin = process.env.CORS_ORIGIN
}

const getWeatherController = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const appid = process.env.WEATHER_APP_ID;

        if (!lon || !lat) {
            return res.status(400).json({ message: "lat,lon and appid is required" });
        }
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`);
        const weather = response.data.weather[0];
        res.status(200).json(weather);

    } catch (e) {
        return res.status(500).json({ error: "Error getting weather, internal server error" })
    }
}

const chatBotController = async (req, res) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    try {

        const { messages } = req.body;
        if (!openai.apiKey) {
            return res.status(403).json("Messages are required", { status: 500 });
        }
        if (!messages) {
            return res.status(403).json("Messages are required", { status: 400 });
        }
        const response = await openai.chat.completions.create({
            messages,
            model: "gpt-3.5-turbo",
        });
        return res.json(response.choices[0].message);

    } catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return;
    }
}

const planPrices = {
    silver: 10000,
    gold: 100000,
};

const subscribeController = async (req, res) => {
    const { plan } = req.body;
    const userId = req.userId;
    console.log({ userId, plan });
    try {
        // Validate input
        if (!userId || !plan || !planPrices[plan]) {
            return console.error('Invalid request');
        }
        const user = await User.findById(userId);
        if (!user) {
            return console.error('user not found');
        }
        const session = await stripe.checkout.sessions.create({
            shipping_address_collection: {
                allowed_countries: ['IN']
            },
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `Subscription - ${plan}`,
                        },
                        unit_amount: planPrices[plan],
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/subscription-successs/${plan}`,
            cancel_url: `${origin}/subscription-failed`,
        })

        return res.json({ sessionId: session.id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to subscribe, please try again later.' });
    }
};

const updateSubscriptionController = async (req, res) => {
    const { plan } = req.body;
    const userId = req.userId;

    try {
        if (!userId || !plan || !planPrices[plan]) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.subscription = {
            plan: plan,
            subscriptionEnd: new Date(new Date().setMonth(new Date().getMonth() + 1)),
            questionsPostedToday: 0
        };
        await user.save();
        return res.json("user successfully subscribed");
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to subscribe, please try again later.' });
    }
};




module.exports = { updateSubscriptionController, subscribeController, chatBotController, getWeatherController }