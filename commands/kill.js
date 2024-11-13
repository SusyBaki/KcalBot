const { EmbedBuilder } = require("discord.js");



module.exports = {
    name: 'kill',
    description: 'matador de kcalb',
    execute(message, args) {
        try {

            const killMention = message.mentions.users.map(user => {
                return user.username
            });
            const noTarget = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription('sem alvo grrrrr')
                .setImage('https://media.discordapp.net/attachments/794038403360096288/1264626382789546055/colin.gif?ex=669e8e99&is=669d3d19&hm=bffb0ca19a436156e36e5f01c7c135f521a3c2c75a06508c4c2f13051f968d78&=&width=621&height=559')
                .setTimestamp()

            const killEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setDescription(`${message.author.username} matou ${killMention}`)
                .setImage('https://cdn.discordapp.com/attachments/794038403360096288/1264626383263629455/morte.gif?ex=669e8e99&is=669d3d19&hm=f04c60f81af85344d9726c4050c54f32c1195bd133890ce7cd93df8a186fc180&')
                .setTimestamp()

            if (!message.mentions.users.size) {

                message.channel.send({ embeds: [noTarget] })
            } else {

                message.channel.send({ embeds: [killEmbed] });
            }
        } catch (error) {
            console.error(error)
        }
    },
};