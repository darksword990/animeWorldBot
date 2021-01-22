const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const welcomeSchema = new mongoose.Schema({
    Guild: reqString,
    channelId: reqString,
    embed: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('welcome-channels', welcomeSchema)