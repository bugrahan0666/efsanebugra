const Discord = require("discord.js");
const ms = require("ms");
const db = require("quick.db")
const client = new Discord.Client();
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
const muteayarlari = require('../acar/rol.json')

exports.run = async (receivedMessage, msg,  args) => {
msg.delete()
if (!msg.member.roles.has(acarayarlar.mutecommandid) && !msg.member.hasPermission("ADMINISTRATOR")) return msg.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
var mod = msg.author
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
let reason = args[2] || `Sebep girilmemiş.`;
if (!user) return msg.reply('Bir kullanıcı etiketlemelisin.').then(msg => msg.delete(5000));
if (user.user.bot) return msg.reply("Bot'a mute atamazsınız!").then(msg => msg.delete(5000));
if (user.highestRole.position >= msg.member.highestRole.position || !user.bannable) return  msg.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.tag} ${acarayarlar.sunucuadi} Moderasyon`, `${acarayarlar.ünlem}  Bu kullanıcıyı susturmanız için yeterli yetkiye sahip değilsiniz!`).setColor("RANDOM"));
      if(!reason) return msg.reply('Mute atabilmem için bir sebep girmelisin.').then(msg => msg.delete(5000));

  let mute = msg.guild.roles.find(r => r.name === muteayarlari.muteroladi); //verilecek chat mute rolü ismi
          
  let mutetime = args[1];
  if(!mutetime) return msg.reply('Lütfen susturabilmem için bir süre belirleyiniz.').then(msg => msg.delete(5000));
if(!mute){
      mute = await msg.guild.createRole({
        name: muteayarlari.muteroladi,
        color: muteayarlari.muterolrengi,
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
  
    }
  
  
  await(user.addRole(mute.id));
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  
  const muteembed = new Discord.RichEmbed()
  .setColor('RANDOM')    
  .addField(`🔹 Yetkiyi Kullanan Yetkili` , `▫ ${mod} adlı yetkili susturma komutu kullandı.`)
  .setDescription(`🔸 ${acarayarlar.sunucuadi}**▫ <@${user.id}>** adlı kullanıcı **${reason}** sebebi ile ${mutezaman} susturuldu.`)
  .setTimestamp()
  .setThumbnail(acar.sunucuresim)
  let kanal1 = msg.guild.channels.get(acarayarlar.mutelogid);
  if (!kanal1) return;
  kanal1.send(muteembed);
   const muteembed1 = new Discord.RichEmbed()
  .setColor('RANDOM')    
  .setDescription(`🔹 ${acarayarlar.sunucuadi}**▫ <@${user.id}>** adlı kullanıcı **${reason}** sebebi ile ${mutezaman} susturuldu.\n\n`)
  .setThumbnail(acar.sunucuresim)
   
  msg.channel.send(muteembed1).then(msg => msg.delete(10000));
  msg.delete()
    db.set(`mute.${user.id}`, '1')
    db.add(`yetkili.${msg.author.id}.mute`, 1);
    db.add(`kullanıcı.${user.id}.mute`, 1);
  setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
    db.set(`mute.${user.id}`,'0') 
      const muteembed = new Discord.RichEmbed()
      .setDescription(`<@${user.id}> süren doldu, artık konuşabilirsin!`)
        msg.channel.send(muteembed).then(msg => msg.delete(10000));
    user.removeRole(mute.id);
    
  }, ms(mutetime));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute",'cmute'],
  permLevel: 0,
  kategori:'yetkili',
};

exports.help = {
  name: "chatmute",
  description: "Belirttiğiniz kullanıcıyı belirttiğiniz zamana göre susturur.",
  usage: ""
};

exports.acar = {
    acardizini: 'acar-chatmute.js',
    acarprefix: acar.prefix,
};