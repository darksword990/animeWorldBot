module.exports = {
    name: 'report',
    description: 'Reports the mentioned member',
    category: `moderation`,
    usage: `<user> <reason>(for proof you can do an attachment)`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;

        if (isNaN(parseInt(args[0]))){
            if (message.mentions.members.first()) {
                const member = message.mentions.members.first()
                const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't report a person higher than you!`);
                if (member.id == message.guild.ownerID) return message.channel.send(`You can't report owner!`);
                if (message.member.id == member.id) return message.channel.send(`You can't report yourself!`);
                if (member.user.bot) return message.channel.send(`You can't report the bot!`);
                args.shift()
                const channel = message.guild.channels.cache.find(f => f.name.includes(`report-logs`))
                if (!channel) {
                    message.guild.channels.create(`report-logs`, {
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: [`VIEW_CHANNEL`]
                            }
                        ]
                    }).then(chan => {
                        const embed = {
                            author: {
                                name: message.member.user.tag,
                                icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                            },
                            title: `Moderation Report`,
                            description: `**Reported by:** <@${message.member.id}>\n**Reported to:** <@${member.id}>\n\n**Report Description:** ${args.join(" ")}`,
                        }
                        if (message.attachments.size > 0) {
                            chan.send({embed, files: [message.attachments.first().url]})
                            message.channel.send(`Successfully reported the member`)
                        } else {
                            chan.send({embed})
                            message.channel.send(`Successfully reported the member`)
                        }
                    })
                } else {
                    const embed = {
                        author: {
                            name: message.member.user.tag,
                            icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                        },
                        title: `Moderation Report`,
                        description: `**Reported by:** <@${message.member.id}>\n**Reported to:** <@${member.id}>\n\n**Report Description:** ${args.join(" ")}`,
                    }
                    if (message.attachments.size > 0) {
                        channel.send({embed, files: [message.attachments.first().url]})
                        message.channel.send(`Successfully reported the member`)
                    } else {
                        channel.send({embed})
                        message.channel.send(`Successfully reported the member`)
                    }
                }
            }
        } else {
            const memberid = args[0]
            if (message.guild.member(memberid)) {
                const member = message.guild.member(memberid)
                const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't report a person higher than you!`);
                if (member.id == message.guild.ownerID) return message.channel.send(`You can't report owner!`);
                if (message.member.id == member.id) return message.channel.send(`You can't report yourself!`);
                if (member.user.bot) return message.channel.send(`You can't report the bot!`);
                args.shift()
                const channel = message.guild.channels.cache.find(f => f.name.includes(`report-logs`))
                if (!channel) {
                    message.guild.channels.create(`report-logs`, {
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: [`VIEW_CHANNEL`]
                            }
                        ]
                    }).then(chan => {
                        const embed = {
                            author: {
                                name: message.member.user.tag,
                                icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                            },
                            title: `Moderation Report`,
                            description: `**Reported by:** <@${message.member.id}>\n**Reported to:** <@${member.id}>\n\n**Report Description:** ${args.join(" ")}`,
                        }
                        if (message.attachments.size > 0) {
                            chan.send({embed, files: [`${message.attachments.first().url}`]})
                            message.channel.send(`Successfully reported the member`)
                        } else {
                            chan.send({embed})
                            message.channel.send(`Successfully reported the member`)
                        }
                    })
                } else {
                    const embed = {
                        author: {
                            name: message.member.user.tag,
                            icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                        },
                        title: `Moderation Report`,
                        description: `**Reported by:** <@${message.member.id}>\n**Reported to:** <@${member.id}>\n\n**Report Description:** ${args.join(" ")}`,
                    }
                    if (message.attachments.size > 0) {
                        channel.send({embed, files: [message.attachments.first().url]})
                        message.channel.send(`Successfully reported the member`)
                    } else {
                        channel.send({embed})
                        message.channel.send(`Successfully reported the member`)
                    }
                }
            }
        }
    }
}