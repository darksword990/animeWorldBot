const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        Guild: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        },
        Wallet: {
            type: Number,
            required: true
        },
        Bank: {
            type: Number,
            required: true
        }
    }
)

module.exports = mongoose.model('user-economy', schema)