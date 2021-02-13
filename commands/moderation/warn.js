const mongo = require('../../mongo')
const warningschema = require('../../schemas/warning-schema')

module.exports = {
    name: `warn`,
    description: `Warns the member`,
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    example: ['@Crawler Being abusive', '76832545763724554 Being abusive'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (member) {
            const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
            if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
            if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't warn a person higher than you!`);
            if (member.id == message.guild.ownerID) return message.channel.send(`You can't warn owner!`);
            if (message.member.id == member.id) return message.channel.send(`You can't warn yourself!`);
            if (member.user.bot) return message.channel.send(`You can't warn the bot!`);
            args.shift()
            const warning = {
                executor: `<@${message.member.id}>`,
                time: new Date().getTime(),
                reason: args.join(" ")
            }
            await mongo().then(async mongoose => {
                await warningschema.findOneAndUpdate(
                    {
                        Guild: message.guild.id,
                        memberID: member.id
                    },
                    {
                        Guild: message.guild.id,
                        memberID: member.id,
                        $push: {
                            warns: warning
                        }
                    },
                    {
                        upsert: true
                    }
                )
                message.channel.send(`${member.user.tag} has been warned!`)
            })
        }
    }
}