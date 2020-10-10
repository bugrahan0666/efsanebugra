const Discord = require('discord.js');
const db = require('quick.db');
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {

  
if (!message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsiniz!`).then(msg => msg.delete(5000));

  let kişi = message.mentions.users.first()
  if (!kişi) return 
  let member = message.guild.member(kişi)

  if(!member.roles.has(acarayarlar.botcommandid)) {
    member.addRole(acarayarlar.botcommandid)
    db.add(`yetki.${kişi.id}.1`, 1);
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${kişi} **adlı üyeyi yetkili yaptı!**`)
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
    return message.channel.send(kayıt).then(msg => msg.delete(5000));
  } else {
    member.removeRole(acarayarlar.botcommandid)
    db.delete(`yetki.${kişi.id}.1`, 1);
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${kişi} **adlı üyenin yetkisini aldı!!**`)
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
    return message.channel.send(kayıt).then(msg => msg.delete(5000));
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetkiver',
};

exports.acar = {
    acardizini: 'acar-yetkiver.js',
    acarprefix: acar.prefix,
};