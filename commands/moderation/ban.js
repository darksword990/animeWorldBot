module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    examples: ['@Crawler Being abusive', '76832545763724554 Being abusive'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        const member = message.mentions.members.array() || message.guild.members.cache.get(args[0])
        console.log(member)
        if (!Array.isArray(member)) {
            const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
            if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
            if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't ban a person higher than you!`);
            if (member.id == message.guild.ownerID) return message.channel.send(`You can't ban owner!`);
            if (message.member.id == member.id) return message.channel.send(`You can't ban yourself!`);
            if (member.user.bot) return message.channel.send(`You can't ban the bot!`);
            args.shift()
            message.channel.send(`${member.user.tag} has been banned!`)
            await member.ban({days: 7, reason: `${message.member.user.tag}: ${args.join(" ")}`})
        } else if (Array.isArray(member)) {
            if (member.length != 0) {
                let arr = []
                member.forEach(async m => {
                    const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                    if (botRole <= m.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                    if (message.member.roles.highest.position <= m.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't ban a person higher than you!`);
                    if (m.id == message.guild.ownerID) return message.channel.send(`You can't ban owner!`);
                    if (message.member.id == m.id) return message.channel.send(`You can't ban yourself!`);
                    if (m.user.bot) return message.channel.send(`You can't ban the bot!`);
                    args.shift()
                    arr.push(`${m.user.tag}`)
                    await m.ban({days: 7, reason: `${message.member.user.tag}: ${args.join(" ")}`})
                })
                message.channel.send(`${arr.join(", ")} have been banned!`)
            }
        }
    }
}