module.exports = {
    name: 'listbans',
    aliases: ['lbans', 'lb'],
    description: `Lists all the banned members from this guild`,
    permissions: [`BAN_MEMBERS`],
    category: `moderation`,
    run: async (client, message, args, prefix) => {
        let bans = await message.guild.fetchBans()
        let bansarray = bans.array()
        if (bansarray.length == 0) {
            return message.channel.send(`There's no banned member`)
        }
        let bansinfos = []
        for (const ban of bansarray) {
            bansinfos.push(`<@${ban.user.id}>`)
        }
        const embed = {
            color: 0xff0000,
            author: {
                name: message.member.user.tag,
                icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
            },
            title: `Guild Bans`,
            description: bansinfos.join(", ")
        }
        message.channel.send({embed})
    }
}