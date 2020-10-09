const Discord = require('discord.js');
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {
  if (!message.member.roles.has(acarayarlar.botcommandid, acarayarlar.registercommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let member = message.mentions.members.first()
  if (!member) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
 function acarf(isim) {
    return isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase();
}
  let isim = args[1]
      if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Bir isim girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  let yas = args[2]
      if(!yas) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Kayıtı bitirebilmem için lütfen bir yaş girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  await member.setNickname(`${acarayarlar.tag} ' ${acarf(isim)} | ${yas}`)
  const embed = new Discord.RichEmbed()
  .setColor('BLACK')
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${member.user} **adlı üyenin adını** \`${acarayarlar.tag} ' ${acarf(isim)} | ${yas}\` **olarak değiştirdim** `)
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  message.channel.send(embed).then(msg => msg.delete(5000));
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