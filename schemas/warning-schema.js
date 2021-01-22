const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const welcomeSchema = new mongoose.Schema({
    Guild: reqString,
    memberID: reqString,
    warns: {
        type: [Object],
        required: true
    }
})

module.exports = mongoose.model('user-warnings', welcomeSchema)