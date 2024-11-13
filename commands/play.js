module.exports = {
    name: 'play',
    description: 'play simpson gamer',
    execute(message, args, music){
        if (!message.member.voice.channel) return message.channel.send('entre em um canal de voz seu burro do krl');
        music.distube.play(message.member.voice.channel, args.join(" "));
    }
}
