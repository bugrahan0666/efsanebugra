const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const code = message.mentions.channels.first() || message.channel
const acar = args[0]
message.delete()
 if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
if (!acar) return message.reply(`Reklam engel sistemini açmak için reklamengel aç #kanal veya reklamengel aç yazmalsın!`).then(msg => msg.delete(5000))
 
  if (acar == 'aç') { 
  let açıkkapalı = await db.fetch(`reklamEngelacar_${code.id}`)
  if(açıkkapalı) return message.reply(`Zaten reklam engel bu kanalda/belirttiğiniz kanalda aktif!`).then(msg => msg.delete(5000))
    
db.set(`reklamEngelacar_${code.id}`,'açık')
message.reply(`Reklam engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda aktif edildi!`).then(msg => msg.delete(5000))
  }
  
  if (acar == 'kapat') {
  let açıkkapalı = await db.fetch(`reklamEngelacar_${code.id}`)
  if(!açıkkapalı) return message.reply(`Zaten Reklam engel bu kanalda/belirttiğiniz kanalda deaktif!`).then(msg => msg.delete(5000))
    
db.delete(`reklamEngelacar_${code.id}`)
message.reply(`Reklam engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda deaktif edildi!`).then(msg => msg.delete(5000))
}
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'reklamengel',
  description: 'reklam engellemeyi açar',
  usage: 'CodeShare'
}