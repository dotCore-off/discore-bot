// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');

// Love function
exports.run = (bot, msg, args) => {
    // Noob vars
    var loved = msg.mentions.users.first();

    // Love system - If no user is mentioned
    if (!loved) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("❤️ ❱ Love system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You must mention a user")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed) 
      .then(m => { m.delete({ timeout : 10000 }) });
    }

    // Love system - If mentioned user = author
    if (msg.author.id === loved.id) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("❤️ ❱ Love system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> Egocentric ❱ Level Up !")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed) 

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });
    }

    // Noob vars
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "❤️".repeat(loveIndex) + "🖤".repeat(10 - loveIndex);

    // Delete the command
    msg.delete({ timeout : 10 });

    // Love embed
    const embed = new Discord.MessageEmbed()
      .setAuthor(`❤️ ❱ Love system`,`${loved.displayAvatarURL(format = 'png', dynamic = true)}`)
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      .setColor("#BE56CA")
      .addField(`Wow, ${loved.tag} loves ${msg.member.displayName} this much :`,
      `> 💟 ❱ ${Math.floor(love)}%\n\nLove rate : ${loveLevel}`);

    // Send + Delete with timer
    msg.channel.send(embed).then(m => { m.delete({ timeout : 20000 }) });;
}

// Love help
exports.help = {
    name: 'love',
    usage: 'love',
    description: 'Test your love with others.'
}