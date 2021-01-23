const mongo = require('../../mongo')
const warningschema = require('../../schemas/warning-schema')

module.exports = {
    name: `clearwarns`,
    description: `This will clear all the warnings for a mentioned member`,
    aliases: [`clrwarns`, `clrw`],
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (member) {
            const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
            if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
            if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't clear warnings for a person higher than you!`);
            if (member.id == message.guild.ownerID) return message.channel.send(`Owners can't have warnings!`);
            if (message.member.id == member.id) return message.channel.send(`You can't clear warnings for yourself!`);
            if (member.user.bot) return message.channel.send(`Bots can't have warnings!`);
            await mongo().then(async mongoose => {
                let results = await warningschema.findOne({
                    Guild: message.guild.id,
                    memberID: member.id
                })
    
                if (!results) {
                    message.channel.send(`The user doesn't have any warnings`)
                    return
                }
    
                await warningschema.findOneAndDelete({
                    Guild: message.guild.id,
                    memberID: member.id
                })
                message.channel.send(`${member.user.tag} warnings were cleared!`)
            })
        }
    }
}