const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const Bot = require('../models/Bot');

const generateOTP = () => {
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    return otp.toString();
}

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        service: 'gmail',
        port: 553,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP Verification',
        text: `Your OTP for authentication is ${otp}`
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const requestOTPController = async (req, res) => {
    const { email } = req.body;
    const userId = req.userId;
    const otp = generateOTP();
    await sendOTP(email, otp);
    let bot = await Bot.findOne({ email });

    if (bot) {
        bot.otp = otp;
    } else {
        bot = new Bot({ email, otp, user: userId });
    }
    await bot.save();

    res.json({ success: true, message: 'OTP sent successfully.' });
}

const verifyOTPController = async (req, res) => {
    const { email, otp } = req.body;
    const userId = req.userId;
    const bot = await Bot.findOne({ email, user: userId });
    if (bot && bot.otp === otp) {
        res.status(200).json({ success: true, message: 'OTP verified successfully.', user: bot.user });
    } else {
        res.json({ success: false, message: 'Invalid OTP.' });
    }
}

const getBotController = async (req, res) => {
    try {
        const userId = req.userId;
        const bot = await Bot.findOne({ user: userId });
        return res.status(200).json(bot.user)
    } catch (error) {
        return res.json({ error: error.message });
    }

}

module.exports = { getBotController, verifyOTPController, requestOTPController }
