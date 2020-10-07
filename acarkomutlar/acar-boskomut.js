const Discord = require("discord.js");
const acarayarlar = require('../acarregister/botayarlari.json');
let acar = require('../acarregister/botayarlari.json');


exports.run = (client, message, args) => {
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "boşkomut",
  description: "ACAR Temiz v11 Altyapı",
  usage: ""
};


exports.acar = {
    acardizini: 'acar-boskomut.js',
    acarprefix: acar.prefix,
};