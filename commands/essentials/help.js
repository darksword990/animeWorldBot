String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

module.exports = {
    name: 'help',
    aliases: ['cmd', 'commands'],
    run: async (client, message, args, prefix) => {
        const { commands } = client
        let essentialCommands = commands.filter(f => f.category == `essentials`)
        let moderationCommands = commands.filter(f => f.category == `moderation`)
        if (!args.length) {
            const embed = {
                color: 0x00ffff,
                title: `Bot Commands`,
                description: `Here's the list of all the commands, type ${prefix}help <command>`,
                fields: [
                    {
                        name: `:hammer: Essential Commands`,
                        value: `\`\`\`${essentialCommands.map(f => f.name).join(", ")}\`\`\``
                    },
                    {
                        name: `:shield: Moderation Commands`,
                        value: `\`\`\`${moderationCommands.map(f => f.name).join(", ")}\`\`\``
                    }
                ]
            }
            message.channel.send({embed})
            return
        }
        const commandName = args[0]
        const cmd = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
        if (!cmd) return;
        const name = cmd.name
        let emoji;
        const embed = {
            color: 0x00ffff,
            title: `${(cmd.category == `essentials`) ? (emoji = `:hammer:`) : (emoji = `:shield:`)} ${name.capitalize()} Command`,
            fields: []
        }
        if (cmd.description) embed.description = cmd.description;
        if (cmd.aliases) embed.fields.push({name: `Aliases`, value: cmd.aliases.join(", ")});
        if (cmd.usage) embed.fields.push({name: `Usage`, value: `${prefix}${name} ${cmd.usage}`});
        message.channel.send({embed})
    }
}