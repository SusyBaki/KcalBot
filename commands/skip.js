module.exports = {
    name: 'skip',
    description: 'skip simpson gamer',
    execute(message, args, music){
    if (!message.member.voice.channel) return message.channel.send('entre em um canal de voz seu burro do krl');
    try {
        music.skip(message.member.voice.channel);
    } catch (error) {
        console.error(error);
        throw error;
        }
    }
}
