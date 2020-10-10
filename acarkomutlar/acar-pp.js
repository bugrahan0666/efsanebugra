const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
const db = require('quick.db')
exports.run = (client, message, args) => {
  message.delete()
  let mention = message.mentions.users.first();
  let sender = "";
  let istedin = db.get(`kullanıcı.${message.author.id}.avatar`) || 1;
  let istendin = db.get(`kullanıcı.${mention.id}.iavatar`) || 1;
  if (message.channel.guild.member(message.author).nickname == null) {
    sender = message.author.username;
  } else {
    sender = message.channel.guild.member(message.author).nickname;
  }
  if (mention != null || mention != undefined) {
    var name = mention.username + "'s ";
    if (mention.username.endsWith("s")) {
      name = mention.username + "' ";
    }
    const avatarEmbedOther = new Discord.RichEmbed()
      .setAuthor(mention.username, mention.avatarURL)
      .setColor(0x3)
      .setImage(mention.avatarURL)
      .setFooter(
        `Profil resmin ${istendin} kez istendi şuan isteyen ${message.author.tag}`);
   db.add(`kullanıcı.${message.author.id}.iavatar`, 1);
   let kanal2 = message.guild.channels.get(acarayarlar.botkomutkanalid);
   kanal2.send(avatarEmbedOther);
    message.delete(); return message.reply("<#" + acarayarlar.botkomutkanalid + "> kanalından istediğiniz avatarı görebilirsiniz." ).then(message => message.delete(4000));
    return;
  } else {
    const avatarEmbedYou = new Discord.RichEmbed()
      .setAuthor(sender, message.author.avatarURL)
      .setColor(0x3)
      .setImage(message.author.avatarURL)
      .setFooter(`Profil resmini ${istedin} kez istedin!`);
    let kanal1 = message.guild.channels.get(acarayarlar.botkomutkanalid);
   kanal1.send(avatarEmbedYou);
    db.add(`kullanıcı.${message.author.id}.avatar`, 1);
    message.delete(); return message.reply("<#" + acarayarlar.botkomutkanalid + "> kanalından avatarınızı görebilirsiniz." ).then(message => message.delete(4000));
    return;
  }
  message.channel.sendMessage("Bi hata oldu galiba?");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["avatar", "pp"],
  kategori: "AVATAR KOMUTLARI",
  permLevel: 0
};

exports.help = {
  name: "av",
  description: "Etiketlediğiniz veya kendinizin profil fotosunu gösterir.",
  usage: "av @etiket ya da avatar"
};

exports.acar = {
    acardizini: 'acar-pp.js',
    acarprefix: acar.prefix,
};