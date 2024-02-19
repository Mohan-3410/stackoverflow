const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { default: mongoose } = require('mongoose');

const signupController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(403).json({ message: "All fields are required" });
        }

        const oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(404).json({ message: "User already registered" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y'
        })
        return res.status(200).json({ result: user, token })
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(403).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not registered" })
        }
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
            return res.status(400).json({ message: "incorrect password" });
        }

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y'
        })
        return res.status(200).json({ result: user, token })
    } catch (e) {
        return res.status(500).send(e.message);
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await User.find();
        const allUserDetails = [];
        allUsers.forEach(users => {
            allUserDetails.push({ _id: users.id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn })
        })
        return res.status(200).json(allUserDetails)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
}

const updateUserController = async (req, res) => {
    const { id: _id } = req.params;
    const { name, about, tags } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('User unavailable');
        }
        const updateProfile = await User.findByIdAndUpdate(_id, { $set: { "name": name, "about": about, "tags": tags } }, { new: true });
        return res.status(200).json(updateProfile)
    } catch (e) {
        return res.status(405).json({ message: e.message })
    }
}

const updatedSubscribedUserController = async (req, res) => {
    const userId = req.userId
    const user = await User.findById(userId);
    return res.send(user)
}
module.exports = {
    updatedSubscribedUserController,
    updateUserController,
    getAllUsersController,
    signupController,
    loginController
}