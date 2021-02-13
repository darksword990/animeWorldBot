module.exports = {
    name: 'unban',
    description: 'Unbans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    examples: ['76832545763724554'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        if (isNaN(parseInt(args[0]))) return;
        if (message.guild.member(args[0])) return message.channel.send(`Member already exists!`);
        let banned = await message.guild.fetchBans()
        if (!banned.get(args[0])) return message.channel.send(`Member is already unbanned!`)
        await message.guild.members.unban(args[0]).then(user => {
            message.channel.send(`${user.username} got unbanned!`)
        })
    }
}