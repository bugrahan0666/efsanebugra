const Discord = require('discord.js');
let acar = require('../acar/botayarlari.json');
exports.run = async(client, message, args) => {
  if(message.channel.id !== "756263357287366696" ) return message.channel.send("Lütfen komutu kullanmak için <#"+ acar.botkomutkanalid + "> kanalını kullanınız!").then(message => message.delete(3000))
  var kullanabilecekRol = "768476684646744064"; // komutu kullanabilecek rolün id
  if (!message.member.roles.has(kullanabilecekRol) && !message.member.hasPermission("ADMINISTRATOR")) return;
  if(args[0] !== "yükselt" && args[0] !== "düşür") return message.reply(`\`${this.help.name} yükselt/düşür @üye1, üye2, üye3...\``);
  if(!message.mentions.members.first()) return message.reply('Üyeleri belirtmelisin!');
  if(message.mentions.members.some(x => !x.roles.first || !x.hoistRole)) return message.reply('Etiketlediğin üyeler arasında hiç role sahip olmayan üyeler var!');

  let enÜstYetkiliRolü = "756243913324363776"; // en üst yetkili rolünün id
  let enAltYetkiliRolü = "764063639664590871"; // en alt yetkili rolünün id
  let boosterRolü = ""; // sunucu booster rolü varsa idsini girin

  if(args[0] === "yükselt") {
    message.mentions.members.forEach(async x => {
      let yetki = message.guild.roles.filter(a => a.position <= message.guild.roles.get(enÜstYetkiliRolü).position && a.position >= x.hoistRole.position && a.position >= message.guild.roles.get(enAltYetkiliRolü).position && a.name !== "--------------------" && a.hoist && a.id !== boosterRolü).sort((z, y) => z.position-y.position).array();
      try {
          if(x.hoistRole.position < yetki[0].position) {
            x.addRole(yetki[0].id);
            x.addRole("764599941540610048")
            x.addRole("764599940248764456")
          } else if(yetki[1]) {
            x.addRole(yetki[1].id)
            x.removeRole(yetki[0].id)
          };
        message.react("✅")
      } catch(err) { console.log(err) };
    });
  };

  if(args[0] === "düşür") {
    message.mentions.members.forEach(async x => {
      let yetki = message.guild.roles.filter(a => a.position <= x.hoistRole.position && a.position >= message.guild.roles.get(enAltYetkiliRolü).position && a.position <= message.guild.roles.get(enÜstYetkiliRolü).position && a.name !== "--------------------" && a.hoist && a.id !== boosterRolü).sort((z, y) => z.position-y.position).array().reverse();
      try {
          if(yetki[1]) x.addRole(yetki[1].id);
          x.removeRole(yetki[0].id)
        message.react("✅")
      } catch(err) { console.log(err) };
    });
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yetki',
  description: 'Yetki artırma/düşürme sistemi.',
  usage: 'yetki yükselt/düşür @etiketler',
  kategori: 'yetkili'
};