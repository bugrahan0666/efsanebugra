const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
const db = require('quick.db')
exports.run = function(client, message, args) {
  message.delete()
if (!message.member.roles.has(acarayarlar.botcommandid) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
 if(!args[0]) return message.channel.send("Lütfen Silinicek Mesaj Miktarını Yazın!");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(`${args[0]} Adet Mesajı Sildim ✅.`).then(message => message.delete(1000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle' , "sil"],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle <silinicek mesaj sayısı>'
};
exports.acar = {
    acardizini: 'acar-temizle.js',
    acarprefix: acar.prefix,
};