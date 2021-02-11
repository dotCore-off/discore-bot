// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');

// Avatar function
exports.run = (bot, msg, args) => {
  var avatar = msg.author;

  // Delete command
  msg.delete({ timeout : 10 }).catch(console.error);

  // Create Embed
  const embed = new Discord.MessageEmbed()
    .setTitle(":kissing_heart: ❱ Avatar system.")
    .setColor(0x3898FF)
    .setDescription(`${avatar} ❱ Voici votre pp`)
    .setImage(`${avatar.displayAvatarURL(format = 'gif, png', size = 1024)}`)
  msg.channel.send(embed).catch(console.error).then(m => { m.delete({ timeout : 10000 }) });   
}

// Avatar help
exports.help = {
    name: 'avatar',
    usage: 'avatar',
    description: 'send the avatar'
}