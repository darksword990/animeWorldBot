module.exports = {
    name: 'unban',
    description: 'Unbans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        
        if (message.guild.member(args[0])) return message.channel.send(`Member already exists!`);
        let banned = await message.guild.fetchBans().get(args[0])
        if (!banned) return message.channel.send(`Member is already unbanned!`)
        await message.guild.members.unban(args[0]).then(user => {
            message.channel.send(`${user.username} got unbanned!`)
        })
    }
}