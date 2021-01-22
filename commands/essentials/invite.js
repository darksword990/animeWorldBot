module.exports = {
    name: `invite`,
    description: 'You can invite this bot to your server!',
    category: `essentials`,
    run: async (client, message, args, prefix) => {
        await client.generateInvite(
            {
                permissions: ['ADMINISTRATOR']
            }
        ).then(link => {
            message.channel.send(`Invite this bot to your server: ${link}`)
        })
    }
}