const Discord = require('discord.js');
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = (client, message, args) => {
    if (!message.member.roles.has(acar.bancırolid) && !message.member.hasPermission("ADMINISTRATOR"))  return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
    let kullanici = args[0];
    if (!kullanici) return message.channel.send("Bir kullanıcı ID girmen gerek").then(message => message.delete(3000))
    message.guild.fetchBans()
        .then(bans => {
            if (!bans.has(kullanici)) {
                return message.channel.send(`💳 Bu kullanıcının ban bilgisi yok!`).then(message => message.delete(4000))
            }
        })
    message.guild.fetchBan(kullanici).then(({ user, reason }) => {
        message.channel.send(`💠 ${user.tag} Adlı Kullanıcının Ban Nedeni **${reason}**`).then(message => message.delete(7000))
    })
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bansor'],
    permLevel: 0
};
exports.help = {
    name: 'bansorgu',
    description: 'Ban sorgulama yaparsınız',
    usage: 'bansorgu'
};