module.exports = {
    name: `kick`,
    description: `Kicks the mentioned member`,
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        
        if (isNaN(parseInt(args[0]))){
            if (message.mentions.members.first()) {
                const member = message.mentions.members.first()
                const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't kick a person higher than you!`);
                if (member.id == message.guild.ownerID) return message.channel.send(`You can't kick owner!`);
                if (message.member.id == member.id) return message.channel.send(`You can't kick yourself!`);
                if (member.user.bot) return message.channel.send(`You can't kick the bot!`);
                args.shift()
                message.channel.send(`${member.user.tag} has been kicked!`)
                await member.kick(args.join(" "))
            }
        } else {
            const memberid = args[0]
            if (message.guild.member(memberid)) {
                const member = message.guild.member(memberid)
                const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't kick a person higher than you!`);
                if (member.id == message.guild.ownerID) return message.channel.send(`You can't kick owner!`);
                if (message.member.id == member.id) return message.channel.send(`You can't kick yourself!`);
                if (member.user.bot) return message.channel.send(`You can't kick the bot!`);
                args.shift()
                message.channel.send(`${member.user.tag} has been kicked!`)
                await member.kick(args.join(" "))
            }
        }
    }
}