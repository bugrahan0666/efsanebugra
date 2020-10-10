const Discord = require('discord.js')
const moment = require('moment')
const ms = require('ms')
require('moment-duration-format')
exports.run = async (client, message, args) => {

var Ölçüm = await message.channel.send('Ağ gecikmesi hesaplanıyor!')
var Sonuç = message.channel.send('Sistemsel gecikme hesaplanıyor!!')
function myFunc2(arg) {
  Sonuç.edit(new Discord.RichEmbed() 
}
function myFunc(arg) {
  Sonuç.edit(new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`
💻 Sistem gecikmesi; \`${Math.round((Sonuç.createdTimestamp - Ölçüm.createdTimestamp - client.ping))} MS\`
📡 Ağ gecikmesi; \`${Math.round(client.ping)} MS\``))
Ölçüm.delete()
}

setTimeout(myFunc, 5000, 'acar');
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ping'],
  permLevel: 0
}

exports.help = {
  name: 'Ping',
  description: '',
  usage: 'ping'
}