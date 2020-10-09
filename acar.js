const Discord = require('discord.js');
const client = new Discord.Client();
const acar = require('./acar/botayarlari.json');
const acarayarlar = require('./acar/botayarlari.json');
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

client.ayar = {
  "SunucuID": acarayarlar.sunucuid,
  "SahipRolüID": acarayarlar.sahip,
  "TeyitYetkilisi": acarayarlar.teyityetkiliid,
  "TeyitsizRolü":  acarayarlar.kayıtsızrolid,
  "TeyitKanal": "Sunucuya katılan kişilerin teyit edileceği kanalın ID",
  "ErkekÜye": "Erkek üyelere verilecek rolün ID",
  "KızÜye": "Kız üyelere verilecek rolün ID",
  "SohbetKanalID": "Sunucunuzun genel chat kanalının ID"
}


client.on("guildMemberAdd", async member => {
  try {
    let embed = new Discord.RichEmbed();
    const kullanıcıadı = member.user.username.replace(/\W/g, "");
    let user = client.users.get(member.id);
         const user2 = member.user;
         var hafta = moment(user2.createdAt).format('dddd')
             if(moment(user2.createdAt).format('dddd') === 'Monday') {
               var hafta = 'Pazartesi'
             }
             if(moment(user2.createdAt).format('dddd') === 'Tuesday') {
               var hafta = 'Salı'
             }
             if(moment(user2.createdAt).format('dddd') === 'Wednesday') {
               var hafta = 'Çarşamba'
             }
             if(moment(user2.createdAt).format('dddd') === 'Thursday') {
               var hafta = 'Perşembe'
             }
             if(moment(user2.createdAt).format('dddd') === 'Friday') {
               var hafta = 'Cuma'
             }
             if(moment(user2.createdAt).format('dddd') === 'Saturday') {
               var hafta = 'Cumartesi'
             }
             if(moment(user2.createdAt).format('dddd') === 'Sunday') {
               var hafta = 'Pazar'
             }
         var gün = moment(user.createdAt).format('DD')
            if(moment(user2.createdAt).format('DD') === '01') {
               var gün = '1'
               }
            if(moment(user2.createdAt).format('DD') === '02') {
               var gün = '2'
             }
            if(moment(user2.createdAt).format('DD') === '03') {
               var gün = '3'
             }
            if(moment(user2.createdAt).format('DD') === '04') {
               var gün = '4'
             }
            if(moment(user2.createdAt).format('DD') === '05') {
               var gün = '5'
             }
            if(moment(user2.createdAt).format('DD') === '06') {
               var gün = '6'
             }
            if(moment(user2.createdAt).format('DD') === '07') {
               var gün = '7'
             }
            if(moment(user2.createdAt).format('DD') === '08') {
               var gün = '8'
             }
            if(moment(user2.createdAt).format('DD') === '09') {
               var gün = '9'
             }
          var güno = moment(user.createdAt).format('a')
            if(moment(user2.createdAt).format('a') === 'pm') {
               var güno = 'Öğleden sonra'
               }
            if(moment(user2.createdAt).format('DD') === 'am') {
               var güno = 'Öğleden önce'
             }
         var tarih = ''
            if(moment(user2.createdAt).format('MM') === '01') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Ocak ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '02') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Şubat ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '03') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Mart ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '04') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Nisan ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '05') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Mayıs ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '06') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Haziran ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '07') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Temmuz ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '08') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Ağustos ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '09') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Eylül ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '10') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Ekim ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '11') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Kasım ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }
            if(moment(user2.createdAt).format('MM') === '12') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Aralık ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')} ${güno})__`
            }

    await member.setNickname(`${acarayarlar.tag} ${kullanıcıadı}`);
    let acar = client.emojis.find(emoji => emoji.name === acarayarlar.hoşgeldinbaşlıkemojiadı);
    let acargüvenli = client.emojis.find(emoji => emoji.name === acarayarlar.hoşgeldingüvenliemojiadı);
    let acargüvensiz = client.emojis.find(emoji => emoji.name === acarayarlar.hoşgeldingüvensizemojiadı);
    await client.channels
    
      .get(acarayarlar.hoşgeldinkanalid)
      .send(`${acar} **ACAR Code Center'a Hoşgeldin, ${member} Seninle Beraber \`${member.guild.memberCount}\` Kişiyiz!**
${acar} **Müsait Olduğunda Teyit Odalarından Birine Geçip Kaydını Yaptırabilirsin.**
${acar} <@&763924998263275540> seninle ilgilenecektir.
${acar} Hesabın Oluşturma Tarihi: **${tarih}** \n${new Date().getTime() - member.user.createdAt.getTime() < 15*24*60*60*1000
            ? acargüvensiz + " __**Bu Hesap Şüpheli Görünüyor**__ " + acargüvensiz
            : acargüvenli + " __**Bu Hesap Güvenilir Görünüyor**__ " + acargüvenli
            }`);
  } catch (err) {
    console.log(err);
  }

if(member.user.username.includes("tag girin")){
  member.send("Yasaklı tagda bulunduğunuz için sizi cezalıya atmak zorunda kaldım!") 
  member.addRole(acarayarlar.cezalırolid)
  await member.removeRole(acarayarlar.kayıtsızrolid) 
} else {
  
  var olusturulmaSuresi = (Date.now() - member.user.createdTimestamp) > 15*24*60*60*1000 ;// 15*24*60*60*1000
  olusturulmaSuresi ? member.addRole(acarayarlar.kayıtsızrolid) : member.setRoles([acarayarlar.şüphelihesaprolid]);
  
}
  
});