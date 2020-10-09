const Discord = require('discord.js');
const bot = new Discord.Client();
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');


module.exports.run = async (bot, message, args) => {
    if(message.author.id !== acar.sahip)  return message.channel.send("Bu Komutu Sadece Sahibim Kullanabilir")

    message.channel.sendMessage(`Yeniden Başlatma Onaylandı ✅ `)
      message.delete(60).then(msg => {

    console.log(`Bot yeniden başlatılıyor`);

    process.exit(0);
  })


}
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: 'reboot',
  description: 'ACAR Code Center',
  usage: 'reboot'
};