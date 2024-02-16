const mongoose = require('mongoose')

const BotSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = mongoose.model('Bot', BotSchema)