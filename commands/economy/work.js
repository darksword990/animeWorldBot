const economy = require('../../schemas/economy')
const Discord = require('discord.js')
const ms = require('ms')
const fs = require('fs')
const names = fs.readdirSync('./economyProfessions').filter(f => f.endsWith('.js'))
function returnAvailableProfessions() {
    const namesarr = []
    for (const n of names) {
        const file = require(`../../economyProfessions/${n}`)
        namesarr.push(file.name)
    }
    return namesarr
}

module.exports = {
    name: `work`,
    description: `You can earn money by working from any profession!`,
    category: `economy`,
    usage: '<profession>',
    examples: ['professor', 'doctor', 'youtuber'],
    availableProfessions: returnAvailableProfessions(),
    run: async (client, message, args) => {
        const economyCooldowns = client.economyCooldowns
        const economyProfessions = client.economyProfessions
        const chosenProfession = args[0].toLowerCase()
        const profession = economyProfessions.get(chosenProfession)
        if (!profession) return;
        if (!economyCooldowns.has(this.name)) {
            economyCooldowns.set(this.name, new Discord.Collection())
        }
        const now = Date.now()
        const timestamps = economyCooldowns.get(this.name)
        const cooldownAmount = ms('1h')
        if (timestamps.has(message.author.id)) {
            const expTime = timestamps.get(message.author.id) + cooldownAmount
            if (now < expTime) {
                const timeLeft = (expTime - now)
                return message.channel.send(`Please wait ${ms(timeLeft)}, before reusing this command!`)
            }
        }
        timestamps.set(message.author.id, now)
        setTimeout(() => {
            timestamps.delete(message.author.id)
        }, cooldownAmount)
        profession.run(client, message, args)
    }
}