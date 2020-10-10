const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
message.delete()
    if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let zatenkapalı = await db.fetch(`reklambanayar_${message.guild.id}`)
  if(zatenkapalı == 'kapali') {
    message.channel.send('Reklam Ban sistemi zaten kapalı :wink:').then(msg => msg.delete(5000))
  };
if(zatenkapalı == 'acik') {
        db.delete(`reklamsınır_${message.guild.id}`)
  db.set(`reklambanayar_${message.guild.id}`, 'kapali')
        message.channel.send(`Reklam Ban sistemi kapatıldı :white_check_mark:`).then(msg => msg.delete(5000));
};
  };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['reklam-ban-kapat'],
    permLevel: 0
};

exports.help = {
    name: 'reklambankapat',
    description: 'Reklam ban sistemini kapatır.',
    usage: 'reklambankapat'
};