module.exports = {
    name: 'serverinfo',
    description: 'Gives the server\'s info',
    category: `essentials`,
    run: async (client, message, args, prefix) => {
        if (!message.guild.available) return;
        const guild = message.guild
        const vc = guild.channels.cache.filter(f => f.type == `voice`).size
        const textc = guild.channels.cache.filter(f => f.type == `text`).size
        const bots = guild.members.cache.filter(f => f.user.bot).size
        const humans = guild.members.cache.filter(f => !f.user.bot).size
        const embed = {
            color: 0x7788d9,
            title: `Info for ${guild.name}`,
            fields: [
                {
                    name: `Owner`,
                    value: guild.owner.user.tag,
                    inline: true
                }
            ],
            thumbnail: {
                url: guild.iconURL({format: 'png', dynamic: true, size: 4096})
            },
            timestamp: new Date(guild.createdTimestamp),
            footer: {
                text: `ID: ${guild.id}`
            }
        }
        if (guild.features.length > 0) {
            embed.fields.push(
                {
                    name: `Features`,
                    value: guild.features.map(f => `:white_check_mark: ${f.split("_").join(" ")}`),
                    inline: true
                }
            )
        }
        embed.fields.push(
            {
                name: `Boosts`,
                value: `Level: ${guild.premiumTier}\nBoosts: ${guild.premiumSubscriptionCount}`,
                inline: true
            }
        )
        embed.fields.push(
            {
                name: `Channels`,
                value: `Total Channels: ${vc+textc}\nVoice Channels: ${vc}\nText Channels: ${textc}`,
                inline: true
            }
        )
        let verified;
        embed.fields.push(
            {
                name: `Info`,
                value: `Verification Level: ${guild.verificationLevel}\nRegion: ${guild.region}\nVerified: ${(guild.verified) ? verified = `:white_check_mark: Yes` : verified = `:x: No`}`,
                inline: true
            }
        )
        embed.fields.push(
            {
                name: `Members`,
                value: `Total: ${bots+humans}\nHumans: ${humans}\nBots: ${bots}`,
                inline: true
            }
        )
        embed.fields.push(
            {
                name: `Roles`,
                value: `${guild.roles.cache.filter(f => f.id !== message.guild.id).size} Roles`,
                inline: true
            }
        )
        embed.fields.push(
            {
                name: `Emojis`,
                value: `${guild.emojis.cache.size} Emojis`,
                inline: true
            }
        )
        message.channel.send({embed})
    }
}