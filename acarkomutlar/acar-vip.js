const Discord = require('discord.js');
const db = require('quick.db');
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');
exports.run = async (client, message, args) => {


    const emoji3 = client.emojis.find(emoji => emoji.name === acarayarlar.vipemojiadi);
if (!message.member.roles.has(acarayarlar.botcommandid) && !message.member.hasPermission('ADMINISTRATOR'))
    return message.channel.send(`Bu komutu kullanabilmek için gerekli yetkiye sahip değilsiniz!`).then(msg => msg.delete(5000));

  let kişi = message.mentions.users.first()
  if (!kişi) return message.reply("Bir kişi etiketlemilisin!").then(message => message.delete(3000))
  let member = message.guild.member(kişi)

  if(!member.roles.has(acarayarlar.viprol)) {
    member.addRole(acarayarlar.viprol)
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${emoji3} ${kişi} **adlı üyeye** <@&${acarayarlar.viprol}> **rolü verildi!**`)
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
    return message.channel.send(kayıt).then(msg => msg.delete(5000));
  } else {
    member.removeRole(acarayarlar.viprol)
    let kayıt = new Discord.RichEmbed()
    .setColor("BLACK")
    .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${emoji3} ${kişi} **adlı üyeden** <@&${acarayarlar.viprol}> **rolü alındı!**`)
    .setFooter(message.author.tag ,message.author.avatarURL)
    .setTimestamp()
    return message.channel.send(kayıt).then(msg => msg.delete(5000));
    
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['vip' , 'gold' , 'special'],
  permLevel: 0
};

exports.help = {
  name: 'gold',
};

exports.acar = {
    acardizini: 'acar-vip.js',
    acarprefix: acar.prefix,
};