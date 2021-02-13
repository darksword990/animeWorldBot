module.exports = {
    name: `voicemove`,
    description: `Moves the members in a different voice channel`,
    aliases: ['voicem'],
    category: 'moderation',
    usage: `<channelid>`,
    permissions: ['KICK_MEMBERS', 'BAN_MEMBERS'],
    examples: ['337683258456328'],
    run: async (client, message, args) => {
        if (!args.length) return;
        if (message.member.voice.channel) {
            let channel = message.member.voice.channel
            let id = args[0]
            if (isNaN(id)) return;
            let vc = message.guild.channels.cache.get(id)
            if (vc && vc.type != `voice`) return;
            let members = channel.members.array()
            for (const member of members) {
                await member.voice.setChannel(vc.id)
            }
        }
    }
}