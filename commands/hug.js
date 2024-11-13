const { EmbedBuilder } = require('discord.js');
const { FurryBot } = require('furry-wrapper')

module.exports = {
    name: 'hug',
    description: 'hug someone',
    execute(message, args) {

        var options

        try {
            FurryBot.furry.hug(options).then(post => {

                const hugMention = message.mentions.users.map(user => {
                    return user.username
                });

                noHugs = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setDescription('tag your BF (Best Friend)')
                    .setImage('https://cdn.discordapp.com/attachments/795374894199341056/1264603364340137984/dance-changed.gif?ex=669e7929&is=669d27a9&hm=4ffb0844631dd3ccc64c701c525530b65c8811c551d38ffbaacb54243221e635&')
                    .setTimestamp()
                if (!message.mentions.users.size) {
                    message.channel.send({ embeds: [noHugs] });
                } else {

                    HugEmbed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setDescription(`${message.author.username} abraçou ${hugMention}`)
                        .setImage(post.url)
                        .setTimestamp()

                    console.log(`user: ${message.author.username}\nuser mention: ${hugMention}`)
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