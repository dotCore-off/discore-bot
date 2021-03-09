// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');
const colors = require('../../colors.json');

// Announce function
exports.run = (bot, msg, args) => {
    // Delete command
    msg.delete({ timeout: 10 }).catch(console.error);
          
    // Noob vars
    const args_com = msg.content.split(' ').slice(0);
    const content = args_com.slice(4).join(' ');
    const g_channel = args_com[1];
    const a_channel = bot.channels.cache.get(`${g_channel}`);
    const cName = args_com[2];
    const timer = args_com[3];
    var d = new Date,
    dformat = [d.getMonth()+1,
      d.getDate(),
      d.getFullYear()].join('/')+' '+
      [d.getHours(),
      d.getMinutes(),
      d.getSeconds()].join(':');
          
    if (!g_channel) { 
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🔔 ❱ Announcement system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> Please, provide a channel ID")
        .addField("``✔️ Command syntax :``", "> ~announce **ChannelID** **ColorName** **TimeInSeconds** **Content**")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)
          
      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
    }

    if (!cName) { 
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🔔 ❱ Announcement system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> Please, provide an hexadecimal color code")
        .addField("``✔️ Command syntax :``", "> ~announce **ChannelID** **ColorName** **TimeInSeconds** **Content**")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)
          
      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
    }

    if (!timer) { 
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🔔 ❱ Announcement system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> Please, provide a timer")
        .addField("``✔️ Command syntax :``", "> ~announce **ChannelID** **ColorName** **TimeInSeconds** **Content**")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)
          
      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
    }   

    if (!content) { 
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🔔 ❱ Announcement system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> Please, provide a message content")
        .addField("``✔️ Command syntax :``", "> ~announce **ChannelID** **ColorName** **TimeInSeconds** **Content**")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)
          
      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
    }
          
    if (!msg.member.hasPermission(["ADMINISTRATOR"])) { 
      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("🔔 ❱ Announcement system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You don't have the right permission to use this")
        .setFooter(config.trademark, config.author_icon)
      return msg.channel.send(embed).catch(console.error)
          
      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
    }

    // Logs embed    
    const logs_embed = new Discord.MessageEmbed()
      .setAuthor("Waurum - Announcement", "https://cdn.discordapp.com/avatars/788195332630511628/6bae2b5d4380d6963cecc9f2bb5865b2.png", "https://discord.gg/ZKEdt6e")
      .setColor(0x33FF00)
      .setDescription("An announcement is planned !")
      .addField("Made by :", `${msg.author}`)
      .addField("Requested channel :", `${a_channel}`)
      .addField("Embed color :", `${cName}`)
      .addField("Posted at :", `${dformat}`)
      .addField("Will be posted in :", `${timer} seconds`)
      .setFooter(config.trademark, config.author_icon)
      const logs_channel = msg.guild.channels.cache.find(ch => ch.name === config.logschan);

    // Logs edition function
    function logs_edition() {
        msg.edit(logs_embed.setDescription("This announce has been posted !").setColor("0xFF3300")).catch(console.error);
    }    
    
    // Send logs
    logs_channel.send(logs_embed).then(setTimeout(logs_edition, timer)).catch(console.error); 
    
    // Send announcement function
    function send_announce() {
      const embed = new Discord.MessageEmbed()
        .setAuthor("Waurum - Announcement", "https://cdn.discordapp.com/avatars/788195332630511628/6bae2b5d4380d6963cecc9f2bb5865b2.png", "https://discord.gg/ZKEdt6e")
        .setColor(colors.cName)
        .setDescription(`${content}`)
        .setFooter(config.trademark, config.author_icon)
      a_channel.send(embed).catch(console.error);
    }

    // Milliseconds to Seconds
    var m_timer = timer * 1000;
          
    // Run both functions
    setTimeout(send_announce, m_timer);
}

// Announce help
exports.help = {
    name: 'announce',
    usage: 'announce',
    description: 'Create an embed in a selected channel through the bot.'
}