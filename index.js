const Discord = require('discord.js')
const env = require('dotenv')
const client = new Discord.Client()
client.commands = new Discord.Collection()
const fs = require('fs')
const commands = fs.readdirSync('./commands')
env.config()

for (const dir of commands){
    const commandfiles = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'))
    for (const command of commandfiles){
      const file = require(`./commands/${dir}/${command}`)
      client.commands.set(file.name, file)
      console.log(`Loaded: ${file.name}`)
    }
  }

client.on('ready', async () => {
    await client.user.setActivity(`OVER ${client.commands.size} || DEVELOPED BY Crawler#4512`, {type: 'WATCHING'})
    console.log(`${client.user.tag} is ready!`)
})

client.on('message', message => {
    require('./events/message')(message, client)
})

client.on('guildMemberAdd', member => {
  require('./events/muteOnjoin')(member, client)
})

client.login(process.env.ServerBotToken)