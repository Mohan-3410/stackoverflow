const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    tags: {
        type: [String],
    },
    subscription: {
        plan: {
            type: String,
            enum: ['free', 'silver', 'gold'],
            default: 'free'
        },
        questionsPostedToday: {
            type: Number,
            default: 0
        },
        subscriptionEnd: {
            type: Date
        }
    },
    joinedOn: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)