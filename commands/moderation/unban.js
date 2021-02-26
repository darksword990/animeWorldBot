module.exports = {
    name: 'unban',
    description: 'Unbans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user ids>`,
    examples: ['76832545763724554'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        let unbanarr = []
        for (const arg of args) {
            const matches = arg.match(/^<@!?(\d+)>$/) || arg.match(/^\d\d+$/);
            if (matches) {
                if (matches[1] && matches[1].length > 6) {
                    unbanarr.push(matches[1])
                } else if (matches[0] && matches[0].length > 6) {
                    unbanarr.push(matches[0])
                }
            }
        }
        if (unbanarr.length != 0) {
            let unbannedmembers = []
            let failedtounbanmembers = []
            let banned = await message.guild.fetchBans()
            if (banned.array().length == 0) {
                return message.channel.send(`There are currently no banned members!`)
            }
            for (const m of unbanarr) {
                if (isNaN(parseInt(m))) {
                    failedtounbanmembers.push(`Couldn't unban ${m}`);
                    continue;
                }
                if (message.guild.member(m)) {
                    failedtounbanmembers.push(`Couldn't unban ${m}, User already exists!`);
                    continue;
                }
                if (banned.get(m)) {
                    await message.guild.members.unban(m).then(u => {
                        unbannedmembers.push(`${u.username}#${u.discriminator}`)
                    })
                } else {
                    failedtounbanmembers.push(`Couldn't unban ${m}, User is not banned!`);
                    continue;
                }
            }

            if (failedtounbanmembers.length != 0) {
                message.channel.send(failedtounbanmembers.join("\n"))
            }
            if (unbannedmembers.length != 0) {
                message.channel.send(`Successfully unbanned ${unbannedmembers.join(", ")}`)
            }
        }
    }
}