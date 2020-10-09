const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
const db = require('quick.db')

exports.run = (client, message, args) => {
  
let uye = message.mentions.users.first() || message.author
let bilgi = db.get(`yetkili.${uye.id}`);
let erkek = db.get(`yetkili.${uye.id}.erkek`) || 0;
let kiz = db.get(`yetkili.${uye.id}.kadın`) || 0;
let ban = db.get(`yetkili.${uye.id}.ban`) || 0;
let kick = db.get(`yetkili.${uye.id}.kick`) || 0;
let jail = db.get(`yetkili.${uye.id}.jail`) || 0;
let mute = db.get(`yetkili.${uye.id}.mute`) || 0;
let isim = db.get(`yetkili.${uye.id}.isim`) || 0;
var ses_suresi = Math.round(db.get(`${uye.id}_sesdedur`)/60)+" dakika"
 const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Yetkili Bilgileri`, client.user.avatarURL)
  .setThumbnail(acarayarlar.sunucuresim)
  .setImage(acarayarlar.sunucuembedaltıresim)
  .addField(`🔹 Kayıt İşlemleri`, `▫ Şuana kadar toplam \`${kiz+erkek}\` kişiyi kayıt etmiş.\n▫ Şuana kadar \`${erkek}\` erkek kayıt etmiş.\n▫ Şuana kadar \`${kiz}\` kadın kayıt etmiş.\n ▫ Şuana kadar toplam \`${isim}\` isim ve yaş değiştirmiş.`) 
  .addField(`🔸 Mod İşlemleri`,`▫ Şuana kadar toplam \`${ban}\` kişiyi sunucudan men etmiş.\n▫ Şuana kadar toplam \`${kick}\` kişiyi sunucudan atmış.\n▫ Şuana kadar toplam \`${jail}\` kişiyi jail'e atmış.\n ▫ Şuana kadar toplam \`${mute}\` chat'de susturmuş.\n ▫ Şuana kadar toplam \`${sesmute}\` ses de susturmuş.`)
  .setDescription("")
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yb",
  description: "ACAR Temiz v11 Altyapı",
  usage: ""
};