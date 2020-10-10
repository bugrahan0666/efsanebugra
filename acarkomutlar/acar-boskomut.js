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
let sesmute = db.get(`yetkili.${uye.id}.sesmute`) || 0;
let mute = db.get(`yetkili.${uye.id}.mute`) || 0;
let isim = db.get(`yetkili.${uye.id}.isim`) || 0;
let bkes =  db.get(`yetkili.${uye.id}.bkes`) || 0;
let taşı = db.get(`yetkili.${uye.id}.cek`) || 0;
let forceban = db.get(`yetkili.${uye.id}.forceban`) || 0;
 
let kban = db.get(`kullanıcı.${uye.id}.ban`) || 0;
let kkick = db.get(`kullanıcı.${uye.id}.kick`) || 0;
let kjail =  db.get(`kullanıcı.${uye.id}.jail`) || 0;
let kmute = db.get(`kullanıcı.${uye.id}.mute`) || 0;
let ksesmute = db.get(`kullanıcı.${uye.id}.sesmute`) || 0;
  
var input = db.get(`${uye.id}_sesdedur`)
var toplamislem = erkek+kiz+ban+kick+jail+sesmute+mute+isim+bkes+taşı
function timeConvert(n) {
var num = n;
var hours = (num / 60);
var rhours = Math.floor(hours);
var minutes = (hours - rhours) * 60;
var rminutes = Math.round(minutes);
return "▫ Yetkili **" + rhours + "** Saat **" + rminutes + "** Dakika seste durmuş.";
}
var ses_suresi = Math.round(db.get(`${uye.id}_sesdedur`)/60)
 const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${uye.tag} işlem bilgileri`, uye.avatarURL)
  .setThumbnail(acarayarlar.sunucuresim)
  .setImage(acarayarlar.sunucuembedaltıresim)
  .addField(`🔹 Kayıt İşlemleri`, `▫ Şuana kadar toplam \`${kiz+erkek}\` kişiyi kayıt etmiş.\n▫ Şuana kadar \`${erkek}\` erkek kayıt etmiş.\n▫ Şuana kadar \`${kiz}\` kadın kayıt etmiş.\n ▫ Şuana kadar toplam \`${isim}\` isim ve yaş değiştirmiş.`) 
  .addField(`🔸 Mod İşlemleri`,`▫ Şuana kadar \`${forceban}\` kişiyi sunucudan forcebanlamış.\n▫ Şuana kadar \`${ban}\` kişiyi sunucudan yasaklamış.\n▫ Şuana kadar \`${kick}\` kişiyi sunucudan atmış.\n▫ Şuana kadar \`${jail}\` kişiyi jaile atmış.\n ▫ Şuana kadar \`${mute}\` chat'de susturmuş.\n ▫ Şuana kadar \`${sesmute}\` ses de susturmuş.\n▫ Şuana kadar \`${taşı}\` kişiyi taşımış çekmiş.\n▫ Şuana kadar \`${bkes}\` kişinin bağlantısını kesmiş.\n\n`)
  .addField(`🔹 Sicil bilgileri`, `▫ Şuana kadar ${kban} yasaklanmış.`) 
  .addField(`🔊 Ses bilgileri`, `${timeConvert(ses_suresi)}`)
  .setDescription(`▫ `)
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