module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (member) {
            const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
            if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
            if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't ban a person higher than you!`);
            if (member.id == message.guild.ownerID) return message.channel.send(`You can't ban owner!`);
            if (message.member.id == member.id) return message.channel.send(`You can't ban yourself!`);
            if (member.user.bot) return message.channel.send(`You can't ban the bot!`);
            args.shift()
            message.channel.send(`${member.user.tag} has been banned!`)
            await member.ban({days: 7, reason: `${message.member.user.tag}: ${args.join(" ")}`})
        }
    }
}