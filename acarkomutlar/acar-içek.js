const Discord = require("discord.js");
const acarayarlar = require('../acar/botayarlari.json');
const acar = require('../acar/botayarlari.json');
exports.run = async (client, message, args) => {
    // Kullanıcının izini ile komutu kullanan kişinin yanına çeker.
    let getUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(getUser.user.bot) return message.reply("Botlar henüz cevap vermeyi bilmiyor, o yüzden çekemezsin.");
    if(getUser.id === message.author.id) return message.reply("Kendinizi çekemezsiniz.");
    if(!getUser) return message.reply("Çekmek istediğin kullanıcıyı bulamadım, bu sunucuda olduğundan emin misin?");
    if(getUser && getUser.presence.status === "offline") return message.reply("Çekmek istediğin kullanıcı **çevrimdışı** görünüyor, **Çevrimiçi, meşgul veya boşta** olan kullanıcılar için bu komutu kullanabilirsin.");
    let authorVC = message.member.voiceChannel;
    if(!authorVC) return message.reply("Birini çekmeden önce çekmek istediğin kanala girmen gerekiyor.");
    let getUserVC = getUser.voiceChannelID;
    if(!getUserVC) return message.reply(`Kullanıcıyı çekebilmen için herhangi bir odada bulunması gerekiyor.`);
    if(authorVC.id === getUserVC) return message.reply("Zaten aynı kanaldasınız.");
    if(getUserVC) {
        message.channel.send(`<@${getUser.id}>, <@${message.author.id}> sizi **${authorVC.name}** kanalına çekmek istiyor. **evet** yazarak kabul edebilir ve ya **hayır** yazarak reddedebilirsiniz. `)
        message.channel.awaitMessages(m => m.author.id == getUser.id,
            {max: 1, time: 30000}).then(collected => {
          if (collected.first().content.toLowerCase() == 'evet') {
                         getUser.setVoiceChannel(authorVC).then((msg) => {
                             message.channel.send(`<@${getUser.id}>, <@${message.author.id}> tarafından  **${authorVC.name}** kanalına çekildi.`);
                             msg.delete(2000);
                         }) 
                    }
                    else
                            message.reply('Reddedildin.');      
                            message.delete(30000);
            }).catch(() => {
                    message.reply('30 saniye boyunca cevap vermediği için işlem iptal edildi.').then(msg => {
                        msg.delete(30000);
                    });
            });
    }
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['çek'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'çek',
    description: 'İstediğiniz kişiyi odanıza çeker.',
    usage: 'move [kullanıcı]'
  };

exports.acar = {
    acardizini: 'acar-içek.js',
    acarprefix: acar.prefix,
};