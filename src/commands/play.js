// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('../../ytdl-core');
const queue = new Map();

// prout function
exports.run = (bot, msg, args) => {

    const serverQueue = queue.get(msg.guild.id);

    if (msg.content.startsWith(`${config.prefix}play`)) {
        execute(msg, serverQueue);
        return;
    } else if (msg.content.startsWith(`${config.prefix}skip`)) {
        skip(msg, serverQueue);
        return;
    } else if (msg.content.startsWith(`${config.prefix}stop`)) {
        stop(msg, serverQueue);
        return;
    } else {
        msg.channel.send("You need to enter a valid command!");
    }

    async function execute(message, serverQueue) {
        // Noob vars
        const permissions = voiceChannel.permissionsFor(message.client.user);
        const args = message.content.split(" ");
        const voiceChannel = message.member.voice.channel;

        // Check if author is in a voice channel
        if (!voiceChannel) {
          return message.channel.send("You need to be in a voice channel to play music!");
        }

        // Check if bot has permission to connect
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
          return message.channel.send("I need the permissions to join and speak in your voice channel!");
        }

        // We use ytdl library
        const songInfo = await ytdl.getInfo(args[1]);
        const song = {
          title: songInfo.title,
          url: songInfo.video_url
        };
      
        // In case queue is empty
        if (!serverQueue) {
            // Queue construction
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            };
      
            queue.set(message.guild.id, queueContruct);
      
            queueContruct.songs.push(song);
      
            try {
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                play(message.guild, queueContruct.songs[0]);
            } catch (err) {
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        } else {
            serverQueue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
      
        function skip(message, serverQueue) {
            if (!message.member.voice.channel)
                return message.channel.send("You have to be in a voice channel to stop the music!");
            if (!serverQueue)
                return message.channel.send("There is no song that I could skip!");
            serverQueue.connection.dispatcher.end();
        }
      
        function stop(message, serverQueue) {
            if (!message.member.voice.channel)
                return message.channel.send("You have to be in a voice channel to stop the music!");
            serverQueue.songs = [];
            serverQueue.connection.dispatcher.end();
        }
      
        function play(guild, song) {
            const serverQueue = queue.get(guild.id);
            if (!song) {
                serverQueue.voiceChannel.leave();
                queue.delete(guild.id);
            return;
            }
      
            const dispatcher = serverQueue.connection
                .play(ytdl(song.url))
                .on("finish", () => {
                    serverQueue.songs.shift();
                    play(guild, serverQueue.songs[0]);
                })
                .on("error", error => console.error(error));
                dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
            serverQueue.textChannel.send(`Start playing: **${song.title}**`);
        } 
    }    
}

// Help help
exports.help = {
    name: 'play',
    usage: 'play',
    description: 'Play a song / a youtube video in a voice channel.'
}