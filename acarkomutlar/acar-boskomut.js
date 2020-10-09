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
let jail = db.get(`yetkili.${uye.id}.jail`) || 0;
let mute = db.get(`yetkili.${uye.id}.mute`) || 0;

var ses_suresi = Math.round(db.get(`${uye.id}_sesdedur`)/60)+" dakika"
 const embed = new Discord.RichEmbed()
    .addField(`Yetkili Teyit Bilgilerin`,`Toplam ${erkek} erkek teyit ettin!\nToplam ${kiz} kız teyit ettin!\nToplam ${erkek+kiz} kişi teyit ettin!`)
    .addField(`Seste durma süren`,ses_suresi)
    .addField("Mod Komut Kullanım Bilgilerin", `Toplam ${ban} kişiyi sunucudan yasakladın!\nToplam ${jail} kişiyi cezalıya attın!\nToplam ${mute} kişiyi susturdun!`)
    .setFooter(`ACAR Code Tester`)
    .setThumbnail(client.user.avatarURL);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "yetkilibilgi",
  description: "ACAR Temiz v11 Altyapı",
  usage: ""
};