const mongoose = require('mongoose')
const env = require('dotenv')
env.config()

module.exports = async () => {
    await mongoose.connect(process.env.animeWorldDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    return mongoose
}