const mongo = require('../../mongo')

module.exports = {
    name: 'unmute',
    description: 'Unmutes the mentioned member',
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    examples: ['@Crawler', '76832545763724554'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (member) {
            const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
            if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
            if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't mute a person higher than you!`);
            if (member.id == message.guild.ownerID) return message.channel.send(`You can't unmute owner!`);
            if (message.member.id == member.id) return message.channel.send(`You can't unmute yourself!`);
            if (member.user.bot) return message.channel.send(`You can't unmute the bot!`);
            args.shift()
            let role;
            (message.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})) ? (role = message.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})) : (await message.guild.roles.create({
                data: {
                    name: `Muted`,
                    permissions: []
                }
            }).then(async r => {
                role = r
            }));
            if (!member.roles.cache.has(role.id)) return message.channel.send(`Member is already unmuted!`);
            await member.roles.remove(role)
            message.channel.send(`Successfully unmuted ${member.user.tag}`)
        }
    }
}