// We import Discord
const Discord = require('discord.js');

// Ping function
exports.run = (bot, msg, args) => {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);

    // Noob vars
    let first_ping = Date.now();
    var result = 0;
    const m_author = msg.author.tag;
    var allowed = ["👥 ❱ Member", "💮❱ Retard ++", "👥 ❱ Membre", "🔑 ❱ Admin", "🔰 ❱ Staff", "💎 ❱ Booster", "⭐ ❱ Supporter", "💳 ❱ Customer", "💳 ❱ Client"];
    
    // Looping into the list of allowed roles and constructing the final result
    for (var i=0; i < allowed.length; i++) {
      if (msg.member.roles.cache.some(r => r.name === allowed[i])) { 
        result-1; break; 
      }

      if (!msg.member.roles.cache.some(r => r.name === allowed[i])) { 
        result++;
      }    
    }    

    // In case the user doesn't have a role from the list
    if (result === allowed.length) {
      // Embed
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Requested by ❱ ${m_author}`, `${msg.author.displayAvatarURL(format = 'png', dynamic = true)}`)
        .setTitle("📡 ❱ Ping system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", `> You have to be at least a Member to ping the bot`)
        .setFooter(config.trademark, config.author_icon)
      // Send embed + Delete it with timeout
      return msg.channel.send(embed).then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);    
    }

    // Embed construction
    const ping_message = new Discord.MessageEmbed()
      .setTitle("📡 ❱ Ping system")
      .setAuthor(`Requested by ❱ ${m_author}`, `${msg.author.displayAvatarURL(format = 'png', dynamic = true)}`)
      .setColor(0x3898FF)
      .setDescription("> Please, allow up to 5 seconds for ping calculation...")
      .setFooter(config.trademark, config.author_icon)
    // Send embed
    msg.channel.send(ping_message).then((m) => {
      // Ping and edit function
      function ping_calculation() {
        // Noob vars
        let second_ping = Date.now() - first_ping - 5000;

        // Low ping
        if (second_ping <= 100) {
          m.edit(ping_message.setDescription(`> 🟢 Current ping of the bot is : ${second_ping}ms`).setColor(0x33FF00)).catch(console.error);
          m.delete({ timeout : 10000 }).catch(console.error);
        }

        // Medium ping
        if (second_ping > 100 && second_ping < 250) {
          m.edit(ping_message.setDescription(`> 🟡 Current ping of the bot is : ${second_ping}ms`).setColor(0xFFFF00)).catch(console.error);
          m.delete({ timeout : 10000 }).catch(console.error);
        }

        // High ping
        if (second_ping >= 250 && second_ping < 500) {
          m.edit(ping_message.setDescription(`> 🟠 Current ping of the bot is : ${second_ping}ms`).setColor(0xFF6600)).catch(console.error);
          m.delete({ timeout : 10000 }).catch(console.error);
        }

        // Extreme ping
        if (second_ping >= 500 && second_ping < 1000) {
          m.edit(ping_message.setDescription(`> 🔴 Current ping of the bot is : ${second_ping}ms`).setColor(0xFF3300)).catch(console.error);
          m.delete({ timeout : 10000 }).catch(console.error);
        }

        // Not responding
        if (second_ping >= 1000) {
          m.edit(ping_message.setDescription(`> ⚫️ The bot is not responding at the moment.`).setColor(0x000000)).catch(console.error);
          m.delete({ timeout : 10000 }).catch(console.error);
        }
      }

      // Create timeout for our previous function
      setTimeout(ping_calculation, 5000);    
    })
}

// Status help
exports.help = {
    name: 'ping',
    usage: 'ping',
    description: 'Pings the bot to check its connection speed.'
}