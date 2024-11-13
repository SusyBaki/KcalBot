const { EmbedBuilder } = require('discord.js');
const { FurryBot } = require('furry-wrapper')

module.exports = {
	name: 'kiss',
	description: 'kiss someone',
	execute(message, args) {

        var options

        try{
            FurryBot.furry.kiss(options).then(post => {

                const kissMention = message.mentions.users.map(user => {
                    return user.username
                });
                if (!message.mentions.users.size){
                    message.channel.send('https://tenor.com/view/boy-kisser-gif-27701492')
                } else {
                    HugEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setDescription(`${message.author.username} beijou sem o consentimento de ${kissMention}`)
                        .setImage(post.url)
                        .setTimestamp()

                    console.log(`user: ${message.author.username}\nuser mention: ${kissMention}`)
                    console.log(post)
                    message.channel.send({ embeds: [HugEmbed] });
                }
            })
        } catch (error) {
            console.error(error)
            message.channel.send('Bad request!')
        }
		//message.channel.send('');
	},
};