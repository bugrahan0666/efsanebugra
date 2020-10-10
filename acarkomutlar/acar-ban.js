const Discord = require('discord.js');
let acarayarlar = require('../acar/botayarlari.json')
const db = require('quick.db')
var banlar = {};
exports.run = async(client, message, args) => {
  message.delete()
  if (!message.member.roles.has(acarayarlar.bancırolid) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(message => message.delete(5000))
  if (!message.mentions.members.first()) return message.reply(`Bir üyeyi etiketlemelisin!`).then(message => message.delete(5000))
  if (!args.join(' ').replace(/[^a-zA-ZığüşöçĞÜŞİÖÇ]+/g, "")) return message.reply(`Bir sebep belirtmelisin!`).then(message => message.delete(5000))
  var logKanali = acarayarlar.banlogid; // BURAYA LOG KANALININ ID
  var banLimit = 10; // BURAYA BAN LİMİTİ
  var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
  if (message.mentions.members.size > 1) {
    let mesaj = await message.channel.send(new Discord.RichEmbed().setDescription(`${message.mentions.members.array().join(', ')} üyelerini yasaklamakta emin misiniz? (evet/hayır)`));
    message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(collected => {
      if(collected.first().content.toLowerCase() === "hayır") return mesaj.edit(new Discord.RichEmbed().setDescription(`İşlem başarıyla iptal edildi!`));
      if(collected.first().content.toLowerCase() === "evet") {
        let sebep = args.join(' ').replace(/[^a-zA-ZığüşöçĞÜŞİÖÇ]+/g, "");
        message.mentions.members.forEach(async uye => {
          if (banlar[message.author.id] > banLimit) return message.reply('Ban limitini doldurdun (10)').then(message => message.delete(5000));
          if (uye.bot) return mesaj.edit(new Discord.RichEmbed().setDescription(`Botu yasaklıcak kadar mal mısın?`)).then(message => message.delete(5000));
          if (uye.id === message.author.id) return message.reply(`Kendini yasaklayacak kadar sorunlu musun?`).then(message => message.delete(5000));
          if (uye.highestRole.position >= message.member.highestRole.position) return message.reply(`Yasaklamaya çalıştığın ${uye} üyesi senden yetkili!`).then(message => message.delete(5000));
          if (!uye.bannable) return message.channel.send(new Discord.RichEmbed().setDescription(`${uye} üyesini yasaklamaya yetkim yetmiyor!`)).then(message => message.delete(5000));
          await db.add(`kullanıcı.${uye.id}.ban`, 1); message.guild.ban(uye.id, { reason: sebep });
          banlar[message.author.id] = banlar[message.author.id] ? banlar[message.author.id]+1 : 1;
          setTimeout(() => {
            banlar[message.author.id] = banlar[message.author.id]-1;
          }, 10*60*1000)
        });
        mesaj.edit(new Discord.RichEmbed().setImage(acarayarlar.sunucuembedaltıresim).setDescription(`${message.mentions.members.filter(a => !message.guild.members.has(a.id)).array().join(', ')} üyeleri başarıyla ${message.author} tarafından **${sebep}** nedeniyle yasaklandı!`));
        db.add(`yetkili.${message.author.id}.ban`, 1);
        client.channels.get(logKanali).send(new Discord.RichEmbed().setTimestamp().setImage(acarayarlar.sunucuembedaltıresim).setDescription(`${message.mentions.members.filter(a => !message.guild.members.has(a.id)).array().join(', ')} üyeleri ${message.author} tarafından **${sebep}** nedeniyle yasaklandı!`));
      };
    });
  } else {
    let uyemiz = message.mentions.members.first();
    let mesaj = await message.channel.send(new Discord.RichEmbed().setDescription(`${uyemiz} üyesini yasaklamakta emin misin? (evet/hayır)`));
    message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(async collected => {
      if(collected.first().content.toLowerCase() === "hayır") return mesaj.edit(new Discord.RichEmbed().setDescription(`İşlem başarıyla iptal edildi!`));
      if(collected.first().content.toLowerCase() === "evet") {
        if (banlar[message.author.id] > banLimit) return message.reply('Ban limitini doldurdun (10)');
        let sebep = args.join(' ').replace(/[^a-zA-ZığüşöçĞÜŞİÖÇ]+/g, "");
        if (uyemiz.bot) return mesaj.edit(new Discord.RichEmbed().setDescription(`Botu yasaklıcak kadar mal mısın?`));
        if (uyemiz.id === message.author.id) return mesaj.edit(new Discord.RichEmbed().setDescription(`Kendini yasaklayacak kadar sorunlu musun?`));
        if (uyemiz.highestRole.position >= message.member.highestRole.position) return mesaj.edit(new Discord.RichEmbed().setDescription(`Yasaklamaya çalıştığın ${uyemiz} üyesi senden yetkili!`));
        if (!uyemiz.bannable) return mesaj.edit(new Discord.RichEmbed().setDescription(`${uyemiz} üyesini yasaklamaya yetkim yetmiyor!`));
        await db.add(`kullanıcı.${uyemiz.id}.ban`, 1); message.guild.ban(uyemiz.id, { reason: sebep });
        banlar[message.author.id] = banlar[message.author.id] ? banlar[message.author.id]+1 : 1;
          setTimeout(() => {
            banlar[message.author.id] = banlar[message.author.id]-1;
          }, 10*60*1000)
        mesaj.edit(new Discord.RichEmbed().setImage(acarayarlar.sunucuembedaltıresim).setDescription(`${uyemiz} üyesi ${message.author} tarafından **${sebep}** nedeniyle yasaklandı!`));
        db.add(`yetkili.${message.author.id}.ban`, 1);
        client.channels.get(logKanali).send(new Discord.RichEmbed().setTimestamp().setImage(acarayarlar.sunucuembedaltıresim).setDescription(`${uyemiz} üyesi ${message.author} tarafından **${sebep}** nedeniyle yasaklandı!`));
      };
    });
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla'],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Yasaklamanızı sağlar. (Birden fazla yasaklayabilirsiniz)',
  usage: 'ban @kullanıcılar sebep',
  kategori: 'yetkili'
};