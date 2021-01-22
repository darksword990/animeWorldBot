const mongo = require('../mongo')
const muteschema = require('../schemas/mute-schema')

module.exports = async (member, client) => {
    let res;
    await mongo().then(async mongoose => {
        res = await muteschema.findOne({
            Guild: member.guild.id,
            userID: member.id
        })
    })
    if (res && res.isMuted == true) {
        let role = member.guild.roles.cache.find(f => {return f.name.includes(`Muted`)})
        if (!role) {
            await member.guild.roles.create({
                data: {
                    name: `Muted`,
                    permissions: []
                }
            }).then(async r => {
                await member.roles.add(r)
            })
            member.guild.channels.cache.filter(f =>  f.type == `text`).forEach(overwritech => {
                overwritech.createOverwrite(r, {
                    SEND_MESSAGES: false
                })
            })
            member.guild.channels.cache.filter(f => f.type == `voice`).forEach(overwritech => {
                overwritech.createOverwrite(r, {
                    CONNECT: false
                })
            })
        } else {
            await member.roles.add(role)
            member.guild.channels.cache.filter(f =>  f.type == `text`).forEach(overwritech => {
                overwritech.createOverwrite(role, {
                    SEND_MESSAGES: false
                })
            })
            member.guild.channels.cache.filter(f => f.type == `voice`).forEach(overwritech => {
                overwritech.createOverwrite(role, {
                    CONNECT: false
                })
            })
        }
    }
}