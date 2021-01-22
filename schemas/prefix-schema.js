const mongoose = require('mongoose')

const prefixSchema = new mongoose.Schema({
    Guild: {
        type: String,
        required: true
    },
    Prefix: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('custom-prefix', prefixSchema)