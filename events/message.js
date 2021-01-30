const prefixschema = require('../schemas/prefix-schema')
const mongo = require('../mongo');

let prefix;

module.exports = async (message, client) => {
    if (!message.guild) return;
    if (message.webhookID) return;
    await message.guild.members.fetch()
    if (!message.member.hasPermission(["ADMINISTRATOR"])){
        const guildinvites = await message.guild.fetchInvites()
        const codeinvites = guildinvites.map(f => f.code)
        codeinvites.push(message.guild.vanityURLCode)
        if (message.content.includes('discord.gg/')){
            const code = message.content.split('discord.gg/')[1]
            const checkinv = codeinvites.includes(code)
            if (checkinv == false){
            message.delete()
            message.channel.send('ads not allowed')
            }
        }
    }
  
  await mongo().then(async mongoose => {
    
      let newPrefix = await prefixschema.findOne({Guild: message.guild.id});
      newPrefix ? (prefix = newPrefix.Prefix) : (prefix = "!");
    
  })

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  const filter = m => m.author.id == message.author.id
  
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) || client.commands.find(c => c.aliases && c.aliases.includes(cmd));

  if (!command) return;

  if (!message.member.hasPermission(command.permissions)) {
      return message.channel.send(`You don't have ${command.permissions.join(", ")} permissions`)
  }

  command.run(client, message, args, prefix)
}