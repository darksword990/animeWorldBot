module.exports = {
    name: 'ping',
    description: `Gives bot's ping`,
    run: async (client, message, args, prefix) => {
        message.channel.send(`Calculating...`).then(msg => {
            const diff = msg.createdTimestamp - message.createdTimestamp
            const embed = {
                title: `Pong!`,
                description: `:white_check_mark:\nPing: ${diff}ms\nAPI: ${client.ws.ping}`
            }
            message.channel.send({embed})
        })
    }
}