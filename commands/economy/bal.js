const economy = require('../../schemas/economy')

module.exports = {
    name: 'balance',
    description: `You can check your balance or someone else's balance`,
    examples: ['@Crawler', '7962738548843556'],
    category: 'economy',
    aliases: ['bal'],
    run: async (client, message, args) => {
        if (!args.length) {
            const bal = await economy.findOne(
                {
                    Guild: message.guild.id,
                    userID: message.member.id
                }
            )
            let embed = {
                title: message.member.user.username + `'s Balance`,
                description: `**Wallet:** :coin: ${bal.Wallet}\n**Bank:** :coin: ${bal.Bank}`
            }
            message.channel.send({embed})
            return;
        }
        const member = message.mentions.members.first() || message.guild.members.get(args[0])
        if (member) {
            const bal = await economy.findOne(
                {
                    Guild: message.guild.id,
                    userID: member.id
                }
            )
            if (!bal) return message.channel.send('That member doesn\'t have money');
            let embed = {
                title: message.member.user.username + `'s Balance`,
                description: `**Wallet:** :coin: ${bal.Wallet}\n**Bank:** :coin: ${bal.Bank}`
            }
            message.channel.send({embed})
        }
    }
}