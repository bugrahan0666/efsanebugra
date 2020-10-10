const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => { // && !message.member.hasPermission('ADMINISTRATOR'))
  message.delete()
  if (!message.member.roles.has(acarayarlar.jailhammerid) && !message.member.roles.has(acarayarlar.bancırolid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(message => message.delete(5000))
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!`, `Bir kullanıcı etiketlemelisin!`).setColor("RED")).then(message => message.delete(3000));
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   let reason = args.slice(1).join(" ") || `Sebep girilmemiş.`;
      if(!reason) return message.channel.send(" Kaldırmak için lütfen bir sebep yazınız.").then(message => message.delete(5000));
  db.set(`jail.${kullanıcı.id}` , '0') 
  await(member.addRole(acar.kayıtsızrol));
    member.setNickname(`${acar.tagsiz} ' ${acar.yenibiriisim}`)
    member.removeRole(acarayarlar.cezalırolid);
    member.removeRole(acarayarlar.şüphelirol);
    await(member.addRole(acar.kayıtsızrol));
    const kanal = message.guild.channels.find(c => c.id == acarayarlar.cezaişlemid) 
    const embed1 = new Discord.RichEmbed() 
        .setDescription(`${kullanıcı} adlı üye **${reason}** sebebi ile jailden çıkartıldı.!`)
    .setColor("RED")
    .setFooter(message.author.tag , message.author.avatarURL)
    .setTimestamp()
  return message.channel.send(embed1)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
};

exports.help = {
  name: 'unjail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: 'unjail @etiket Kaldırma Sebepi'
};

exports.acar = {
    acardizini: 'acar-ucj.js',
    acarprefix: acar.prefix,
};