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

