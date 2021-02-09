// We import Discord
const Discord = require('discord.js');
const config = require('../../config.json');
const ytdl = require('ytdl-core');

// prout function
exports.run = (bot, msg, args) => {

    const isInVoice = msg.member.voice.channel;
    if (!isInVoice) {return; }
    if (isInVoice){
        isInVoice.join().then(connection => {
            connection.play('/src/rsc/prout.mp3',{volume:1});
            connection.disconnect(); 
        });
    }
}
// Help help
exports.help = {
    name: 'prout',
    usage: 'prout',
    description: 'Prout connection'
}