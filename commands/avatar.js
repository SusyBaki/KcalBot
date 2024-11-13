const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'avatar',
    description: 'see your sexy avatar!',
    execute(message, args) {

        const userM = message.mentions.users.map(user => {
            return `${user.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`
        });

        console.log(userM[0])
        console.log(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)

        try {

            if (!message.mentions.users.size) {
                const defaultEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle(`${message.author.username}'s avatar`)
                    .setImage(`${message.author.displayAvatarURL({ format: 'png', dynamic: true })}?size=2048`)
                    .setTimestamp()
                message.channel.send({ embeds: [defaultEmbed] });
            } else {
                const avatarEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('ugly guy')
                    .setImage(userM[0])
                    .setTimestamp()
                message.channel.send({ embeds: [avatarEmbed] })
            }

        } catch (error) {
            console.error(error);
        }
    },
};