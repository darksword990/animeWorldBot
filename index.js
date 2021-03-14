const Discord = require('discord.js')
const env = require('dotenv')
const client = new Discord.Client()
client.commands = new Discord.Collection()
client.economyProfessions = new Discord.Collection()
client.economyCooldowns = new Discord.Collection()
const fs = require('fs')
const commands = fs.readdirSync('./commands')
env.config()

const professionFiles = fs.readdirSync('./economyProfessions').filter(f => f.endsWith('.js'))

for (const profession of professionFiles) {
  const profile = require(`./economyProfessions/${profession}`)
  client.economyProfessions.set(profile.name, profile)
  console.log(`loaded profession: ${profile.name}`)
}

for (const dir of commands){
    const commandfiles = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'))
    for (const command of commandfiles){
      const file = require(`./commands/${dir}/${command}`)
      client.commands.set(file.name, file)
      console.log(`Loaded: ${file.name}`)
    }
  }

client.on('ready', async () => {
  client.setMaxListeners(50)
    await client.user.setActivity(`OVER ${client.commands.size} COMMANDS || DEVELOPED BY Crawler#4512`, {type: 'STREAMING', url: `https://www.youtube.com/watch?v=DLzxrzFCyOs&ab_channel=AllKindsOfStuff`})
    console.log(`${client.user.tag} is ready!`)
})

client.on('message', message => {
    require('./events/message')(message, client)
})

client.login(process.env.ServerBotToken)