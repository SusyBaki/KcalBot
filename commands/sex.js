const { EmbedBuilder } = require('discord.js');
const { FurryBot } = require('furry-wrapper')

module.exports = {
    name: 'sex',
    description: 'coma alguem',
    execute(message, args) {

        var options

        try {
            FurryBot.yiff.gay(options).then(post => {

                const sexMention = message.mentions.users.map(user => {
                    return user.username
                });
                if (!message.mentions.users.size) {
                    message.channel.send('tag someone grrrrrrrrr')
                } else {
                    HugEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setDescription(`${message.author.username} abateu ${sexMention}`)
                        .setImage(post.url)
                        .setTimestamp()

                    console.log(`user: ${message.author.username}\nuser mention: ${sexMention}`)
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