// Noob vars
const Discord = require('discord.js');
const path = require('path')
const fs = require('fs')
const config = require('../config.json');
const commands = new Map()
const bot = new Discord.Client();

// Store the config and commands in variables
bot.config = config
bot.commands = commands

console.log("[Discore] ❱ Loading function")

// Read directories function
fs.readdirSync(path.resolve(__dirname, 'commands'))
    // We filter file's types
    .filter(f => f.endsWith('.js'))

    // Loading loop
    .forEach(f => {
        // Attempt to load the file
        console.log(`[Discore] ❱ Loading command ${f}`)
        try {
            // Require the raw file
            let command = require(`./commands/${f}`)
            // Validate that there's a run function and a valid help object
            if (typeof command.run !== 'function') {
                throw '[Discore] ❱ Command is missing a run function!'
            } else if (!command.help || !command.help.name) {
                throw '[Discore] ❱ Command is missing a valid help object!'
            }
            // Store the command in the map based on its name
            commands.set(command.help.name, command)
        } catch (error) {
            // Log any errors from the validator or from requiring the file
            console.error(`[Discore] ❱ Failed to load command ${f}: ${error}`)
        }
    })

// Ready event
bot.on('ready', () => {
    console.log(`[Discore] ❱ Logged in as ${bot.user.tag} (ID: ${bot.user.id})`)
})

// Message event
bot.on('message', message => {
    var active_captcha = 0;
    // Ignore messages from bots and from DMs
    if (message.author.bot || !message.guild) {
        return
    }

    // Noob var
    let { content } = message

    // Ignore if prefix isn't used
    if (!content.startsWith(config.prefix)) {
        return
    }

    // Command handling + Checking if there's no other verif
    if (message.content.startsWith('~verif') && (active_captcha === 0)) {
        // Noob var
        const good_c = message.guild.channels.cache.find(ch => ch.name === config.captchan);

        // In case it's not in the good channel
        if (message.channel.id !== good_c.id) {
            // Delete command
            message.delete({ timeout : 10 }).catch(console.error);
            return;
        }

        // Delete command
        message.delete({ timeout : 10 }).catch(console.error);

        // Noob vars
        const random_pick = Math.floor(Math.random() * Math.floor(9));
        const c_author = message.author.tag;
        var has_exp = 0;
        var codes = ["057VCX", "W51T5W", "1Z6K2L", "D447ZX", "705SWR", "S2JJ33", "19KVR6", "SJ49I8", "5Z33RC", "281KPT", "70GI0S", "O1HK59", "6ZU11Z", "S1B3I5", "8R5T7L", "857KCZ", "M5E90A", "Q6Y79D", "76SH4T", "O52NI3", "WQ66H5", "J1G5K2", "O06HZ5", "39UHS0", "20Z0FW", "8SK38R", "V7DL26", "ZYP053", "3MHE63"];
        var picked_code = codes[random_pick];
        var attempts = 3;

        // Main embed
        const code_message = new Discord.MessageEmbed()
            .setAuthor(`Captcha code for ❱ ${c_author}`, `${message.author.displayAvatarURL(format = 'png', dynamic = true)}`)
            .setColor(0x3898FF)
            .setDescription(`> 📟 Captcha code ❱ **__${picked_code}__**`)
            .setFooter("Expire dans 30 secondes / Expire in 30 seconds")
        message.channel.send(code_message).then(m => {
            // Expire function
            function expire_code() {
                m.edit(code_message.setAuthor("Captcha code ❱ ❌", `${message.author.displayAvatarURL(format = 'png', dynamic = true)}`).setDescription("``❌ Code expiré / Code has expired``").setColor(0xFF3300).setFooter("Veuillez réessayer / Please try again")).catch(console.error);
                m.delete({ timeout : 10000 }).catch(console.error);
                has_exp++;
            }
     
            // Run above func after 30 secs
            setTimeout(expire_code, 30000);

            // Attempts listener
            bot.on('message', async (msg, user) => {
                // Add an active captcha
                active_captcha++;

                // If time has expired
                if (has_exp !== 0) { return; }

                // If it's not the right person
                if (user.id !== msg.author.id) {
                    msg.delete({ timeout : 10 }).catch(console.error);
                    return;
                }
 
                // If the entered code is wrong
                if (!msg.content.startsWith(picked_code) && user.id === msg.author.id || !msg.content && has_exp !== 0 && attempts !== 1 && user.id === msg.author.id) {
                    // Delete user attempt
                    msg.delete({ timeout : 10 }).catch(console.error);
          
                    // In case there's remaining attempts > Continue + Delete one attempt
                    if (attempts !== 0) {
                        // Remove an attempt
                        attempts = attempts - 1;
                        // We edit the embed
                        m.edit(code_message.setColor(0xFF3300).setDescription(`> 📟 Captcha code ❱ **__${picked_code}__**\n\n> 🛑 Essai(s) / Attempt(s) ❱ **${attempts}/3**`).setFooter("Code entré invalide / Invalid code provided")).catch(console.error);
                    }

                    // In case there's no more attempts > Run expire_code function
                    if (attempts === 0) {
                        // Run expire function
                        expire_code();
                        active_captcha = 0;
                    }
                }

                // If everything is right - Proceed
                if (msg.content.startsWith(picked_code) && has_exp === 0 && attempts !== 0 && user.id === msg.author.id) {
                    // Delete user attempt
                    msg.delete({ timeout : 10 }).catch(console.error);
                    // Edit code embed + Delete with a timeout
                    m.edit(code_message.setAuthor("Captcha code ❱ ✔️", `${msg.author.displayAvatarURL(format = 'png', dynamic = true)}`).setDescription("``✔️ Code validé / Good code``").setColor(0x33FF00).setFooter("Bienvenue sur Waurum / Welcome on Waurum")).catch(console.error);
                    m.delete({ timeout : 10000 }).catch(console.error);
                    // Should add the role addition here
                    active_captcha = 0;
                }   
            })
        })
    }

    // In case there's already an opened captcha
    if (message.content.startsWith('~verif') && (active_captcha !== 0)) {
        message.delete({ timeout : 10 }).catch(console.error);
    }

    // Noob vars
    let split = content.substr(config.prefix.length).split(' ')
    let label = split[0]
    let args = split.slice(1)

    // In case there's a label
    if (commands.get(label)) {
        commands.get(label).run(bot, message, args)
    }
})

// Launch bot if there's a valid token
config.token && bot.login(config.token)