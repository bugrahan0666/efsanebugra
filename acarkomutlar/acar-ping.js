const Discord = require('discord.js')
const moment = require('moment')
const ms = require('ms')
require('moment-duration-format')
exports.run = async (client, message, args) => {

var Ölçüm = await message.channel.send('⏳ Ağ gecikmesi hesaplanıyor...')
var Sonuç = await message.channel.send('⏳ Sistemsel gecikme hesaplanıyor...')
function myFunc2(arg) {
   Sonuç.edit("⌛ Ağ gecikmesi hesaplanıyor..")
Ölçüm.edit("⌛ Ağ gecikmesi hesaplanıyor..")
}
function myFunc3(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor.")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor.")
}
function myFunc4(arg) {
   Sonuç.edit("⌛ Ağ gecikmesi hesaplanıyor..")
Ölçüm.edit("⌛ Ağ gecikmesi hesaplanıyor..")
}
function myFunc5(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor...")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor...")
}
function myFunc10(arg) {
   Sonuç.edit("📡 Sisteme bağlandı!")
Ölçüm.edit("⌛ Seni biraz daha bekleticem!")
}  
function myFunc(arg) {
  Sonuç.edit(new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`
💻 Sistem gecikmesi; \`${Math.round((Sonuç.createdTimestamp - Ölçüm.createdTimestamp - client.ping))} MS\`
📡 Ağ gecikmesi; \`${Math.round(client.ping)} MS\``))
Ölçüm.delete()
}
setTimeout(myFunc2, 2000, 'acar');
setTimeout(myFunc3, 2000, 'acar');
setTimeout(myFunc4, 2000, 'acar');
setTimeout(myFunc5, 2000, 'acar');
setTimeout(myFunc10, 5000, 'acar');
setTimeout(myFunc, 15000, 'acar');

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