const Discord = require('discord.js');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
const express = require('express');
const client = new Discord.Client();
const app = express();
const chalk = require('chalk');
require("moment-duration-format");
const acarrpc = require('../acar/rpc.json');
const acar = require('../acar/botayarlari.json');
const http = require("http");
   app.get("/", (request, response) => {
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
module.exports = client => {
  // botu internet sitesi ile 7/24 uptime robota bağlamak için yapılan bir etkinlik sistemidir.
  // Uptime Robot sahibi olmak için https://discord.gg/acar sunucusuna gelip .uptime-kayıt yazarak sunucumuz da a.ekle ile botunuzu ekleyebilrisiniz.
};