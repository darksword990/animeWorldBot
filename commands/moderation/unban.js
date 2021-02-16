module.exports = {
    name: 'unban',
    description: 'Unbans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    examples: ['76832545763724554'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        let banned = []
        for (const id of args) {
            if (isNaN(parseInt(id))) return;
            if (message.guild.member(id)) return message.channel.send(`One of member already exists, please include banned members!`);
            await message.guild.members.unban(id).then(user => {
                banned.push(`${user.username}`)
            })
        }
        message.channel.send(`${banned.join(", ")} have been unbanned!`)
    }
}