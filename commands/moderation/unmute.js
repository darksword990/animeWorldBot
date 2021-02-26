module.exports = {
    name: 'unmute',
    description: 'Unmutes the mentioned member',
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user>`,
    examples: ['@Crawler', '76832545763724554'],
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
            let bannedmembers = []
            let failedtobanmembers = []
            for (const m of kickarr) {
                if (message.guild.member(m)) {
                    let m1 = message.guild.member(m)
                    if (m1.id == message.guild.ownerID) {
                        failedtobanmembers.push(`Couldn't unmute ${m1.user.username}, Owner is never muted!`);
                        continue;
                    }
                    if (message.member.roles.highest.position <= m1.roles.highest.position && !message.guild.owner) {
                        failedtobanmembers.push(`Couldn't unmute ${m1.user.username}, You can't unmute a person higher than you!`);
                        continue;
                    }
                    if (message.member.id == m1.id) {
                        failedtobanmembers.push(`Couldn't unmute ${m1.user.username}, You can't unmute yourself!`);
                        continue;
                    }
                    if (message.guild.members.cache.get(m1.id).id == client.user.id) {
                        failedtobanmembers.push(`Couldn't unmute ${m1.user.username}, You can't unmute the bot!`) 
                        continue;
                    };
                    const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                    if (botRole <= m1.roles.highest.position) {
                        failedtobanmembers.push(`Couldn't unmute ${m1.user.username}, Bot must be higher than the mentioned member!`);
                        continue;
                    }
                    if (m1.hasPermission('ADMINISTRATOR')) {
                        failedtobanmembers.push(`Couldn't unmute ${m1.user.username}, Admins are never muted!`);
                        continue;
                    }
                    let role;
                    (message.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})) ? (role = message.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})) : (await message.guild.roles.create({
                        data: {
                            name: `Muted`,
                            permissions: []
                        }
                    }).then(async r => {
                        role = r
                    }));
                    if (!m1.roles.cache.has(role.id)) {
                        message.channel.send(`Member is already unmuted!`);
                        continue;
                    }
                    await m1.roles.add(role)
                    bannedmembers.push(`${m1.user.tag}`)
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
                message.channel.send(`Successfully unmuted ${bannedmembers.join(", ")}`)
            }
            if (failedtobanmembers.length > 0) {
                message.channel.send(failedtobanmembers.join("\n"))
            }
        }
    }
}