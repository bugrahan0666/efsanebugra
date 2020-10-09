  const Discord = require('discord.js');
const db = require("quick.db")
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {
 if (!message.member.roles.has(acarayarlar.registercommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Bilgi` , `Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Bilgi` , `Bir kullanıcı etiketlemelisin!`).setColor("2e0101").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp());
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
   if (member.roles.has(acarayarlar.kayıtsızrol)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`${acarayarlar.sunucuadi} Hata` , `Kayıtsıza atılanı tekrardan kayıtsıza atamam!`).setColor("RED").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())
if(member.roles.has(acarayarlar.erkekrol1)) {
    db.fetch(`yetkili.${message.author.id}`);
    db.add(`yetkili.${message.author.id}.erkek`, -1);
} else {
    db.fetch(`yetkili.${message.author.id}`);
    db.add(`yetkili.${message.author.id}.kadın`, -1);
}
 await member.setNickname(`${acarayarlar.tagsiz} ' ${acar.yenibiriisim}`)
      message.guild.members.get(member.id).roles.forEach(r => {
message.guild.members.get(member.id).removeRole(r) 

   
})
    await member.addRole(acarayarlar.kayıtsızrol) // kayıtsız 1
let uye = message.author;
let bilgi = db.get(`yetkili.${uye.id}`);
let erkek = db.get(`yetkili.${uye.id}.erkek`) || 0;
let kiz = db.get(`yetkili.${uye.id}.kadın`) || 0;
  let embed = new Discord.RichEmbed() 
  .setColor("BLACK")
  .setThumbnail(acarayarlar.sunucuresim)
  .setTitle(acarayarlar.tag + ' ' + acarayarlar.sunucuadi)
  .addField(`🔹 Yapılan İşlem Açıklaması`, `▫ ${member.user} adlı üyeye <@&${acarayarlar.kayıtsızrol}> rolünü verip kayıtsıza attım.\n`)
  .addField(`🔸 Sistem Mesajı !`,`▫ **${erkek+kiz}** toplam kayıtların!\n▫ Kayıtsız işlemi yaptığın için etkilendin ve teyitlerinden bir kişi düşüldü.`)
  .setFooter(message.author.tag ,message.author.avatarURL)
  .setTimestamp()
  return message.channel.send(embed).then(msg => msg.delete(12000));

 
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "kayıtsız",
  description: "Kayıtsıza atar ?",
  usage: "kayıtsız"
};

exports.acar = {
    acardizini: 'acar-kayıtsız.js',
    acarprefix: acar.prefix,
};