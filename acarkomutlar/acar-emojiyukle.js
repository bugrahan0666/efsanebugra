const Discord = require('discord.js');
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
exports.run = function(client, message, args) {
    if(message.channel.type == "dm")  return;
  if(message.channel.type !== "text") return;
  if (!message.member.roles.has(acarayarlar.boosterrolid) && !message.member.roles.has(acarayarlar.botcommandid)  && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let guild = message.guild
  let [link, ad] = args.join(" ").split(" ");
  if (!link) return message.channel.send(`Bir link yazmalısın.`)
  if (!ad) return message.channel.send(`Bir isim yazmalısın.`)
  
  guild.createEmoji(link, ad)
    .then(emoji => message.channel.send(`${emoji.name} adında emoji oluşturuldu. (${emoji})`))
    .catch(console.error);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emoji-ekle','emojiekle','emoji-yükle'],
  permLevel: 3
};

exports.help = {
  name: 'emojiyükle',
  description: 'Belirttiğiniz link ve isimde emoji yükler.',
  usage: 'emojiyükle <link> - <isim>'
};
exports.acar = {
    acardizini: 'acar-emojiyukle.js',
    acarprefix: acar.prefix,
};