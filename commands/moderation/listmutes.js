const mongo = require('../../mongo')
const muteschema = require('../../schemas/mute-schema')

module.exports = {
    name: 'listmutes',
    aliases: ['lmutes', 'lm'],
    description: `Lists all the muted members from this guild`,
    permissions: [`KICK_MEMBERS`],
    category: `moderation`,
    run: async (client, message, args, prefix) => {
        let mutes = await muteschema.find(
            {
                Guild: message.guild.id
            }
        )
        let reply = ``
        for (const mute of mutes) {
            const { userID, staffID, createdAt, reason } = mute
            reply += `Muted by <@${staffID}> on ${new Date(createdAt).toLocaleDateString()} on <@${userID}> for "${reason}"\n\n`
        }
        message.channel.send({embed: {
            color: 0xff0000,
            title: `Guild Mutes`,
            description: reply
        }})
    }
}