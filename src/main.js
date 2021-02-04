// Import libraries
const path = require('path')
const fs = require('fs')
const { Client, Intents } = require('discord.js')

// Let's require a random file
require('.env').config()

// Loading config
const config = (() => {
    // Bot token
    const token = process.env.BOT_TOKEN

    // In case there's no token
    if (!token) {
        console.error('Missing BOT_TOKEN environment variable')
        process.exit(1)
    }

    // In case token is invalid
    if (!/^[a-zA-Z0-9_.-]{59}$/.test(token)) {
        console.error('Invalid bot token!')
        process.exit(1)
    }

    // Bot prefix
    const prefix = process.env.BOT_PREFIX

    // In case there's no prefix
    if (!prefix) {
        console.error('Missing BOT_PREFIX environment variable')
        process.exit(1)
    }

    // We return both token and prefix
    return { token, prefix }
})()

// Storing commands
const commands = new Map()

// Define intents
const intents = new Intents([
    Intents.NON_PRIVILEGED,
    "GUILD_MEMBERS",
]);

// Create the client
const bot = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], ws: { intents }, fetchAllMembers: true, disableEveryone: true })

// Store the config and commands on the bot variable
bot.config = config
bot.commands = commands

// Read directories function
fs.readdirSync(path.resolve(__dirname, 'commands'))
    // We filter file's types
    .filter(f => f.endsWith('.js'))

    // Loading loop
    .forEach(f => {
        // Attempt to load the file
        console.log(`Discore - Loading command ${f}`)
        try {
            // Require the raw file
            let command = require(`./commands/${f}`)
            // Validate that there's a run function and a valid help object
            if (typeof command.run !== 'function') {
                throw 'Command is missing a run function!'
            } else if (!command.help || !command.help.name) {
                throw 'Command is missing a valid help object!'
            }
            // Store the command in the map based on its name
            commands.set(command.help.name, command)
        } catch (error) {
            // Log any errors from the validator or from requiring the file
            console.error(`Failed to load command ${f}: ${error}`)
        }
    })

// Ready event
bot.on('ready', () => {
    // Cool log
    console.log(`Logged in as ${bot.user.tag} (ID: ${bot.user.id})`)

    // Bot's permissions
    bot.generateInvite({ permissions: [
        'ADMINISTRATOR'
    ]}).then(invite => {
        // Logging invitation link
        console.log(`Click here to invite the bot to your guild:\n${invite}`)
    })
})

// Message event
bot.on('message', message => {
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