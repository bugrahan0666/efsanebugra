const Discord = require('discord.js');
const db = require("quick.db")
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {
const emoji3 = client.emojis.find(emoji => emoji.name === acarayarlar.tagemojiadi);
 if (!message.member.roles.has(acarayarlar.registercommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  if (member.roles.has(acarayarlar.erkekrol1)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Hata` , `Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  if (member.roles.has(acarayarlar.erkekrol2)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Hata` , `Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  if (member.roles.has(acarayarlar.kadınrol1)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Hata` , `Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
  if (member.roles.has(acarayarlar.kadınrol2)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Hata` , `Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
function acarf(isim) {
    return isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase();
}
let isim = args[1]
      if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Kayıtı tamamlaya bilmem için lütfen bir isim girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())

let yas = args[2]
      if(!yas) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Bilgi` , `Kayıtı bitirebilmem için lütfen bir yaş girmelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
await 
  member.setNickname(`${acarayarlar.tag} ' ${acarf(isim)} | ${yas}`)
  member.removeRole(acarayarlar.erkekrol1); // erkek 1
  member.removeRole(acarayarlar.erkekrol2); // erkek 2
  
  member.addRole(acarayarlar.kadınrol1); // kadın 1
  member.addRole(acarayarlar.kadınrol2); // kadın 2

  member.removeRole(acarayarlar.kayıtsızrol) // kayıtsız 1

db.add(`yetkili.${message.author.id}.kadın`, 1);
      const kanal = message.guild.channels.find(c => c.id == acarayarlar.chatid)
    const kanal1 = message.guild.channels.find(c => c.id == acarayarlar.kayıtlogid)
    const embed1 = new Discord.RichEmbed() 
    .addField(`${acarayarlar.tag} Heyy! ${acarayarlar.sunucuadi} Ailesi Yeni biri daha`, `${member.user}, Ailemize hoşgeldin seni ailemiz de görmekten büyük mutluluk duyarız.`)
    .setColor("PURPLE")
    .setThumbnail(acarayarlar.saygif)
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .setThumbnail(acarayarlar.saygif)
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}`, `${member.user}, adlı üyeyi **Kadın Üye** olarak kayıt edip <@&${acarayarlar.kadınrol1}> ve <@&${acarayarlar.kadınrol2}> rollerini verdim.`)                                                                             
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  return kanal1.send(embed).then(kanal.send(embed1).then(msg => msg.delete(5000)));

 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k", "kız"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "kadın",
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "kayıt isim"
};

exports.acar = {
    acardizini: 'acar-kadın.js',
    acarprefix: acar.prefix,
};