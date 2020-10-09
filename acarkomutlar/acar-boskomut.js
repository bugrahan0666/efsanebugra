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
  .setColor("RANDOM")
  .setTitle(acarayarlar.tag + ' ' + acarayarlar.sunucuadi)
  .setThumbnail(acarayarlar.sunucuresim)
  .setImage(acarayarlar.sunucuembedaltıresim)
  .addField(`🔹 İşlem Bilgileri`, `▫ `) 
  .addField(`🔸 Yetkili Bilgileri`,`▫  `)
  .setDescription("")
  message.channel.send(embed);
let top = message.guild.members.filter(uye => db.get(`yetkili.${uye}.erkek`)).array().sort((uye1, uye2) => Number(db.get(`yetkili.${uye2}.erkek`))-Number(db.get(`yetkili.${uye1}.erkek`))).slice(0, 20).map((uye, index) => (index+1)+"-) "+ uye + " | " + db.get(`yetkili.${uye.id}.erkek`)).join('\n');
message.channel.send(new Discord.RichEmbed().setTitle('Top Özellik Listesi').setTimestamp().setFooter(message.member.displayName+" tarafından istendi!", message.author.avatarURL).setDescription(top).setColor("RANDOM"));
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