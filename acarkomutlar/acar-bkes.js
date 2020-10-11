const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
const db = require('quick.db');
exports.run = async function(client, message, args) {
message.delete()
    if(message.channel.id !== acarayarlar.botkomutkanalid ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acarayarlar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
  if (!message.member.roles.has(acarayarlar.jailhammerid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  const user = message.mentions.members.first()
if (!user) return message.reply("**Bir kullanıcı etiketlemelisin.**").then(msg => msg.delete(5000))

if (!user.voiceChannel || user.voiceChannel.id === null || user.voiceChannel.id === NaN || user.voiceChannel.id === undefined) return message.reply(`**Etiketlediğin kullanıcı zaten, herhangi bir ses kanalında bulunmuyor.**`).then(msg => msg.delete(5000))

user.setVoiceChannel(null).then(() => {
db.add(`yetkili.${message.author.id}.bkes`, 1);
message.channel.send(`**${message.author} başarıyla ${user} kullanıcısının bağlantısı kesildi.**`).then(msg => msg.delete(5000))
})
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["bağlantı-kes","bk","bkes"],
    permLevel: 0
};
exports.help = {
    name: 'bağlantı-kes',
    description: 'Kullanıcının bağlantısını keser.',
    usage: 'bağlantı-kes @Üye #Kanal'
};

exports.acar = {
    acardizini: 'acar-bkes.js',
    acarprefix: acar.prefix,
};