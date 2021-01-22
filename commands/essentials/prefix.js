const prefixschema = require('../../schemas/prefix-schema')
const mongo = require('../../mongo')

module.exports = {
    name: 'setprefix',
    description: 'Sets the server prefix',
    aliases: ['prefix'],
    permissions: ['ADMINISTRATOR'],
    category: `essentials`,
    usage: `<prefixToSet>`,
    run: async (client, message, args, prefix) => {
        if (!args.length) return;
        await mongo().then(async mongoose => {
            try {
                let serverprefix = await prefixschema.findOneAndUpdate(
                    {
                        Guild: message.guild.id,
                    },
                    {
                        Guild: message.guild.id,
                        Prefix: args[0]
                    },
                    {
                        upsert: true,
                        new: true
                    }
                )
                message.channel.send(`Prefix for this server is now ${serverprefix.Prefix}`)
            } finally {
                mongoose.connection.close()
            }
        })
    }
}