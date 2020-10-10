const Discord = require('discord.js');
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
const db = require('quick.db')
exports.run = async (client, message, args) => {
  message.delete()
  if (!message.member.roles.has(acarayarlar.registercommandid) && !message.member.roles.has(acarayarlar.botcommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let member = message.mentions.members.first()
  if (!member) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bir kullanıcı etiketlemelisin!`).setColor("RED")).then(msg => msg.delete(3000))
 function acarf(isim) {
    return isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase();
}
let isim = args[1]
      if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ İsimi değişicek kullanıcıya bir isim belirlemelisin!!!`).setColor("RED")).then(msg => msg.delete(5000))
let yas = args[2]
      if(!yas) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ İsimi değişicek kullanıcıya bir yaş belirlemelisin!!!!`).setColor("RED")).then(msg => msg.delete(5000))
  await(member.setNickname(`${acarayarlar.tag} ${acarf(isim)} ${yas}`))
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(acarayarlar.tag + ' ' + acarayarlar.sunucuadi)
  .setThumbnail(acarayarlar.sunucuresim)
  .setImage(acarayarlar.sunucuembedaltıresim)
  .addField(`🔹 İşlem Bilgisi`, `▫ Kullanıcının Yeni İsmi : \`${acarf(isim)}\`\n▫ Kullanıcının Yeni Yaşı : \`${yas}\``) 
  .setDescription("\n▫ <@" + member.user.id + "> Adlı kullanıcının isim bilgilerini değiştirdim!")
  db.add(`yetkili.${message.author.id}.isim`, 1);
  message.channel.send(embed).then(msg => msg.delete(12000));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['nickname' , 'nick' , 'isim','i'],
  permLevel: 0
};

exports.help = {
  name: 'isim',
  description: "İsim değiştirmeye ne dersin yakışıklı",
  usage: 'isim <yeni nick>'
};

exports.acar = {
    acardizini: 'acar-isim.js',
    acarprefix: acar.prefix,
};