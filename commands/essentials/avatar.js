module.exports = {
    name: 'avatar',
    description: 'Shows mentioned member\'s profile picture or your own profile picture',
    aliases: ['av'],
    category: `essentials`,
    usage: `<member mention/member id>(optional)`,
    examples: ['@Crawler', '767858235465342'],
    run: async (client, message, args, prefix) => {
        if (!args.length) {
            return message.channel.send(
                {
                    embed: {
                        title: `Avatar`,
                        author: {
                            name: message.member.user.tag,
                            icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                        },
                        image: {
                            url: message.member.user.displayAvatarURL({format: 'png', dynamic: true, size: 4096})
                        }
                    }
                }
            )
        }
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(f => f.name.includes(args.join(" ")))
        if (member) {
            message.channel.send(
                {
                    embed: {
                        title: `Avatar`,
                        author: {
                            name: message.member.user.tag,
                            icon_url: message.member.user.displayAvatarURL({format: 'png', dynamic: true})
                        },
                        image: {
                            url: member.user.displayAvatarURL({format: 'png', dynamic: true, size: 4096})
                        }
                    }
                }
            )
        }
    }
}