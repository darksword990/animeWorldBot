module.exports = {
    name: `voicemove`,
    run: async (client, message, args) => {
        if (!args.length) return;
        if (message.member.voice.channel) {
            let channel = message.member.voice.channel
            let id = args[0]
            let vc = message.guild.channels.cache.get(id)
            if (vc && vc.type != `voice`) return;
            let members = channel.members.array()
            for (const member of members) {
                await member.voice.setChannel(vc.id)
            }
        }
    }
}