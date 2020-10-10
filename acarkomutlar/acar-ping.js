const Discord = require('discord.js')
const moment = require('moment')
require('moment-duration-format')
exports.run = async (client, message, args) => {

var Ölçüm = await message.channel.send('Ping Hesaplanıyor...')
var Sonuç = await message.channel.send('Hesaplandı!')
await Sonuç.edit(new Discord.RichEmbed()
.setColor('BLUE')
.setAuthor(client.user.username,client.user.avatarURL)
.setDescription(`
**Tepki Gecikmesi; \`${Math.round((Sonuç.createdTimestamp - Ölçüm.createdTimestamp - client.ping))} MS\`**
**Client Gecikmesi; \`${Math.round(client.ping)} MS\`**`)
.setFooter(message.author.username,message.author.avatarURL))
await Ölçüm.delete()
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ping'],
  permLevel: 0
}

exports.help = {
  name: 'Ping',
  description: 'Pingi Atar',
  usage: 'ping'
}