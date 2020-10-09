const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const code = message.mentions.channels.first() || message.channel
const acar = args[0]
if (!acar) return message.reply(`Reklam engel sistemini açmak için reklamengel aç #kanal veya reklamengel aç yazmalsın!`)
 
  if (acar == 'aç') { 
  let açıkkapalı = await db.fetch(`reklamEngelacar_${code.id}`)
  if(açıkkapalı) return message.reply(`Zaten reklam engel bu kanalda/belirttiğiniz kanalda aktif!`)
    
db.set(`reklamEngelacar_${code.id}`,'açık')
message.reply(`Reklam engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda aktif edildi!`)
  }
  
  if (acar == 'kapat') {
  let açıkkapalı = await db.fetch(`reklamEngelacar_${code.id}`)
  if(!açıkkapalı) return message.reply(`Zaten Reklam engel bu kanalda/belirttiğiniz kanalda deaktif!`)
    
db.delete(`reklamEngelacar_${code.id}`)
message.reply(`Reklam engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda deaktif edildi!`)
}
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'reklam-engel',
  description: 'reklam engellemeyi açar',
  usage: 'CodeShare'
}