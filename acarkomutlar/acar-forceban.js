const Discord = require('discord.js');
const db = require('quick.db');
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {
 message.delete()
    if(message.channel.id !== acarayarlar.botkomutkanalid ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acarayarlar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.sendEmbed(new Discord.RichEmbed().addField(`Hataa!` , `▫ Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`).setColor("RED")).then(message => message.delete(5000))
  let kullanıcılar = await db.get(`forceban_${message.guild.id}`)
  let kullanıcı = args[0];
  if(args[0] === "liste") {
    message.channel.send(new Discord.RichEmbed().setAuthor(client.user.username + " Force Ban", client.user.avatarURL).setColor("RANDOM").setFooter(message.guild.name, message.guild.iconURL).setTimestamp().addField('Belirlenen Kullanıcılar', kullanıcılar ? kullanıcılar.map(x => x.slice(1)).join('\n') + "\n\nBu kullanıcılar artık sunucuya giremeyecek." : "Bulunmuyor!")).then(message => message.delete(5000))
    return
  }
  if(!kullanıcı || isNaN(kullanıcı) || kullanıcı.length > 20 || kullanıcı.length < 10) return message.reply('Force ban atılacak/kaldırılacak kişinin ID numarasını girmelisin! (**liste** yazarak force banlara bakabilirsin)').then(message => message.delete(5000))
  if(kullanıcılar && kullanıcılar.some(id => `k${kullanıcı}` === id)) {
    db.delete(`forceban_${message.guild.id}`, `k${kullanıcı}`)
      kullanıcılar.forEach(v => {
      if (!v.includes(`k${kullanıcı}`)) {
        db.push(`forceban_${message.guild.id}`, v)
      }
      })
    message.guild.unban(kullanıcı)
    message.channel.send(`**${kullanıcı}** ID'li kullanıcı artık sunucuya girebilecek!`).then(message => message.delete(5000))
  } else {
    await db.push(`forceban_${message.guild.id}`, `k${kullanıcı}`)
    if(message.guild.members.has(kullanıcı)) {
      await db.add(`yetkili.${message.author.id}.forceban`, 1);
      await message.guild.members.get(kullanıcı).send(`\`${message.guild.name}\` sunucusundan kalıcı olarak yasaklandın!`).then(message => message.delete(10000))
      await message.guild.ban(kullanıcı, {reason: "Forceban"})
    }
    message.channel.send(`**${kullanıcı}** ID'li kullanıcı artık sunucuya giremeyecek!`).then(message => message.delete(5000))
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['force-ban'],
  permLevel: 0,
};

exports.help = {
  name: 'forceban',
  description: 'Belirtilen üye banlanır ve artık banı kaldırılsa bile sunucuya giremez.',
  usage: 'forceban [id]',
  kategori: 'yetkili'
};