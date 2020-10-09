const Discord = require('discord.js');
const client = new Discord.Client();
const acar = require('./acar/botayarlari.json');
const chalk = require('chalk');
const fs = require('fs');
const ms = require('ms');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./acarutil/etkinlikler')(client);
const express = require('express');
const app = express();
var prefix = acar.prefix;
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
  
};
client.on('ready', () => {
   console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] Register botu sunucuda aktif hale getirilidi. www.acardev.net`);
   console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] RPC düzenlemesini ../acarregister/rpc.json'dan düzenleyebilirsin.`);
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./acarkomutlar/', (err, files) => {
  if (err) console.error(err);
  log(`( ${files.length} ) adet dizin ve komut algılandı ve yüklendi.`);
  files.forEach(f => {
    let props = require(`./acarkomutlar/${f}`);
    log(`Yüklenen komut ve dizin: ${acar.prefix}${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./acarkomutlar/${command}`)];
      let cmd = require(`./acarkomutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./acarkomutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./acarkomutlar/${command}`)];
      let cmd = require(`./acarkomutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === acar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
});

client.login(acar.token);

// Main Olarak Belirlediğimiz Yer !

client.on('guildMemberAdd', async (member) => {
let b = client.channels.get("763812215550640171") // Hoşgeldin Mesajı Kanalı
if(!b) return;
let gkisi = client.users.get(member.id);
var humanize = require("humanize-duration")
var timestamp = Date.now() - gkisi.createdAt.getTime()
var oluşturulmatarihi = humanize(timestamp, { language: "tr", round: true, conjunction: " , ", serialComma: false })
const ktarih = new Date().getTime() - gkisi.createdAt.getTime();
if (ktarih < 0) {
  member.addRole("763919755194794045") // Şüpheli Rol İd
  member.removeRole("763919772143714305") //Kayıtsız Üye Rol İd
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setAuthor('ACAR',member.avatarURL)
.setImage(`https://media.giphy.com/media/Xg5VGVAAcFwbDhhcyZ/giphy.gif`)
.setDescription(`

<a:olmas:737341798799638608> ${gkisi} hoşgeldin, seninle **__${member.guild.members.size}__** kişiyiz!

<a:olmas:737341798799638608> **Şüpheli** olduğun için karantina altına alındın

<a:olmas:737341798799638608>  **__${oluşturulmatarihi}__** önce kurulmuş.

`)
b.send(embed);
} else {
await member.addRole("763919772143714305") // Kayıtsız Üye Rol İd
const embed = new Discord.RichEmbed()
.setColor('BLACK')
.setAuthor('ACAR',member.avatarURL)
.setImage(`https://media.giphy.com/media/Xg5VGVAAcFwbDhhcyZ/giphy.gif`)
.setDescription(`

<a:diamond:737341814440329236> ${gkisi} hoşgeldin, seninle **__${member.guild.members.size}__** kişiyiz!

<a:diamond:737341814440329236> Hesabın **__${oluşturulmatarihi}__** önce kurulmuş.

<a:diamond:737341814440329236> Hesabın **şüpheli değil** sunucuya kayıt olabilirsin.

<a:diamond:737341814440329236> Solda bulunan **sesli** kanala geçerek **kayıt** olabilirsin.

<a:diamond:737341814440329236> <@&737320623755231293> **seninle** ilgilenecektir.

`)
b.send(embed)
}
});

client.on("guildMemberAdd", async member => {
  try {
    let embed = new Discord.RichEmbed();
    const kullanıcıadı = member.user.username.replace(/\W/g, "");
    let user = client.users.get(member.id);
         const user2 = member.user;
         var tarih = ''
            if(moment(user2.createdAt).format('MM') === '01') {
                var tarih = `${moment(user.createdAt).format('DD')} Ocak ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '02') {
                var tarih = `${moment(user.createdAt).format('DD')} Şubat ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '03') {
                var tarih = `${moment(user.createdAt).format('DD')} Mart ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '04') {
                var tarih = `${moment(user.createdAt).format('DD')} Nisan ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '05') {
                var tarih = `${moment(user.createdAt).format('DD')} Mayıs ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '06') {
                var tarih = `${moment(user.createdAt).format('DD')} Haziran ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '07') {
                var tarih = `${moment(user.createdAt).format('DD')} Temmuz ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '08') {
                var tarih = `${moment(user.createdAt).format('DD')} Ağustos ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '09') {
                var tarih = `${moment(user.createdAt).format('DD')} Eylül ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '10') {
                var tarih = `${moment(user.createdAt).format('DD')} Ekim ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '11') {
                var tarih = `${moment(user.createdAt).format('DD')} Kasım ${moment(user2.createdAt).format('YYYY')} `
            }
            if(moment(user2.createdAt).format('MM') === '12') {
                var tarih = `${moment(user.createdAt).format('DD')} Aralık ${moment(user2.createdAt).format('YYYY')} `
            }

    await member.setNickname(`${kullanıcıadı}`);
    let acar1 = client.emojis.find(emoji => emoji.name === "sunucubeyaz");
    await client.channels
    
      .get(' ')
      .send(
        `              **${acar1} Welcome to ACAR Code Center ${acar1}

${acar1} Hoşgeldin ${member} Seninle beraber ${
          member.guild.memberCount
        } Kişiyiz! ${acar1}
\n🔸 Kayıt Olmak İçin Soldaki Ses Odalarına Giriş Yapabilirsin \n
🔸 Hesap: ${tarih} ${
          new Date().getTime() - member.user.createdAt.getTime() <
          15 * 24 * 60 * 60 * 1000
            ? "Tehlikeli Hesap ❌"
            : "Güvenli Hesap ✅"
        }
  \n 💎Sunucumuza kayıt olmak için lütfen #kayıt-ol kanalındaki tepkiye tıklayınız!**`,
        new Discord.Attachment(
          acar.sunucubanner
        )
      );
  } catch (err) {
    console.log(err);
  }
});