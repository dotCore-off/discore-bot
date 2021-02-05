// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');

// Ban function
exports.run = (bot, msg, args) => {
    // Ban - Permission checking
    if (!msg.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
        // Delete command
        msg.delete({ timeout : 10 }).catch(console.error);

        // Embed
        const embed = new Discord.MessageEmbed()
            .setTitle("🛑 ❱ Ban system")
            .setColor(0xFF3300)
            .addField("``❌ An error occured !``", "> You don't have the permission")
            .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
        return msg.channel.send(embed).catch(console.error)

        // Delete embed
        .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
    }

    // Noob vars
    const args = msg.content.split(' ').slice(1);
    const user = msg.mentions.users.first();
    const reason = args.slice(1).join(' ');
    let banMember = msg.mentions.members.first()

    // Ban - No mention
    if (!user) {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);

    // Embed
    const embed = new Discord.MessageEmbed()
      .setTitle("🛑 ❱ Ban system")
      .setColor(0xFF3300)
      .addField("``❌ An error occured !``", "> You must mention a user")
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
    return msg.channel.send(embed).catch(console.error)

    // Delete embed
    .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
  }

  // Ban - No reason
  if (!reason) {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);

    // Embed
    const embed = new Discord.MessageEmbed()
      .setTitle("🛑 ❱ Ban system")
      .setColor(0xFF3300)
      .addField("``❌ An error occured !``", "> You must put a reason")
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
    return msg.channel.send(embed).catch(console.error)

    // Delete embed
    .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
  }
  
  // Ban - User is higher
  if (!banMember) {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);

    // Embed
    const embed = new Discord.MessageEmbed()
      .setTitle("🛑 ❱ Ban system")
      .setColor(0xFF3300)
      .addField("``❌ An error occured !``", "> You can't ban this user")
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
    return msg.channel.send(embed).catch(console.error)

    // Delete embed
    .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
  }

  // Ban - Bot doesn't have the permission
  if (!msg.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
    // Delete command
    msg.delete({ timeout : 10 }).catch(console.error);

    // Embed
    const embed = new Discord.MessageEmbed()
      .setTitle("⛔️ ❱ Ban system")
      .setColor(0xFF3300)
      .addField("``❌ An error occured !``", "> I don't have the permission")
      .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
    return msg.channel.send(embed).catch(console.error)

    // Delete embed
    .then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);
  }

  // MAIN PROGRAM - BAN SYSTEM

  // Delete command
  msg.delete({ timeout : 10 }).catch(console.error);

  // Embed + Reactions
  const embed = new Discord.MessageEmbed()
      .setTitle("🛑 ❱ Ban system")
      .setColor(0x3898FF)
      .setDescription(`Do you want to ban ❱ __${banMember.user.tag}__ ?`)
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

        // Reaction checking #2 + Ban
        if (reaction.emoji.name === '✅' && user.id !== bot.user.id && user.id === msg.author.id) {
          // Delete embed
          c.delete().catch(console.error)   
          
          // Ban member
          var banm = msg.mentions.members.first();
          banm.ban().catch(console.error);

          const embeded = new Discord.MessageEmbed()
            .setTitle("🛑 ❱ Ban system")
            .setColor(0x33FF00)
            .setDescription(`**__${banMember.user.tag}__** ❱ Successfully banned.`)
            .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
          // Send embed + Delete it
          msg.channel.send(embeded).then(m => { m.delete({ timeout : 10000 }) }).catch(console.error);

          // Log embed
          let embed = new Discord.MessageEmbed()
            .setAuthor(`${banMember.user.tag} ❱ Ban Logs`,`${banMember.user.displayAvatarURL(format = 'png', dynamic = true)}`)
            .setColor(0x3898FF)
            .addField("🛑 ❱ Banned member :", banMember.user)
            .addField("⚙️ ❱ Banned by :", msg.author)
            .addField("📜 ❱ Reason :", reason)
            .addField("📆 ❱ Date :", msg.createdAt.toLocaleString())
            .setFooter("Made by dotCore 💙", "https://cdn.discordapp.com/avatars/295993693440180224/d4639de8d379af5c4b3e7e46c03dd192.png")
          // Log channel
          const channel = msg.guild.channels.cache.find(ch => ch.name === '📟┃logs-waurum');
          // Send log embed
          channel.send(embed).catch(console.error)
        
        // If ban is canceled
        } else if (reaction.emoji.name === '❌' && user.id !== bot.user.id && user.id === msg.author.id) {
          // Delete embed
          c.delete().catch(console.error)

          // Lil message
          msg.channel.send(`🛑 ❱ Ban of ${banMember} has been canceled.`).catch(console.error)

          // Delete embed
          .then(m => { m.delete({ timeout : 6000 }) }).catch(console.error);
        }
      })
    })
  })
}

// Ban help
exports.help = {
    name: 'ban',
    usage: 'ban',
    description: 'Ban a guild member.'
}