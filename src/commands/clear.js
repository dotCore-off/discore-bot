// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');

// Clear function
exports.run = (bot, msg, args) => {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);
    
    // Noob vars
    const args_com = msg.content.split(' ').slice(1);
    const amount = args_com.join(' ');

    // If no amount is given
    if (!amount) {
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🧼 ❱ Clear system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You must enter an amount")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);    
    }

    // If given amount isn't a number
    if (isNaN(amount)) {
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🧼 ❱ Clear system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You must enter a valid number")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });      
    }

    // If amount is above the Discord API limit
    if (amount > 100) {
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🧼 ❱ Clear system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You can't delete more than 100 messages")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);      
    }

    // If the amount is not pertinent
    if (amount < 1) {
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🧼 ❱ Clear system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You have to delete at least 1 message")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);      
    }

    // Delete function
    msg.channel.messages.fetch({ limit: amount }).then(msg.channel.bulkDelete(amount)).catch(console.error);

    // Embed
    const embed = new Discord.MessageEmbed()
      .setTitle("🧼 ❱ Clear system")
      .setColor(0x33FF00)
      .addField("``✔️ Clear done !``", `> You have deleted ${amount} messages !`)
      .setFooter(config.trademark, config.author_icon)
    msg.channel.send(embed).catch(console.error)

    // Delete embed
    .then(m => { m.delete({ timeout : 5000 }) }).catch(console.error);
}

// Clear help
exports.help = {
    name: 'clear',
    usage: 'clear',
    description: 'Clear Discord messages.'
}