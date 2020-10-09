const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
let acar = require('../acar/botayarlari.json');
const db = require('quick.db')

exports.run = (client, message, args) => {
  
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}`);
let erkek = bilgi.erkek || 0;
let kiz = bilgi.kiz || 0;
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "teyitlerim",
  description: "ACAR Temiz v11 Altyapı",
  usage: ""
};