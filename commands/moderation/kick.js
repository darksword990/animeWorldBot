module.exports = {
    name: `kick`,
    description: `Kicks the mentioned member`,
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    examples: ['@Crawler Being abusive', '76832545763724554 Being abusive'],
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        let kickarr = []
        for (const arg of args) {
            const matches = arg.match(/^<@!?(\d+)>$/) || arg.match(/^\d\d+$/);
            if (matches) {
                if (matches[1] && matches[1].length > 6) {
                    kickarr.push(matches[1])
                } else if (matches[0] && matches[0].length > 6) {
                    kickarr.push(matches[0])
                }
            }
        }
        if (kickarr.length != 0) {
            let reason = args.slice(kickarr.length-args.length).join(" ")
            let executor = message.member.user.tag
            let bannedmembers = []
            let failedtobanmembers = []
            for (const m of kickarr) {
                if (message.guild.member(m)) {
                    let m1 = message.guild.member(m)
                    if (m1.id == message.guild.ownerID) {
                        failedtobanmembers.push(`Couldn't kick ${m1.user.username}, You can't kick owner!`);
                        continue;
                    }
                    if (message.member.roles.highest.position <= m1.roles.highest.position && !message.guild.owner) {
                        failedtobanmembers.push(`Couldn't kick ${m1.user.username}, You can't kick a person higher than you!`);
                        continue;
                    }
                    if (message.member.id == m1.id) {
                        failedtobanmembers.push(`Couldn't kick ${m1.user.username}, You can't kick yourself!`);
                        continue;
                    }
                    if (message.guild.members.cache.get(m1.id).id == client.user.id) {
                        failedtobanmembers.push(`Couldn't kick ${m1.user.username}, You can't kick the bot!`) 
                        continue;
                    };
                    const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                    if (botRole <= m1.roles.highest.position) {
                        failedtobanmembers.push(`Couldn't kick ${m1.user.username}, Bot must be higher than the mentioned member!`);
                        continue;
                    }
                    if (m1.hasPermission('ADMINISTRATOR')) {
                        failedtobanmembers.push(`Couldn't kick ${m1.user.username}, That member has Administrator!`);
                        continue;
                    }
                    await m1.kick(`${executor}: ${reason}`).then(mem => {
                        bannedmembers.push(`${mem.user.username}#${mem.user.discriminator}`)
                    })
                    .catch(err => {
                        message.channel.send(`Failed to kick a user, an invalid user provided or there was an error`)
                    })
                } else {
                    await client.users.fetch(m).then(u => {
                        failedtobanmembers.push(`${u.username}#${u.discriminator} is not in the server!`)
                    })
                    continue;
                }
            }
            if (failedtobanmembers.length == 0 && bannedmembers.length == 0) return;
            if (failedtobanmembers.length > 0 && bannedmembers.length == 0) return message.channel.send(failedtobanmembers.join("\n"));
            if (bannedmembers.length > 0) {
                message.channel.send(`Successfully kicked ${bannedmembers.join(", ")}`)
            }
            if (failedtobanmembers.length > 0) {
                message.channel.send(failedtobanmembers.join("\n"))
            }
        }
    }
}