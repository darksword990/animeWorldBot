const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const muteSchema = new mongoose.Schema({
    Guild: reqString,
    userID: reqString,
    staffID: reqString,
    reason: reqString,
    isMuted: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('server-mutes', muteSchema)