const Discord = require('discord.js');
const db = require("quick.db")
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {
 message.delete()
  if (!message.member.roles.has(acarayarlar.registercommandid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(msg => msg.delete(5000))
  let kullanıcı = message.mentions.users.first()
  if (!kullanıcı) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bir kullanıcı etiketlemelisin!`).setColor("RED")).then(msg => msg.delete(3000))
  let user = message.mentions.users.first();
  let rol = message.mentions.roles.first()
  let member = message.guild.member(kullanıcı)
  if (member.roles.has(acarayarlar.erkekrol1)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED")).then(msg => msg.delete(5000))
  if (member.roles.has(acarayarlar.erkekrol2)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED")).then(msg => msg.delete(5000))
  if (member.roles.has(acarayarlar.kadınrol1)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED")).then(msg => msg.delete(5000))
  if (member.roles.has(acarayarlar.kadınrol2)) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Kullanıcı zaten kayıtlı tekrardan kayıt edemem!`).setColor("RED")).then(msg => msg.delete(5000))
  function acarf(isim) {
    return isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase();
  }
let cinsiyet = args[1]
      if(!cinsiyet) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Cinsiyet belirlemelisin Örn: ${acarayarlar.prefix}k <@etiket> erkek Acar 22!`).setColor("RED")).then(msg => msg.delete(5000))
let isim = args[2]
      if(!isim) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Kayıt edilecek kullanıcıya bir isim belirlemelisin!!!`).setColor("RED")).then(msg => msg.delete(5000))
let yas = args[3]
      if(!yas) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Kayıt edilecek kullanıcıya bir yaş belirlemelisin!!!!`).setColor("RED")).then(msg => msg.delete(5000))

if(cinsiyet == "erkek"){
await member.setNickname(`${acarayarlar.tag} ' ${acarf(isim)} | ${yas}`)
  member.addRole(acarayarlar.erkekrol1); // erkek 1
  member.addRole(acarayarlar.erkekrol2); // erkek 2
  member.removeRole(acarayarlar.kadınrol1); // kadın 1
  member.removeRole(acarayarlar.kadınrol2); // kadın 2
  member.removeRole(acarayarlar.kayıtsızrol) // kayıtsız 1
    db.add(`yetkili.${message.author.id}.erkek`, 1);
    const kanal = message.guild.channels.find(c => c.id == acarayarlar.chatid)
    const kanal1 = message.guild.channels.find(c => c.id == acarayarlar.kayıtlogid) 
    const embed1 = new Discord.RichEmbed() 
    .addField(`${acarayarlar.tag} Heyy!`, `🔥 ${member.user}, Ailemize hoşgeldin seni ailemiz de görmekten büyük mutluluk duyarız.`)
    .setColor("BLUE")
    .setThumbnail(acarayarlar.saygif)
  let uye =  message.author;
  let erkek = db.get(`yetkili.${uye.id}.erkek`) || 0;
  let kiz = db.get(`yetkili.${uye.id}.kadın`) || 0;
  let embed = new Discord.RichEmbed() 
  .setColor("RANDOM")
  .setTitle(acarayarlar.tag + ' ' + acarayarlar.sunucuadi)
  .setThumbnail(acarayarlar.sunucuresim)
  .setImage(acarayarlar.sunucuembedaltıresim)
  .addField(`🔹 İşlem Bilgileri`, `▫ İşlem Yapılanın İsmi : \`${acarf(isim)}\`\n▫ İşlem Yapılanın Yaşı : \`${yas}\`\n▫ İşlem Yapılan Kullanıcı Adı : \`${member.user.tag}\`\n▫ İşlem Yapılan Kullanıcı ID : \`${member.user.id}\``) 
  .addField(`🔸 Yetkili Bilgileri`,`▫ Yetkili : \`${message.author.tag}\`\n▫ Yetkili ID : \`${message.author.id}\`\n▫ Detaylı bilgi için : \`${acarayarlar.prefix}yb <@${message.author.id}>\` `)
  .setDescription("\n▫ <@" + member.user.id + "> Adlı kullanıcı **Erkek** olarak kayıt edildi!")
  return  await(message.channel.sendEmbed(new Discord.RichEmbed().addField(`✅ Başarılı!` , `▫ Kullanıcıyı başarıyla **Erkek** olarak kayıt ettim!!`).setColor("RED")).then(msg => msg.delete(5000)).then(kanal1.send(embed).then(kanal.send(embed1).then(msg => msg.delete(30000)))));   
} 
if(cinsiyet == "kadın"){
await member.setNickname(`${acarayarlar.tag} ' ${acarf(isim)} | ${yas}`)
  member.removeRole(acarayarlar.erkekrol1); // erkek 1
  member.removeRole(acarayarlar.erkekrol2); // erkek 2
  member.addRole(acarayarlar.kadınrol1); // kadın 1
  member.addRole(acarayarlar.kadınrol2); // kadın 2
  member.removeRole(acarayarlar.kayıtsızrol) // kayıtsız 1
    db.add(`yetkili.${message.author.id}.kadın`, 1);
    const kanal = message.guild.channels.find(c => c.id == acarayarlar.chatid)
    const kanal1 = message.guild.channels.find(c => c.id == acarayarlar.kayıtlogid) 
    const embed1 = new Discord.RichEmbed() 
    .addField(`${acarayarlar.tag} Heyy!`, `🔥 ${member.user}, Ailemize hoşgeldin seni ailemiz de görmekten büyük mutluluk duyarız.`)
    .setColor("BLUE")
    .setThumbnail(acarayarlar.saygif)
  let uye =  message.author;
  let erkek = db.get(`yetkili.${uye.id}.erkek`) || 0;
  let kiz = db.get(`yetkili.${uye.id}.kadın`) || 0;
  let embed = new Discord.RichEmbed() 
  .setColor("RANDOM")
  .setTitle(acarayarlar.tag + ' ' + acarayarlar.sunucuadi)
  .setThumbnail(acarayarlar.sunucuresim)
  .setImage(acarayarlar.sunucuembedaltıresim)
  .addField(`🔹 İşlem Bilgileri`, `▫ İşlem Yapılanın İsmi : \`${acarf(isim)}\`\n▫ İşlem Yapılanın Yaşı : \`${yas}\`\n▫ İşlem Yapılan Kullanıcı Adı : \`${member.user.tag}\`\n▫ İşlem Yapılan Kullanıcı ID : \`${member.user.id}\``) 
  .addField(`🔸 Yetkili Bilgileri`,`▫ Yetkili : \`${message.author.tag}\`\n▫ Yetkili ID : \`${message.author.id}\`\n▫ Detaylı bilgi için : \`${acarayarlar.prefix}yb <@${message.author.id}>\` `)
  .setDescription("\n▫ <@" + member.user.id + "> Adlı kullanıcı **Kadın** olarak kayıt edildi!")
  return  await(message.channel.sendEmbed(new Discord.RichEmbed().addField(`✅ Başarılı!` , `▫ Kullanıcıyı başarıyla **Kadın** olarak kayıt ettim!!`).setColor("RED")).then(msg => msg.delete(5000)).then(kanal1.send(embed).then(kanal.send(embed1).then(msg => msg.delete(30000)))));   
} else return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Lütfen geçerli bir cinsiyet girin **erkek** veya **kadın** !!`).setColor("RED").setFooter(message.author.tag ,message.author.avatarURL).setTimestamp())

  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıt"],
  kategori: "Yetkili Komutları",
  permLevel: 0
};
exports.help = {
  name: "k",
  description: "Sunucuya kaydolmaya ne dersin ?",
  usage: "kayıt"
};

exports.acar = {
    acardizini: 'acar-erkek.js',
    acarprefix: acar.prefix,
};