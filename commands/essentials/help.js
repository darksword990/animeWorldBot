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
        let economyCommands = commands.filter(f => f.category == `economy`)
        if (!args.length) {
            const embed = {
                color: 0x00ffff,
                title: `Bot Commands`,
                description: `Here's the list of all the commands, type ${prefix}help <command>`,
                fields: [
                    {
                        name: `:hammer: Essential Commands`,
                        value: `[Hover for info](${message.url} "Essential Commands are just those commands which provide some info about server or any thing else depending on the command's functioning")\n\`\`\`${essentialCommands.map(f => f.name).join(", ")}\`\`\``
                    },
                    {
                        name: `:shield: Moderation Commands`,
                        value: `[Hover for info](${message.url} "With Moderation Commands, you can moderate the server for it. Make sure to follow their command arguments!")\n\`\`\`${moderationCommands.map(f => f.name).join(", ")}\`\`\``
                    },
                    {
                        name: `:moneybag: Economy Commands`,
                        value: `[Hover for info](${message.url} "Economy Commands are fun commands just you don't get bored :D")\n\`\`\`${economyCommands.map(f => f.name).join(", ")}\`\`\``
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
            title: `${(cmd.category == `essentials`) ? (emoji = `:hammer:`) : (cmd.category == `moderation`) ? (emoji = `:shield:`) : (emoji = `:moneybag:`)} ${name.capitalize()} Command`,
            fields: []
        }
        if (cmd.description) embed.description = cmd.description;
        if (cmd.aliases) embed.fields.push({name: `Aliases`, value: cmd.aliases.join(", ")});
        if (cmd.usage) embed.fields.push({name: `Usage`, value: `${prefix}${name} ${cmd.usage}`});
        if (cmd.examples) embed.fields.push({name: `Examples`, value: cmd.examples.map(f => `${prefix}${name} ${f}`).join("\n")});
        if (cmd.availableProfessions) embed.fields.push({name: `Available Professions`, value: cmd.availableProfessions.join(", ")});
        message.channel.send({embed})
    }
}