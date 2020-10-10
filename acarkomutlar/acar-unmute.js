const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const client = new Discord.Client();
const muteayarlari = require('../acar/rol.json')
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');

exports.run = async (receivedMessage, msg, args) => {
  msg.delete()
      if (!msg.member.roles.has(acarayarlar.mutecommandid) && !msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
var mod = msg.author
let reason = args.slice(1).join(" ") || `Sebep Girilmemiş.`;
      if(!reason) return msg.reply('Mute kaldırabilmem için bir sebep girmelisin.').then(msg => msg.delete(5000))
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if (!user) return msg.reply('Bir kullanıcı etiketlemelisin.').then(msg => msg.delete(5000))
  let mute = msg.guild.roles.find(r => r.name === muteayarlari.muteroladi); //verilecek chat mute rolü ismi
          
  let mutetime = args[1];

  const muteembed = new Discord.RichEmbed()
  .setColor('RANDOM')    
  .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}` , ` ${mod} adlı yetkili **<@${user.id}>** adlı kullanıcıyı **${reason}** sebebi ile sustururmasını kaldırıldı.`).then(msg => msg.delete(5000))
  .setFooter(msg.author.tag , msg.author.avatarURL)
    msg.channel.send(muteembed);
    db.set(`mute.${user.id}`,'0')
  setTimeout(function(){
    db.set(`mute.${user.id}`,'0') 
    user.removeRole(mute.id);
    
  }, ms(mutetime));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unmute",'uncmute'],
  permLevel: 0,
  kategori:'yetkili',
};

exports.help = {
  name: "unchatmute",
  description: "Belirttiğiniz kullanıcıyı belirttiğiniz zamana göre susturmasını kaldırır.",
  usage: ""
};

exports.acar = {
    acardizini: 'acar-unmute.js',
    acarprefix: acar.prefix,
};