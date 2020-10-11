const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
exports.run = (client, message, args) => {
    if(message.channel.id !== acarayarlar.botkomutkanalid ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acarayarlar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
  let emojiname = args[0];
  const emoji = message.guild.emojis.find("name", `${emojiname}`);
  if (!emojiname) return message.channel.send("Emoji ismi belirtmediniz").then(msg => msg.delete(3000))
  const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .setDescription(
      `
**Emoji** : <a:${emojiname}:${emoji.id}>
**Emoji İsim**: ${emojiname}
**Emoji İd'si**: ${emoji.id}
**Emoji Kodu** : \`<a:${emojiname}:${emoji.id}>\` 
`
    )
    .setTimestamp();
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "emoji",
  description: "İsmini yazdığınız emoji hakkında bilgi verir",
  usage: "emojibilgi"
};

exports.acar = {
    acardizini: 'acar-emoji.js',
    acarprefix: acar.prefix,
};