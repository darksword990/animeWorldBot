const economy = require('../schemas/economy')

function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

module.exports = {
    name: `professor`,
    run: async (client, message, args) => {
        const chosenAmount = getRandInt(3000,6000)
        await economy.findOneAndUpdate(
            {
                Guild: message.guild.id,
                userID: message.member.id
            },
            {
                Guild: message.guild.id,
                userID: message.member.id,
                $inc: {
                    Wallet: chosenAmount
                }
            },
            {
                upsert: true
            }
        )
        message.channel.send(`You earned ${chosenAmount}`)
    }
}