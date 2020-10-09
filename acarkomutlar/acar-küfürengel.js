const Discord = require('discord.js');
const db = require('quick.db');
exports.run = async (client, message, args) => {
const code = message.mentions.channels.first() || message.channel
const acar = args[0]
if (!acar) return message.reply(`küfür engel sistemini açmak için küfürengel aç #kanal veya küfürengel aç yazmalsın!`)
 
  if (acar == 'aç') { 
  let açıkkapalı = await db.fetch(`küfürEngelacar_${code.id}`)
  if(açıkkapalı) return message.reply(`Zaten küfür engel bu kanalda/belirttiğiniz kanalda aktif!`)
    
db.set(`küfürEngelacar_${code.id}`,'açık')
message.reply(`Küfür engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda aktif edildi!`)
  }
  
  if (acar == 'kapat') {
  let açıkkapalı = await db.fetch(`küfürEngelacar_${code.id}`)
  if(!açıkkapalı) return message.reply(`Zaten küfür engel bu kanalda/belirttiğiniz kanalda deaktif!`)
    
db.delete(`küfürEngelacar_${code.id}`)
message.reply(`Küfür engel sistemi başarıyla bu kanalda/belirttiğiniz kanalda deaktif edildi!`)
}
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'küfürengel',
  description: 'küfür engellemeyi açar',
  usage: 'CodeShare'
}