// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');
var active_help = 0;

// Help function
exports.run = (bot, msg, args) => {
  // If there's no help menu
  if (active_help === 0) {
    // Delete the command usage
    msg.delete({ timeout : 10 }).catch(console.error);

    // Noob vars
    var cur_pages = 1;
    const m_author = msg.author.id;
    const whois = msg.author.tag;

    // First embed
    const help_embed = new Discord.MessageEmbed()
      .setAuthor(`Help asked by ❱ ${whois}`, `${msg.author.displayAvatarURL(format = 'png', dynamic = true)}`)
      .setTitle('📜 ❱ Help guide')
      .setColor(0x3898FF)
      .setDescription("**__Welcome on my help guide__**\nHere's how the navigation system works :\n")
      .addField("Reaction ❱ ➡️", "> Next page")
      .addField("Reaction ❱ ⬅️", "> Previous page")
      .addField("Reaction ❱ ❌", "> Exit")
      .setFooter("❱ Hit 🆗 to start browsing", config.author_icon)
    msg.channel.send(help_embed).then(c => {
      // Create ➡️ / ⬅️ / ❌ / 🆗 reactions
      c.react('⬅️').catch(console.error);
      c.react('➡️').catch(console.error);
      c.react('❌').catch(console.error);
      c.react('🆗').catch(console.error);

      bot.on('messageReactionAdd', async (reaction, user) => {
        const userId = user.id;
        active_help++;

        // Reaction checking #0 - If it's not the good message the user reacted to
        if (reaction.message.id !== c.id) return;

        // Reaction checking #0 bis - If it's not from the same user or a bot
        if (reaction.message.id === c.id && user.id !== m_author && user.id !== bot.user.id) {
          // Delete the reaction
          await reaction.users.remove(userId).catch(console.error);
        }

        // Reaction checking #1 - If user want to quit
        if (reaction.emoji.name === '❌' && user.id !== bot.user.id && user.id === m_author) {
          // Delete user reaction
          await reaction.users.remove(userId).catch(console.error);
          // Edit embed
          c.edit(help_embed.setFooter('Got it ! Help message will shutdown in 5 seconds...', config.author_icon).setColor(0xFF3300)).catch(console.error);
          // Delete embed
          c.delete({ timeout : 5000 });
          // Re-init current help number
          active_help = 0;
        }

        // Reaction checking #2 - If he didn't accepted with 🆗
        if (reaction.emoji.name === '⬅️' && user.id !== bot.user.id || reaction.emoji.name === '➡️' && user.id !== bot.user.id || reaction.emoji.name !== '🆗' && reaction.emoji.name !== '❌' && user.id !== bot.user.id) {
          await reaction.users.remove(userId).catch(console.error);
          c.edit(help_embed.setFooter(`You have to hit 🆗 reaction first !`, config.author_icon).setColor(0xFF3300)).catch(console.error);
        }

        // Reaction checking #3 - If he accepted the tutorial lol
        if (reaction.emoji.name === '🆗' && user.id !== bot.user.id && user.id === m_author) {
          // We totally delete the first embed
          c.delete({ timeout : 10 });

          // Noob vars | Prevent from changing every single if in the future
          const min = 1;
          const max = 3;
          var approved_react = ["⬅️", "➡️", "❌"];

          const main_embed = new Discord.MessageEmbed()
            .setAuthor(`Help asked by ❱ ${whois}`, `${msg.author.displayAvatarURL(format = 'png', dynamic = true)}`)
            .setColor(0x3898FF)
            .setDescription("**__Administration commands__**")
            .addField("Reaction ❱ ➡️", "> Next page")
            .addField("Reaction ❱ ⬅️", "> Previous page")
            .addField("Reaction ❱ ❌", "> Exit")
            .setFooter(`❱ Page ${cur_pages} / ${max}`, config.author_icon)
          msg.channel.send(main_embed).then(m => {
            // Noob var
            var i;

            // Reaction loop
            for (i = 0; i < approved_react.length; i++) {
              m.react(`${approved_react[i]}`);
            }

            // Reaction listener
            bot.on('messageReactionAdd', async (reaction, user) => {
              var a = 1;
              // Navigation loop
              while (a !== 0) {
                // If it's not the targeted embed
                if (reaction.message.id !== m.id) return;

                // In case nothing is right
                if (user.id === bot.user.id || reaction.message.id === m.id && user.id !== m_author || reaction.emoji.name === '⬅️' && cur_pages === min || reaction.emoji.name === '➡️' && cur_pages === max) {
                  // We delete the reaction + Return nothing
                  await reaction.users.remove(userId).catch(console.error);
                  return;
                }

                // Checking the reaction + Current cur_pages values
                if (reaction.emoji.name === '⬅️' && user.id !== bot.user.id && cur_pages !== min && user.id === m_author) {
                  await reaction.users.remove(userId).catch(console.error);
                  // We go to the previous page
                  --cur_pages;
                }

                // Checking the reaction + Current cur_pages values
                if (reaction.emoji.name === '➡️' && user.id !== bot.user.id && cur_pages !== max && user.id === m_author) {
                  await reaction.users.remove(userId).catch(console.error);
                  // We go to the next page
                  ++cur_pages;
                }

                // Checking the reaction + Current cur_pages values
                if (reaction.emoji.name === '❌' && user.id !== bot.user.id) {
                  await reaction.users.remove(userId).catch(console.error);
                  // We delete the help menu
                  m.edit(main_embed.setFooter('Got it ! Help message will shutdown in 5 seconds...', config.author_icon)).catch(console.error);
                  m.delete({ timeout : 5000 }).catch(console.error);
                  // We re-init the var
                  active_help = 0;
                  a = 0;
                }


                // Help pages
                if (cur_pages === 1) {
                  m.edit(main_embed.setDescription("**__Administration commands__**").setFooter(`❱ Page ${cur_pages} / ${max}`, config.author_icon)).catch(console.error);       
                }

                if (cur_pages === 2) {
                  m.edit(main_embed.setDescription("**__Test commands__**").setFooter(`❱ Page ${cur_pages} / ${max}`, config.author_icon)).catch(console.error);       
                }

                if (cur_pages === 3) {
                  m.edit(main_embed.setDescription("**__Fun commands__**").setFooter(`❱ Page ${cur_pages} / ${max}`, config.author_icon)).catch(console.error);       
                } 
              }           
            })
          });
        }
      })
    })
  }
  // We re-init needed vars to prevent some issues
  active_help = 0;
  cur_pages = 1;

  // If there's already an help menu
  if (active_help !== 0) {
    // Delete the command usage
    msg.delete({ timeout : 10 }).catch(console.error);

    // Send a warning to the user
    msg.channel.send("There's already an help menu which is opened !").then(m => { m.delete({ timeout : 10000 }) });
  }
}

// Help help
exports.help = {
    name: 'help',
    usage: 'help',
    description: 'Provide an help menu. (WIP)'
}