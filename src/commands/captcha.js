// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');

// Capcha function
exports.run = (bot, msg, args) => {
  // Channel constant
  const captcha_chan = msg.guild.channels.cache.find(ch => ch.name === config.captchan);

  // If channel is wrong
  if (msg.content.startsWith('~captcha') && msg.channel.id !== captcha_chan.id) {
    // Delete the command
    msg.delete({ timeout : 10 }).catch(console.error);

    const embed = new Discord.MessageEmbed()
      .setAuthor("Captcha by Waurum™️", "https://cdn.discordapp.com/icons/720069155465986134/b6337be18611b607ac9bf61b916e0531.png", "https://discord.gg/ZKEdt6e")
      .setColor(0xFF3300)
      .setDescription(`You must use this command in channel > ${captcha_chan}`)
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      msg.channel.send(embed).catch(console.error).then(m => m.delete({ timeout : 10000 }).catch(console.error));
  }

  // If channel is correct
  if (msg.content.startsWith('~captcha') && msg.channel.id === captcha_chan.id) {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);

    // Noob vars
    const id_d = "295993693440180224";

    // First check - Permission
    if (!msg.member.hasPermission(["ADMINISTRATOR"])) return; 

    // Second check - User
    if (msg.author.id !== id_d) return;


    const embed = new Discord.MessageEmbed()
      .setAuthor("Captcha by Waurum™️", "https://cdn.discordapp.com/icons/720069155465986134/b6337be18611b607ac9bf61b916e0531.png", "https://discord.gg/ZKEdt6e")
      .setColor(0x3898FF)
      .addField(":flag_fr: ❱ Vérification", "> Veuillez entrez la commande ``~verif`` puis recopiez le code qui vous est donné dans les 30 secondes !")
      .addField(":flag_gb: ❱ Verification", "> Please use the ``~verif`` command then copy and send the given code in this channel within next 30 seconds !")
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      msg.channel.send(embed).catch(console.error);
  }
}

// Captcha help
exports.help = {
    name: 'captcha',
    usage: 'captcha',
    description: 'Create a captcha message.'
}