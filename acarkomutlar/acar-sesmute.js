const Discord = require("discord.js");
const ms = require("ms");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
const db = require('quick.db')
exports.run = (client, message, args) => {
  if (!message.member.roles.has(acarayarlar.mutecommandid) && !message.member.hasPermission("ADMINISTRATOR"))    
  return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let kullanici = message.mentions.members.first();
  let log = message.guild.channels.find(c => c.id === acarayarlar.cezaişlemid);
  let süre = args[1]
  let user = message.mentions.users.first();
  if (!user) return  message.channel.send(acarayarlar.ünlem+" Lütfen bir kullanıcıyı etiketleyip ses mutenizi atın. Örn: .sesmute @etiket 5m sebep").then(m => m.delete(2000));
   if (kullanici.user.bot) return message.reply("Bot'u seste susturamazsın!");
   if (kullanici.highestRole.position >= message.member.highestRole.position || !kullanici.bannable) return  message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi} Moderasyon`, `${acarayarlar.ünlem}  Bu kullanıcıyı seste susturmanız için yeterli yetkiye sahip değilsiniz!`).setColor("RANDOM")).then(m => m.delete(3000));
      if(!süre) return message.channel.send(acarayarlar.ünlem+" Lütfen bir kullanıcıyı etiketleyip süreyi yazınız. Örn: .sesmute @etiket 5m sebep").then(m => m.delete(5000));
  let reason = args[2]
      if(!reason) return message.reply('Seste susturabilmem için lütfen geçerli bir sebep giriniz.')
  if (!log) return;
    let sürezaman = args[1]
    
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  
   
  if (!kullanici)
    return message.channel.send("Lütfen bir kullanıcı etiketleyin!");
  kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${sürezaman}sustur`)
    .then(() => 
          message.channel.send(`${kullanici}, **${reason}** sebepi ile \`${sürezaman}\` süre boyunca sesli kanallarda susturuldu!`));
  const acarsesmute = new Discord.RichEmbed()
    .setColor("BLACK")
    .setTimestamp()
    .setDescription(`${kullanici} adlı kullanıcı <@${message.author.id}> adlı yetkili tarafından sesli kanallarda **${reason}** sebepi ile **${sürezaman}** boyunca susturuldu!`)
      .setFooter(message.author.tag , message.author.avatarURL)
  log.send(acarsesmute).catch(console.error);
  db.add(`yetkili.${message.author.id}.sesmute`, 1);
  db.add(`kullanıcı.${kullanici.id}.sesmute`, 1);
  setTimeout(() => {
    kullanici.setMute(false, `Ceza süren doldu knk`);
    message.channel.send(`${kullanici} Susturulman açıldı bir daha yapmazsın umarım!`);
  }, ms(süre));
    let kanal1 = message.guild.channels.get(acarayarlar.cezaişlemid);
  if (!kanal1) return;
  kanal1.send(acarsesmute);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vmute" , "sesmute"],
  permLevel: 0
};

exports.help = {
  name: "sesmute",
  description: "Seslideki Birinin Mikrofonunu Kapatır",
  usage: "sesmute"
};

exports.acar = {
    acardizini: 'acar-sesmute.js',
    acarprefix: acar.prefix,
};