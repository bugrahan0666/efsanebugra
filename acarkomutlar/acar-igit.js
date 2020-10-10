const Discord = require("discord.js");
const filter = m => m.content.includes("discord");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
module.exports.run = async (client, message, args) => {
  message.delete()
  const msg = message;
  const reactionFilter = (reaction, user) => {
    return (
      ["✅"].includes(reaction.emoji.name) &&
      user.id === msg.mentions.users.first().id
    );
  };
  if (!msg.mentions.users.first())
    return message.channel.send("Birini etiketlemelisin.");
  if (message.mentions.users.first() === message.author)
    return message.channel.send("Kendini seçemezsin.");
 const acarembed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}` , `Merhaba ${msg.mentions.users.first().username}, ${msg.author} bulunduğun sesli kanala gelmek istiyor, kabul ediyor musun?\n*Unutma, 30 saniye içerisinde onaylamazsan istek iptal edilecek.*`)
   .setTimestamp();
  msg.mentions.users.first().send(acarembed)
    .then(async asd => {
      await asd.react("✅");
      asd
        .awaitReactions(reactionFilter, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(async c => {
          if (!msg.guild.member(msg.mentions.users.first()).voiceChannel) {
            msg.author.send(`Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.`);
            msg.mentions.users
              .first()
              .send(`Herhangi bir odada olmadığın için onay başarısız.`);
            return;
          }
          await msg.member.setVoiceChannel(
            msg.guild.member(msg.mentions.users.first()).voiceChannelID
          );
          asd.delete();
        })
        .catch(async e => {
          await asd.delete();
          msg.author.send(``).then(hehe => {
            hehe.delete(120000);
          });
        });
    });
 const acarxembed = new Discord.RichEmbed()
   .setColor("RANDOM")
   .addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi}` , `Merhaba ${msg.mentions.users.first().username}, ${msg.author} bulunduğun sesli kanala gelmek istiyor, kabul ediyor musun?\n*Unutma, 30 saniye içerisinde onaylamazsan istek iptal edilecek.*`)
   .setTimestamp();
  msg.channel.send(acarxembed)
    .then(async asd => {
      await asd.react("✅");
      asd
        .awaitReactions(reactionFilter, {
          max: 1,
          time: 30000,
          errors: ["time"]
        })
        .then(async c => {
          if (!msg.guild.member(msg.mentions.users.first()).voiceChannel) {
            msg.channel.send(`Kişi isteğini onayladı fakat herhangi bir odada yok, bir odaya girip tekrar istek gönder.`);
            msg.mentions.users.first().send(`Herhangi bir odada olmadığın için onay başarısız.`);
            return;
          }
          await msg.member.setVoiceChannel(msg.guild.member(msg.mentions.users.first()).voiceChannelID);
          asd.delete();
        })
        .catch(async e => {
          await asd.delete();
          msg.author.send(``).then(hehe => {
            hehe.delete(120000);
          });
        });
    });
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  category: "admin",
  permLevel: 0
};
module.exports.help = {
  name: "git",
  description: "",
  usage: ""
};

exports.acar = {
    acardizini: 'acar-igit.js',
    acarprefix: acar.prefix,
};