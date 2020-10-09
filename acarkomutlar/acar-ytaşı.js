const Discord = require("discord.js");
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');
exports.run = (client, message, args) => {
  if (!message.member.roles.has(acarayarlar.movecommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı} Bilgi` , `${acarayarlar.ünlem} Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let kanal = args[1];
  let kullanici = message.mentions.members.first();
  if (!kullanici) return message.channel.send("Kullanıcıyı belirtmedin");
  if (!kanal) return message.channel.send("Kanal belirtmedin");
  

  kullanici.setVoiceChannel(`${kanal}`).then(() =>message.channel.send(`${kullanici} <#${kanal}> adlı kanala taşındı`)).catch(console.error);
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