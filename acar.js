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


//SağClick Kick ve Ban atınca Yetkiliye ve kullanıcıya Kick ve Ban sayma!
client.on("guildBanAdd", async function(guild, user) {
  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());
  const yetkili = await guild.members.get(entry.executor.id);
    if (yetkili.id === acar.botid) return;
   db.add(`yetkili.${yetkili.id}.ban`, 1);
    db.add(`kullanıcı.${user.id}.ban`, 1);
});
client.on("guildMemberRemove", async function(user)  {
  let guild = client.guilds.get(acarayarlar.sunucuid);
  const entry = await guild.fetchAuditLogs().then(audit => audit.entries.first());
if (entry.action == `MEMBER_KICK`) {
  let yetkili = await guild.members.get(entry.executor.id);
    db.add(`yetkili.${yetkili.id}.kick`, 1);
    db.add(`kullanıcı.${user.id}.kick`, 1);
}
})


// Main Olarak Belirlediğimiz Yer !
client.on("guildMemberAdd", async member => {
  try {
    let embed = new Discord.RichEmbed();
    let user = client.users.get(member.id);
         const user2 = member.user;
String.prototype.replaceA = function (find, replace) {
  return this.replace(new RegExp(find, 'g'), replace);
}         
const dcs = function(sayı) {
  let acarkee = sayı.toString().replace('0', '0a')
    .replaceA('1', '1a')
    .replaceA('2', '2a')
    .replaceA('3', '3a')
    .replaceA('4', '4a')
    .replaceA('5', '5a')
    .replaceA('6', '6a')
    .replaceA('7', '7a')
    .replaceA('8', '8a')
    .replaceA('9', '9a')
    acarkee = acarkee
    .replaceA("0a", '<a:0_:764913510630162484>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("1a", "<a:1_:764913513247539200>")//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("2a", "<a:2_:764913516037275648>")//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("3a", "<a:3_:764913516690800680>")//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("4a", '<a:4_:764913518923087882>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("5a", '<a:5_:764913518658453525>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("6a", '<a:6_:764913519082340352>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("7a", '<a:7_:764913519321153557>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("8a", '<a:8_:764913518968569898>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
    .replaceA("9a", '<a:9_:764913519246049330>')//hareketli sayı emoji isim ve idleri şekildeki gibi yapın 
  
  return acarkee
}
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
            if(moment(user2.createdAt).format('a') === 'am') {
               var güno = 'Öğleden önce'
             }
         var tarih = ''
            if(moment(user2.createdAt).format('MM') === '01') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Ocak ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '02') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Şubat ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '03') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Mart ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '04') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Nisan ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '05') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Mayıs ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '06') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Haziran ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '07') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Temmuz ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '08') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Ağustos ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '09') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Eylül ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '10') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Ekim ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '11') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Kasım ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }
            if(moment(user2.createdAt).format('MM') === '12') {
                var tarih = `${moment(user2.createdAt).format('YYYY')} __${gün} Aralık ${hafta} (${moment(user.createdAt).format('HH')}:${moment(user.createdAt).format('mm')}:${moment(user.createdAt).format('SS')})__`
            }

  
    let acar = client.emojis.find(emoji => emoji.name === acarayarlar.hoşgeldinbaşlıkemojiadı);
    let acargüvenli = client.emojis.find(emoji => emoji.name === acarayarlar.hoşgeldingüvenliemojiadı);
    let acargüvensiz = client.emojis.find(emoji => emoji.name === acarayarlar.hoşgeldingüvensizemojiadı);
    
    await client.channels
    
      .get(acarayarlar.hoşgeldinkanalid)
      .send(`${acar} **The Ambrøsia'ya Hoşgeldin, ${member} Seninle Beraber ${dcs(member.guild.memberCount)} Kişiyiz!**
${acar} **Müsait Olduğunda Teyit Odalarından Birine Geçip Kaydını Yaptırabilirsin.**
${acar} <@&${acarayarlar.registercommandid}> seninle ilgilenecektir.
${acar} Hesabın Oluşturma Tarihi: **${tarih}** \n${new Date().getTime() - member.user.createdAt.getTime() < 15*24*60*60*1000
            ? acargüvensiz + " __**Bu Hesap Şüpheli Görünüyor**__ " + acargüvensiz
            : acargüvenli + " __**Bu Hesap Güvenilir Görünüyor**__ " + acargüvenli
            }\n\n`,
           new Discord.Attachment("https://cdn.discordapp.com/attachments/764903176083996682/764930174050893915/ezgif-2-804b7a25b2bb.gif"));
  } catch (err) {
    console.log(err);
  }
  
let kullanıcıadı = member.user.username.replace(/\W/g, "");
let m = await db.fetch(`mute.${member.id}`)
let j = await db.fetch(`jail.${member.id}`)
db.fetch(`mute.${member.id}`, '0');
db.fetch(`jail.${member.id}`, '0');
member.addRole(acar.kayıtsızrol)
member.setNickname(`${acarayarlar.tagsiz} ${kullanıcıadı}`);

  
if(j == '0' && m == '0') {
          member.addRole(acar.kayıtsızrol)
          member.setNickname(`${acarayarlar.tag} ${kullanıcıadı}`);
}
  
if(j == '1') {
      member.removeRole(acar.kayıtsızrol) 
      member.addRole(acar.cezalırolid).then(x => {
        x.addRole(acar.cezalırolid)
        x.setNickname(acar.tagsiz + ` Cezalı Üye`)  
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
      member.addRole(acar.şüphelirol).then(x => {
      x.addRole(acar.şüphelirol)
      x.removeRole(acar.kayıtsızrol)
      member.setNickname(`${acarayarlar.tagsiz} ${kullanıcıadı}`);
         const logChannelx = member.guild.channels.find(channel => channel.id === acar.şüphelilog);
    const embed = new Discord.RichEmbed()
      .setColor("RED")
      .addField(`${acar.tag} ${acar.sunucuadi}` , `${member} adlı kullanıcının hesabı __7__ (yedi) günden önce açıldığı için şüpheli rolü verildi!`)
logChannelx.send(embed)
    });
    }
  let djstürkiye = await db.get(`forceban_${member.guild.id}`)
  if(djstürkiye && djstürkiye.some(id => `k${member.user.id}` === id)) {
    try {
      member.ban({reason: 'Forceban'})
      await member.guild.owner.user.send(new Discord.RichEmbed().setTimestamp().setFooter(client.user.username + " Force Ban", client.user.avatarURL).setDescription(`Bir kullanıcı **${member.guild.name}** adlı sunucuna girmeye çalıştı! Force banı olduğu için tekrar yasaklandı. \n**Kullanıcı:** ${member.user.id} | ${member.user.tag}`))
      await member.user.send(new Discord.RichEmbed().setTimestamp().setFooter(client.user.username + " Force Ban", client.user.avatarURL).setDescription(`**${member.guild.name}** sunucusundan force banlı olduğun için yasaklandın!`))
      member.ban({reason: 'Forceban'})
    } catch(err) { console.log(err) }
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

client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
           if (message.content.toLowerCase() === prefix+'tag') {
    message.channel.sendMessage(acar.tag).then(msg => msg.delete(5000));
            
  }
});
client.on('userUpdate', async (oldUser, newUser) => {
  var tag3 = acar.tag
   let acar10 = client.emojis.find(emoji => emoji.name === acar.ototagemoji);
  let sunucu = client.guilds.find(e => e.id === acar.sunucuid)
  let rol = sunucu.roles.find(a => a.id === acar.familyrol)
  let uye = sunucu.members.get(newUser.id)
  if (newUser.username.includes(tag3) && !oldUser.username.includes(tag3)) {
    uye.addRole(acar.familyrol)
    let embed = new Discord.RichEmbed()
    .setColor(`GREEN`)
    .setDescription(`${acar10} <@${newUser.id}> adlı üye "${acar.tag}" tagımızı aldığı için <@&${acar.familyrol}> rolü verildi!`)
    client.channels.get(acar.taglogid).send(embed)

  }
}
          );

client.on('userUpdate', async (oldUser, newUser) => {
  var tag3 = acar.tag
  let acar10 = client.emojis.find(emoji => emoji.name === acar.ototagemoji);
  let sunucu = client.guilds.find(e => e.id === acar.sunucuid)
  let rol = sunucu.roles.find(a => a.id === acar.familyrol)
  let uye = sunucu.members.get(oldUser.id)
  if (oldUser.username.includes(tag3) && !newUser.username.includes(tag3)) {
    uye.removeRole(acar.familyrol) // family
    let embed = new Discord.RichEmbed()
    .setColor(`RED`)
    .setDescription(`${acar10} <@${oldUser.id}> adlı üye "${acar.tag}" tagımızı çıkardığı için <@&${acar.familyrol}> rolü alındı!`)
    client.channels.get(acar.taglogid).send(embed)

  }
}
          );


client.on('message', async (message , member) => {
   if(message.author.bot || message.channel.type === "dm") return;
           if (message.content.toLowerCase() === '!tag') {
    message.channel.sendMessage(acar.tag).then(msg => msg.delete(10000));
  }
});



client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
           if (message.content.toLowerCase() === prefix+'link') {
    message.reply(acar.sunucudavetlinki).then(msg => msg.delete(10000));
  }
});

client.on('message', async message => {
   if(message.author.bot || message.channel.type === "dm") return;
           if (message.content.toLowerCase() === 'link') {
    message.reply(acar.sunucudavetlinki).then(msg => msg.delete(10000));
       
  }
});
client.on('message', async (message, member) => {
   if(message.author.bot || message.channel.type === "dm") return;
           if (message.content.toLowerCase() === '!link') {
    message.reply(acar.sunucudavetlinki).then(msg => msg.delete(10000));
  }
});


client.on("message",async message => {
   if (message.author.bot || message.channel.type === "dm") return;
 
  //return message.channel.send(`**${user_tag}** Şu anda afk.\nNedeni:${key.reason}`)
  //return message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
    var afklar =await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
    
  if(afklar){
    
    db.delete(`afk_${message.author.id}, ${message.guild.id}`)
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
    
    message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = message.member.nickname.replace("[AFK]", "")
    message.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   

 console.log(err.message)
  }
  }
  var kullanıcı = message.mentions.users.first()
  if(!kullanıcı) return
   let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
  
   
    var süre = ms(Date.now() - zaman)
    
    
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
  if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
  if(süre.days !== 0){
     message.channel.send(`**${kullanıcı}** adlı kullanıcı **${sebep}** sebebi ile afk! `)
   return
   }
  }
})
    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`${msg.author}, Capslock kullanma!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});
client.on("message", msg => {
  if (msg.content.toLowerCase() === "sa") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sa") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Sea") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "sea") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamın Aleyküm") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamın aleyküm") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "Selamun Aleyküm") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "selamun aleyküm") {
    msg.reply("Aleyküm Selam Dostum Hoşgeldin !");
  }
});

client.on("message", msg => {
  if (msg.content.toLowerCase() === "bot seni kim yaptı") {
    msg.reply("Nam-ı Değer Puşşttt ACAR#0001 Yaptı!!");
  }
});


client.on('message', async message => {
let aktif = await db.fetch(`reklamEngelacar_${message.channel.id}`)
if (!aktif) return 
const kanal = message.guild.channels.find(c => c.id == '764521752407310387') 
if (!kanal) return
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
if (message.member.hasPermission("BAN_MEMBERS")) return;
if (!kanal) return
message.delete()
message.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});

client.on("messageUpdate", async (oldMsg, newMsg ) => {
let aktif = await db.fetch(`reklamEngelacar_${oldMsg.channel.id}`)
if(!aktif) return
const kanal = oldMsg.guild.channels.find(c => c.id == '764521752407310387') 
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
if (newMsg.member.hasPermission("BAN_MEMBERS")) return;
if (kanal) return
newMsg.delete()
oldMsg.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});

client.on("message", async message => {
  let kişiuyari = await db.fetch(  `uyarisayisi_${message.author.id}${message.guild.id}`);
  let sınır = await db.fetch(`reklamsınır_${message.guild.id}`);
  let reklambanayar = await db.fetch(`reklambanayar_${message.guild.id}`);
  let kullanici = message.member;
  const reklambankelimeler = [
    "discord.app",
    "discord.gg",
    "invite",
    "discordapp",
    "discordgg"
  ];
  if (reklambanayar == "kapali") return;
  if (reklambanayar == "acik") {
    if (
      reklambankelimeler.some(word =>
        message.content.toLowerCase().includes(word)
      )
    ) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
        message.delete();
        db.add(`uyarisayisi_${message.author.id}${message.guild.id}`, 1);
        let reklambanuyari = new Discord.RichEmbed()
          .addField(
            `Reklam Ban Sistemi Tarafından Discord Reklamı Engellendi :thumbsup:`,
            `Sunucu Reklamını Atan Kişi: **${message.author.tag}**\nUyarı Sayısı: **${kişiuyari}/${sınır}**`
          )
          .setTimestamp()
          .setFooter(`${client.user.username}`, client.user.avatarURL);
        message.channel
          .send(reklambanuyari)
          .then(message => message.delete(10000));
        if (kişiuyari == sınır) {
          message.delete();
          kullanici.ban({
            reason: `${client.user.username} Reklam Oto Ban Sistemi`
          });
          db.set(`uyarisayisi_${message.author.id}${message.guild.id}`, 1);
          let yeteramkreklamban = new Discord.RichEmbed()
            .addField(
              `Reklam Ban Sistemi Reklam Yapan Kişiyi Banladı :white_check_mark:`,
              `Reklamdan Banlanan Kişi: **${kullanici}**`
            )
            .setTimestamp(new Date())
            .setFooter(
              `${client.user.username} Blocker`,
              client.user.avatarURL
            );
          message.channel.send(yeteramkreklamban);
        }
      }
    }
  }
});

client.on("message", async msg => {
  let aktif = await db.fetch(`küfürEngelacar_${msg.channel.id}`)
  if(!aktif) return
    if(msg.author.bot) return;
    if(msg.channel.type === "dm") return;
                  const küfür = [
      "amcık",
      "orospu",
      "piç",
      "sikerim",
      "sikik",
      "amına",
      "pezevenk",
      "yavşak",
      "ananı",
      "anandır",
      "orospu",
      "evladı",
      "göt",
      "pipi",
      "sokuk",
      "yarrak",
      "oç",
      "o ç",
      "siktir",
      "bacını",
      "karını",
      "amk",
      "aq",
      "sik",
      "amq",
      "anaskm",
      "AMK",
      "YARRAK",
      "sıkerım"
    ];
              if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
                try {
                  if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    msg.delete();                   
                  
                                        
                    return msg.reply("Küfür etmek yasaktır").then(msg => msg.delete(2000));
                  }             
                } catch(err) {
                  console.log(err);
                }
              }
          
  });
client.on("message",async message => {
   if (message.author.bot || message.channel.type === "dm") return;
 
  //return message.channel.send(`**${user_tag}** Şu anda afk.\nNedeni:${key.reason}`)
  //return message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
    var afklar =await db.fetch(`afk_${message.author.id}, ${message.guild.id}`)
    
  if(afklar){
    
    db.delete(`afk_${message.author.id}, ${message.guild.id}`)
    db.delete(`afk-zaman_${message.author.id}, ${message.guild.id}`)
    
    message.reply(`Artık afk değilsin. Tekrardan hoş geldin.`).then(msg => msg.delete(9000))
       try{
    let takma_ad = message.member.nickname.replace("[AFK]", "")
    message.member.setNickname(takma_ad).catch(err => console.log(err));
       }catch(err){   

 console.log(err.message)
  }
  }
  var kullanıcı = message.mentions.users.first()
  if(!kullanıcı) return
   let zaman =  await db.fetch(`afk-zaman_${kullanıcı.id}, ${message.guild.id}`)
  
   
    var süre = ms(Date.now() - zaman)
    
    
   var sebep = await db.fetch(`afk_${kullanıcı.id}, ${message.guild.id}`)
  if(await db.fetch(`afk_${message.mentions.users.first().id}, ${message.guild.id}`)){
  if(süre.days !== 0){
     message.channel.send(`**${kullanıcı}** adlı kullanıcı **${sebep}** sebebi ile afk! `)
   return
   }
  }
})

client.on('ready', ()=>{
if(client.channels.get('764600050873008128')) {
client.channels.get('764600050873008128').join()
} 
})