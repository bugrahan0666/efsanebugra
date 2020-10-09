const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
const db = require('quick.db')

exports.run = (client, message, args) => {
  
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}`);
if(bilgi.erkek === "1" && bilgi.kiz === "1") {
var erkek = bilgi.erkek || 0 
var kiz = bilgi.kiz || 0 
} else {
var erkek = "0"
var kiz = "0"
}
var erkek = bilgi.erkek || 0 
var kiz = bilgi.kiz || 0


var ses_suresi = Math.round(db.get(`${uye.id}_sesdedur`)/60)+" dakika"
 const embed = new Discord.RichEmbed()
    .addField(`Yetkili Teyit Bilgilerin`,`Toplam ${erkek} erkek teyit ettin!\nToplam ${kiz} kız teyit ettin!\nToplam ${erkek+kiz} kişi teyit ettin!`)
    .addField(`Seste durma süren`,ses_suresi)
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