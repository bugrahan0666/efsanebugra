const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');

exports.run = async (client, message, args) => {
  if (!message.member.roles.has(acarayarlar.movecommandid) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.morparıltı}  Bilgi` , `${acarayarlar.ünlem} Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());     
  if (!message.member.voiceChannel) {
    return message.channel.send("Ses kanalında olman lazım!");
  }
  let kullanıcı = message.mentions.users.first();
  if (!kullanıcı)
    return message.channel.send("**Kullanıcıyı etiketlemelisin.**");
  let rol = message.mentions.roles.first();
  let member = message.guild.member(kullanıcı);
  if (!member.voiceChannel)
    return message.channel
      .send("Etiketlenen kullanıcı bir ses kanalında değil")
      .then(m => m.delete(5000));
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