const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  message.delete()
  const sınır = args.slice(0).join(" ");
  if (!message.member.hasPermission("ADMINISTRATOR"))
   return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  if (!sınır)
    return message.channel.send(
      ":warning: Reklam Ban sınırını belirtmeyi unuttun :wink:"
    ).then(msg => msg.delete(5000));

  db.set(`reklamsınır_${message.guild.id}`, sınır);
  db.set(`reklambanayar_${message.guild.id}`, "acik");
  const dbsınır = await db.get(`reklamsınır_${message.guild.id}`);
  message.channel.send(
    `Reklam Ban sınırı \`${dbsınır}\` olarak ayarlandı :white_check_mark:`
  ).then(msg => msg.delete(5000));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["reklam-ban"],
  permLevel: 0
};

exports.help = {
  name: "reklamban",
  description: "Reklam ban sisteminin sınırını belirler.",
  usage: "reklamban <sayı>"
};