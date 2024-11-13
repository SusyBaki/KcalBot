const wrapper = require('furry-wrapper');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'e6',
    description: 'eta poha kkkkkk',
    execute(message, args) {

        console.log(`query: ${args.join('_')}`)
        bazinga = args.join('_')
        var options
        wrapper.E6.nsfw(bazinga, options).then(post => {
            try {
                if (post === undefined) {
                    message.channel.send(`no results for: ${bazinga}`);
                } else {
                    console.log(post);

                    e621Embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle(`Search: ${bazinga}`)
                        .setURL(`${post.file.url}`)
                        .setAuthor({ name: `Artist: ${post.tags.artist}` })
                        .setDescription(`Description: ${post.description}`)
                        .setThumbnail('https://e621.net/packs/static/main-logo-109ca95d0f436bd372a1.png')
                        .setImage(post.file.url)
                        .setTimestamp()

                    message.channel.send({ embeds: [e621Embed] });
                }
            } catch (error) {
                console.error(error);
                message.channel.send('Whoops, something happened');
            }
        });
    },
};