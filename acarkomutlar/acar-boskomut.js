const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
const db = require('quick.db')

exports.run = (client, message, args) => {
  
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}`);
var erkek = bilgi.erkek || 0 
var kiz = bilgi.kadın || 0 
var ban = bilgi.ban || 0
var jail = bilgi.jail || 0
var mute = bilgi.mute || 0


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
  name: "ye",
  description: "ACAR Temiz v11 Altyapı",
  usage: ""
};