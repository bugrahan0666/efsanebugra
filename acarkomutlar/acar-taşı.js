const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
const db = require('quick.db')
exports.run = async (client, message, args) => {
  message.delete()
  if(message.channel.id !== acarayarlar.botkomutkanalid ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acarayarlar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
  if (!message.member.roles.has(acarayarlar.botcommandid) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(message => message.delete(4000));
  if (!message.member.voiceChannel) {
    return message.channel.send("Ses kanalında olman lazım!").then(message => message.delete(4000));
  }
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("**Kullanıcıyı etiketlemelisin.**").then(message => message.delete(4000));
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  if (!member.voiceChannel)
    return message.channel
      .send("Etiketlenen kullanıcı bir ses kanalında değil").then(message => message.delete(4000));
  const voiceChannel = message.member.voiceChannel.id;
  if (!voiceChannel) return;
  member.setVoiceChannel(voiceChannel);
  const voiceChannel1 = message.member.voiceChannel.name;
  let embed = new Discord.RichEmbed()
    .setColor("#000000")
    .setDescription(
      message.author +
        " **Tarafından** " +
        kullanıcı +
        " **Kullanıcısı** `" +
        voiceChannel1 +
        "`** Sesli Kanalına Çekildi.**"
    )
    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL}`)
    .setTimestamp();
  db.add(`yetkili.${message.author.id}.cek`, 1);
  message.channel.send(embed).then(m => m.delete(10000));
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["move"],
  kategori: "KULLANICI KOMUTLARI",
  permLevel: 0
};
exports.help = {
  name: "çek",
  description: "Çekildi",
  usage: "çek"
};

exports.acar = {
    acardizini: 'acar-taşı.js',
    acarprefix: acar.prefix,
};