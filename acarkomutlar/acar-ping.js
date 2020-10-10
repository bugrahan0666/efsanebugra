const Discord = require('discord.js')
const moment = require('moment')
const ms = require('ms')
require('moment-duration-format')
exports.run = async (client, message, args) => {

var Ölçüm = await message.channel.send('⏳ Ağ gecikmesi hesaplanıyor...')
var Sonuç = await message.channel.send('⏳ Sistemsel gecikme hesaplanıyor...')
function myFunc2(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor..")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor..")
}
function myFunc3(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor.")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor.")
}
function myFunc4(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor..")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor..")
}
function myFunc5(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor...")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor...")
}
function myFunc6(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor..")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor..")
}
function myFunc7(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor.")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor.")
}
function myFunc8(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor..")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor..")
}
function myFunc9(arg) {
   Sonuç.edit("⏳ Ağ gecikmesi hesaplanıyor...")
Ölçüm.edit("⏳ Ağ gecikmesi hesaplanıyor...")
}
function myFunc10(arg) {
   Sonuç.edit("📡 Sisteme bağlandı!")
Ölçüm.edit("")
}  
function myFunc(arg) {
  Sonuç.edit(new Discord.RichEmbed()
.setColor('BLUE')
.setDescription(`
💻 Sistem gecikmesi; \`${Math.round((Sonuç.createdTimestamp - Ölçüm.createdTimestamp - client.ping))} MS\`
📡 Ağ gecikmesi; \`${Math.round(client.ping)} MS\``))
Ölçüm.delete()
}
setTimeout(myFunc2, 1000, 'acar');
setTimeout(myFunc3, 1000, 'acar');
setTimeout(myFunc4, 1000, 'acar');
setTimeout(myFunc5, 1000, 'acar');
setTimeout(myFunc6, 1000, 'acar');
setTimeout(myFunc7, 1000, 'acar');
setTimeout(myFunc8, 1000, 'acar');
setTimeout(myFunc9, 1000, 'acar');
setTimeout(myFunc, 12000, 'acar');

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