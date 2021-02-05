// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');

// Kick function
exports.run = (bot, msg, args) => {
  // Kick - Command + Aliases handling
  if (msg.content.startsWith('~kick') || msg.content.startsWith('~k')) {

    // Kick - Permission checking
    if (!msg.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("⛔️ ❱ Kick system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You don't have the permission")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });
    }

    // Noob vars
    const args = msg.content.split(' ').slice(1);
    const user = msg.mentions.users.first();
    const reason = args.slice(1).join(' ');
    let kickMember = msg.mentions.members.first()
  
    // Kick - No mention
    if (!user) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("⛔️ ❱ Kick system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You must mention a user")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });
    }

    // Kick - No reason
    if (!reason) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("⛔️ ❱ Kick system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You must put a reason")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });
    }
    
    // Kick - User is higher
    if (!kickMember) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("⛔️ ❱ Kick system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> You can't kick this user")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });
    }

    // Kick - Bot doesn't have the permission
    if (!msg.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) {
      // Delete command
      msg.delete({ timeout : 10 });

      // Embed
      const embed = new Discord.MessageEmbed()
        .setTitle("⛔️ ❱ Kick system")
        .setColor(0xFF3300)
        .addField("``❌ An error occured !``", "> I don't have the permission")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
      return msg.channel.send(embed)

      // Delete embed
      .then(m => { m.delete({ timeout : 10000 }) });
    }

    // MAIN PROGRAM - KICK SYSTEM

    // Delete command
    msg.delete({ timeout : 10 });

    // Embed + Reactions
    const embed = new Discord.MessageEmbed()
        .setTitle("⛔️ ❱ Kick system")
        .setColor(0x3898FF)
        .setDescription(`Do you want to kick ❱ __${kickMember.user.tag}__ ?`)
        .addField("``❱ ✅ | ❌``", "> Yes | No")
        .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
    // Send the embed + Add reactions
    msg.channel.send(embed).then(c => {
      // Create ✅ reaction
      c.react('✅').then(() => {
        // Then create ❌ reaction
        c.react('❌')
        
        // Reactions checking
        bot.on('messageReactionAdd', (reaction, user) => {

          // Reaction checking #1
          if (reaction.message.id !== c.id) return;

          // Reaction checking #2 + Kick
          if (reaction.emoji.name === '✅' && user.id !== bot.user.id && user.id === message.author.id) {
            // Delete embed
            c.delete()    
            
            // Kick member
            var kickm = message.mentions.members.first();
            kickm.kick();

            const embeded = new Discord.MessageEmbed()
              .setTitle("⛔️ ❱ Kick system")
              .setColor(0x33FF00)
              .setDescription(`**__${kickMember.user.tag}__** ❱ Successfully kicked.`)
              .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
            // Send embed + Delete it
            message.channel.send(embeded).then(m => { m.delete({ timeout : 10000 }) });

            // Log embed
            let embed = new Discord.MessageEmbed()
              .setAuthor(`${kickMember.user.tag} ❱ Kick Logs`,`${kickMember.user.displayAvatarURL(format = 'png', dynamic = true)}`)
              .setColor(0x3898FF)
              .addField("🛑 ❱ Kicked member :", kickMember.user)
              .addField("⚙️ ❱ Kicked by :", message.author)
              .addField("📜 ❱ Reason :", reason)
              .addField("📆 ❱ Date :", message.createdAt.toLocaleString())
              .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
            // Log channel
            const channel = message.guild.channels.cache.find(ch => ch.name === '📟┃logs-waurum');
            // Send log embed
            channel.send(embed)
          
          // If kick is canceled
          } else if (reaction.emoji.name === '❌' && user.id !== bot.user.id && user.id === msg.author.id) {
            // Delete embed
            c.delete()

            // Lil message
            msg.channel.send(`⛔️ ❱ Kick of ${kickMember} has been canceled.`)

            // Delete embed
            .then(m => { m.delete({ timeout : 6000 }) });
          }
        })
      })
    })
  }
}

// Kick help
exports.help = {
    name: 'kick',
    usage: 'kick',
    description: 'Kick a guild member.'
}