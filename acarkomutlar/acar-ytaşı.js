const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
const db = require('quick.db')
exports.run = (client, message, args) => {
  message.delete()
  if(message.channel.id !== acarayarlar.botkomutkanalid ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acarayarlar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
  if (!message.member.roles.has(acarayarlar.botcommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let kanal = args[1];
  let kullanici = message.mentions.members.first();
  if (!kullanici) return message.channel.send("Kullanıcıyı belirtmedin").then(msg => msg.delete(5000))
  if (!kanal) return message.channel.send("Kanal belirtmedin").then(msg => msg.delete(5000))
  

  kullanici.setVoiceChannel(`${kanal}`).then(() =>message.channel.send(`${kullanici} <#${kanal}> adlı kanala taşındı`)).catch(console.error).then(msg => msg.delete(5000));
  db.add(`yetkili.${message.author.id}.cek`, 1);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["üyeyitaşı","fırlat"],
  permLevel: 0
};

exports.help = {
  name: "taşı",
  description: "İstediğiniz kişiniyi bir sesli kanaldan diğerine taşır.",
  usage: "taşı [kullanıcı] [kanal id]"
};


exports.acar = {
    acardizini: 'acar-ytaşı.js',
    acarprefix: acar.prefix,
};