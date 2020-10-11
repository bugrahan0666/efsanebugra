const Discord = require('discord.js');
const client = new Discord.Client();
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = (client, message, args) => {
  message.delete()
  if(message.channel.id !== acarayarlar.botkomutkanalid ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acarayarlar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
if (!message.member.roles.has(acarayarlar.bancırolid) && !message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let guild = message.guild
  let reason = args.slice(1).join(" ") || `Sebep girilmemiş.`;
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  if (reason.length < 1) return message.reply('Ban kaldırma sebebini yazmalısın.').then(message => message.delete(3000))
  if (!user) return message.reply('Banı kaldırılacak kişinin ID numarasını yazmalısın.').catch(console.error).then(message => message.delete(3000))
  message.guild.unban(user);

  const embed = new Discord.RichEmbed()
  message.channel.send(` __<@${user}>__ adlı kişinin yasağı **${message.author}** yetkili tarafından "${reason}" sebebiyle Kaldırılmıştır.`).then(message => message.delete(10000))

const sChannel = message.guild.channels.find(c=> c.id === acarayarlar.banlogid)
  let modlog = new Discord.RichEmbed() 
  .setColor('RANDOM')
  .setDescription(`<@${user}> adlı Kullanıcının Yasağı kaldırıldı \n Kaldıran Yetkili: **${message.author}** \n Sebebi : **"${reason}"**`)
   sChannel.send(modlog)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasak-kaldir", "yasakkaldir"],
  permLevel: 0
};

exports.help = {
  name: 'unban',
  description: 'İstediğiniz kişinin banını kaldırır.',
  usage: 'unban [kullanıcı] [sebep]'
};
exports.acar = {
    acardizini: 'acar-unban.js',
    acarprefix: acar.prefix,
};