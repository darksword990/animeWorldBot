const mongo = require('../../mongo')
const muteschmea = require('../../schemas/mute-schema')

module.exports = {
    name: 'mute',
    description: 'Mutes the mentioned member',
    permissions: ['KICK_MEMBERS'],
    category: `moderation`,
    usage: `<user> <reason>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        
        if (isNaN(parseInt(args[0]))){
            if (message.mentions.members.first()) {
                const member = message.mentions.members.first()
                const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't mute a person higher than you!`);
                if (member.id == message.guild.ownerID) return message.channel.send(`You can't mute owner!`);
                if (message.member.id == member.id) return message.channel.send(`You can't mute yourself!`);
                if (member.user.bot) return message.channel.send(`You can't mute the bot!`);
                args.shift()
                let role = message.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})
                let results = await muteschmea.findOne({Guild: message.guild.id, userID: member.id})
                if (results && results.isMuted === true) return message.channel.send(`Already Muted`);
                await mongo().then(async mongoose => {
                    await muteschmea.findOneAndUpdate(
                        {
                            Guild: message.guild.id,
                            userID: member.id
                        },
                        {
                            Guild: message.guild.id,
                            userID: member.id,
                            staffID: message.member.id,
                            reason: args.join(" "),
                            isMuted: true
                        },
                        {
                            upsert: true
                        }
                    )
                })
                if (!role) {
                    await message.guild.roles.create({
                        data: {
                            name: `Muted`,
                            permissions: []
                        }
                    }).then(async r => {
                        
                        await member.roles.add(r)
                        message.channel.send(`Successfully muted ${member.user.tag}`)
                        message.guild.channels.cache.filter(f =>  f.type == `text`).forEach(overwritech => {
                            overwritech.createOverwrite(r, {
                                SEND_MESSAGES: false
                            })
                        })
                        message.guild.channels.cache.filter(f => f.type == `voice`).forEach(overwritech => {
                            overwritech.createOverwrite(r, {
                                CONNECT: false
                            })
                        })
                    })
                } else {
                    await member.roles.add(role)
                    message.channel.send(`Successfully muted ${member.user.tag}`)
                    message.guild.channels.cache.filter(f =>  f.type == `text`).forEach(overwritech => {
                        overwritech.createOverwrite(role, {
                            SEND_MESSAGES: false
                        })
                    })
                    message.guild.channels.cache.filter(f => f.type == `voice`).forEach(overwritech => {
                        overwritech.createOverwrite(role, {
                            CONNECT: false
                        })
                    })
                }
            }
        } else {
            const memberid = args[0]
            if (message.guild.member(memberid)) {
                const member = message.guild.member(memberid)
                const botRole = client.guilds.cache.get(message.guild.id).member(client.user.id).roles.highest.position
                if (botRole <= member.roles.highest.position) return message.channel.send(`Bot must be higher than the mentioned member!`);
                if (message.member.roles.highest.position <= member.roles.highest.position && !message.guild.owner) return message.channel.send(`You can't mute a person higher than you!`);
                if (member.id == message.guild.ownerID) return message.channel.send(`You can't mute owner!`);
                if (message.member.id == member.id) return message.channel.send(`You can't mute yourself!`);
                if (member.user.bot) return message.channel.send(`You can't mute the bot!`);
                args.shift()
                let role = message.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})
                let results = await muteschmea.findOne({Guild: message.guild.id, userID: member.id})
                if (results && results.isMuted === true) return message.channel.send(`Already Muted`);
                await mongo().then(async mongoose => {
                    await muteschmea.findOneAndUpdate(
                        {
                            Guild: message.guild.id,
                            userID: member.id
                        },
                        {
                            Guild: message.guild.id,
                            userID: member.id,
                            staffID: message.member.id,
                            reason: args.join(" "),
                            isMuted: true
                        },
                        {
                            upsert: true
                        }
                    )
                })
                if (!role) {
                    await message.guild.roles.create({
                        data: {
                            name: `Muted`,
                            permissions: []
                        }
                    }).then(async r => {
                        
                        await member.roles.add(r)
                        message.channel.send(`Successfully muted ${member.user.tag}`)
                        message.guild.channels.cache.filter(f =>  f.type == `text`).forEach(overwritech => {
                            overwritech.createOverwrite(r, {
                                SEND_MESSAGES: false
                            })
                        })
                        message.guild.channels.cache.filter(f => f.type == `voice`).forEach(overwritech => {
                            overwritech.createOverwrite(r, {
                                CONNECT: false
                            })
                        })
                    })
                } else {
                    await member.roles.add(role)
                    message.channel.send(`Successfully muted ${member.user.tag}`)
                    message.guild.channels.cache.filter(f =>  f.type == `text`).forEach(overwritech => {
                        overwritech.createOverwrite(role, {
                            SEND_MESSAGES: false
                        })
                    })
                    message.guild.channels.cache.filter(f => f.type == `voice`).forEach(overwritech => {
                        overwritech.createOverwrite(role, {
                            CONNECT: false
                        })
                    })
                }
            }
        }
    }
}