module.exports = {
    name: 'ban',
    description: 'Bans the mentioned member',
    permissions: ['BAN_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    examples: ['@Crawler Being abusive', '76832545763724554 Being abusive'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        let banarr = []
        for (const arg of args) {
            const matches = arg.match(/^<@!?(\d+)>$/) || arg.match(/^\d\d+$/);
            if (matches) {
                if (matches[1] && matches[1].length > 6) {
                    banarr.push(matches[1])
                } else if (matches[0] && matches[0].length > 6) {
                    banarr.push(matches[0])
                }
            }
        }
        if (banarr.length != 0) {
            let reason = args.slice(banarr.length-args.length).join(" ")
            let executor = message.member.user.tag
            let bannedmembers = []
            let failedtobanmembers = []
            let banned = await message.guild.fetchBans()
            for (const m of banarr) {
                if (message.guild.member(m)) {
                    let m1 = message.guild.member(m)
                    if (banned.get(m1.id)) {
                        failedtobanmembers.push(`${banned.get(m1.id).user.username}#${banned.get(m1.id).user.discriminator} is already banned!`)
                        continue;
                    }
                    if (m1.id == message.guild.ownerID) {
                        failedtobanmembers.push(`Couldn't ban ${m1.user.username}, You can't ban owner!`);
                        continue;
                    }
                    if (m1.hasPermission('ADMINISTRATOR')) {
                        failedtobanmembers.push(`Couldn't ban ${m1.user.username}, That member has Administrator!`);
                        continue;
                    }
                    if (message.guild.members.cache.get(m1.id).id == client.user.id) {
                        failedtobanmembers.push(`Couldn't ban ${m1.user.username}, You can't ban the bot!`) 
                        continue;
                    };
                    const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                    if (botRole <= m1.roles.highest.position) {
                        failedtobanmembers.push(`Couldn't ban ${m1.user.username}, Bot must be higher than the mentioned member!`);
                        continue;
                    }
                    if (message.member.roles.highest.position <= m1.roles.highest.position) {
                        failedtobanmembers.push(`Couldn't ban ${m1.user.username}, You can't ban a person higher than you!`);
                        continue;
                    }
                    if (message.member.id == m1.id) {
                        failedtobanmembers.push(`Couldn't ban ${m1.user.username}, You can't ban yourself!`);
                        continue;
                    }
                    await message.guild.members.ban(m1.id, {days: 7, reason: `${executor}: ${reason}`}).then(u => {
                        bannedmembers.push(`${u.username}#${u.discriminator}`)
                    })
                    .catch(err => {
                        message.channel.send(`Failed to ban a user, an invalid user provided or there was an error`)
                    })
                } else {
                    if (banned.get(m)) {
                        failedtobanmembers.push(`${banned.get(m).user.username}#${banned.get(m).user.discriminator} is already banned`)
                        continue;
                    }
                    await message.guild.members.ban(m, {days: 7, reason: `${executor}: ${reason}`}).then(u => {
                        bannedmembers.push(`${u.username}#${u.discriminator}`)
                    })
                    .catch(err => {
                        message.channel.send(`Failed to ban a user, an invalid user provided or there was an error`)
                    })
                }
            }
            if (failedtobanmembers.length == 0 && bannedmembers.length == 0) return;
            if (failedtobanmembers.length > 0 && bannedmembers.length == 0) return message.channel.send(failedtobanmembers.join("\n"));
            if (bannedmembers.length > 0) {
                message.channel.send(`Successfully banned ${bannedmembers.join(", ")}`)
            }
            if (failedtobanmembers.length > 0) {
                message.channel.send(failedtobanmembers.join("\n"))
            }
        }
    }
}