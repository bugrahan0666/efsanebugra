const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
module.exports.run = async (client, message, args) => {
  const voiceChannels = message.guild.channels.filter(c => c.type === "voice");
  var toplamEtiketliUyeler = message.guild.members.filter(member => member.user.username.includes(acarayarlar.tag)).size;
  var toplamEtiketliUyeler1 = message.guild.members.filter(member => member.user.username.includes(acarayarlar.ekiptag)).size;
  let count = 0
  let boostcuk = acarayarlar.boosterrolid;
  let erkek = acarayarlar.erkekrol2
  let kadın = acarayarlar.kadınrol2
  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  let boost = message.guild.members.filter(r => r.roles.has(boostcuk)).size;
  let erkekcik = message.guild.members.filter(r => r.roles.has(erkek)).size;
  let kadıncık = message.guild.members.filter(r => r.roles.has(kadın)).size;
  const emoji3 = client.emojis.find(emoji => emoji.name === acarayarlar.sayemojiismi);
  const acarembed = new Discord.RichEmbed()
    .setColor("BLACK")
    .setDescription(`**${acar.tag} ${acar.sunucuadi} - Sunucu İstatistikler**\n
      ${emoji3} Sunucumuz da **${
        message.guild.memberCount
      }** kişi bulunmaktadır.\n ${emoji3} Sunucumuz da **${
        message.guild.members.filter(m => m.presence.status !== "offline").size
      }** aktif kişi bulunmaktadır.\n ${emoji3} Ses kanallarında **${count}** Kişi bulunmaktadır.\n ${emoji3} Sunucumuzu boostlayan **${boost}** kişi bulunmaktadır.\n${emoji3} Sunucumuz da **${erkekcik}** erkek üye bulunmaktadır.\n${emoji3} Sunucumuz da **${kadıncık}** kadın üye bulunmaktadır.\n\n${emoji3} Sunucumuz da taglı üyede **${toplamEtiketliUyeler}** kişi bulunmaktadır.`
    )
    .setThumbnail(acarayarlar.saygif)
    .setTimestamp()
    .setFooter(message.author.tag, message.author.avatarURL);

  message.delete(); return message.channel.send(acarembed).then(msg => msg.delete(30000));
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "say",
  description: "kullanıcıyı susturur.",
  usage: "say"
};

exports.acar = {
    acardizini: 'acar-say.js',
    acarprefix: acar.prefix,
};