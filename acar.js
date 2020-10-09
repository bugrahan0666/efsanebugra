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
  
let kullanıcıadı = member.user.username.replace(/\W/g, "");
let m = await db.fetch(`mute.${member.id}`)
let j = await db.fetch(`jail.${member.id}`)
db.fetch(`mute.${member.id}`, '0');
db.fetch(`jail.${member.id}`, '0');
member.addRole(acar.kayıtsızrol)
member.setNickname(`${acarayarlar.tag} ${kullanıcıadı}`);

  
if(j == '0' && m == '0') {
          member.addRole(acar.kayıtsızrol)
          member.setNickname(`${acarayarlar.tag} ${kullanıcıadı}`);
}
  
if(j == '1') {
      member.removeRole(acar.kayıtsızrol) 
      member.addRole(acar.cezalırolid).then(x => {
        x.addRole(acar.cezalırolid)
        x.setNickname(acar.tagsiz + ' Cezalı Üye')  
        x.removeRole(acar.kayıtsızrol)
    });
  let kanal = client.channels.get(acar.cezaişlemid) //log kanal ıd.
     kanal.send(`${member} adlı kullanıcı sunucuya katıldı jaildeyken çık gir yaptığı için yeniden jaile attım.`) 
   member.send(`Öncelikle sunucumuza hoşgeldin. Sen önceden jailde olduğun için seni yeniden jaile atmak zorunda kaldım!`)
    } 
if(m == '1') {
     member.addRole(acar.muterolid)
     member.addRole(acar.muterolid).then(x => {
        x.addRole(acar.muterolid)
        member.setNickname(`${acarayarlar.tagsiz} ${kullanıcıadı}`);
        x.addRole(acar.kayıtsızrol)
       x.addRole(acar.muterolid)
    });    
    let kanalmute = client.channels.get(acar.cezaişlemid)
      kanalmute.send(`${member} adlı kullanıcı sunucuda susturulmadan kaçtığı için süresi kalkana kadar tekrardan susturulmuştur.`)
      member.send(`Sunucumuza tekrardan geldiğin teşekkür ederiz fakat muteden kaçmak kolay değil.`)
  }
  let member2 = member.user;
  let zaman = new Date().getTime() - member2.createdAt.getTime();
  if (zaman < 604800000) {
     member.removeRole(acar.kayıtsızrol) 
      member.addRole(acar.şüphelirolid).then(x => {
      x.addRole(acar.şüphelirolid)
      x.removeRole(acar.kayıtsızrol)
      member.setNickname(`${acarayarlar.tagsiz} ${kullanıcıadı}`);
         const logChannelx = member.guild.channels.find(channel => channel.id === acar.şüphelilog);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .addField(`${acar.tag} ${acar.sunucuadi}` , `${member} adlı kullanıcının hesabı __7__ (yedi) günden önce açıldığı için şüpheli rolü verildi!`)
logChannelx.send(embed)
    });
    }
});
  


client.on('voiceStateUpdate', async (oldMember, newMember) => {
  let oV = oldMember.voiceChannel;
  let nV = newMember.voiceChannel;
  if (!oV) {
   var ksesgiris = Date.now()
   db.set(`kgiris_${oldMember.id}`, ksesgiris)
  } else if (!nV) {
   var kegiris = db.get(`kgiris_${oldMember.id}`)
   if(kegiris === null) return;
    var sessuresi = Date.now()-kegiris
    var sesdedurma = db.get(`${oldMember.id}_sesdedur`)
    var sncinsindensure = Math.round(sessuresi/1000)
    if(sesdedurma === null) {
      db.set(`${oldMember.id}_sesdedur`, sncinsindensure) //Veriyi çekerken db.get(`KULLANICI ID_sesdedur`) kullanın - var ses_suresi = Math.round(db.get(`KULLANICI ID_sesdedur`)/60)+" dakika" - kullanarak dakika cinsinden kullanabilirsiniz
    } else {
      db.set(`${oldMember.id}_sesdedur`, sesdedurma+sncinsindensure) //Veriyi çekerken db.get(`KULLANICI ID_sesdedur`) kullanın - var ses_suresi = Math.round(db.get(`KULLANICI ID_sesdedur`)/60)+" dakika" -kullanarak dakika cinsinden kullanabilirsiniz
    }
  }
});