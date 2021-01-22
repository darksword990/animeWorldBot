module.exports = {
    name: 'unban',
    description: 'Unbans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        
        if (message.guild.member(args[0])) return message.channel.send(`Member already exists!`);
        await message.guild.members.unban(args[0]).then(user => {
            message.channel.send(`${user.username} got unbanned!`)
        })
    }
}