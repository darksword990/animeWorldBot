const mongo = require('../../mongo')
const warningschema = require('../../schemas/warning-schema')

module.exports = {
    name: 'listwarns',
    aliases: ['lw', 'lwarns'],
    description: `Lists member's warnings in this guild`,
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    example: ['@Crawler', '76832545763724554'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (member) {
            const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
            if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
            if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't ban a person higher than you!`);
            if (member.id == message.guild.ownerID) return message.channel.send(`Owners don't have warnings!`);
            if (message.member.id == member.id) return message.channel.send(`You can't list warnings for yourself, ask a moderator!`);
            if (member.user.bot) return message.channel.send(`Bots don't have warnings!`);
            args.shift()
            await mongo().then(async mongoose => {
                let results = await warningschema.findOne({
                    Guild: message.guild.id,
                    memberID: member.id
                })
    
                if (!results) {
                    message.channel.send(`The user doesn't have any warnings`)
                    return
                }
    
                let reply = `**Warnings for <@${member.id}>:**\n\n`
    
                for (const warning of results.warns) {
                    const { executor, time, reason } = warning
    
                    reply += `Warning By ${executor} on ${new Date(time).toLocaleDateString()} for reason "${reason}"\n\n`
                }
    
                const embed = {
                    author: {
                        name: message.member.user.tag,
                        icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                    },
                    title: 'Warnings',
                    color: 0xff0000,
                    description: reply
                }
    
                message.reply({embed})
            })
        }
    }
}