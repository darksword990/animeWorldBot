const { Schema, model } = require('mongoose')

const schema = new Schema(
    {
        Guild: {
            type: String,
            required: true
        },
        Command: {
            type: [String],
            required: true
        }
    }
)

module.exports = model('enable-disable-cmds', schema)