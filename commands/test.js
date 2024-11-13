module.exports = {
    name: 'test',
    description: 'Check if the channel is nsfw or sfw',
    execute(message, args) {
        console.log(args)
        const json = args;
        const obj = JSON.parse(JSON.stringify(json));
        console.log(obj.tags)
        message.channel.send(obj.tags);
    },
};

/*module.exports = {
    name: 'channel',
    description: 'Check if the channel is nsfw or sfw',
    execute(message, args) {
        if (!message.channel.nsfw) {
            message.channel.send('this channel is sfw')
            console.log(message.channel)
        } else {
            message.channel.send('this channel is nsfw')
            console.log(message.channel)
        }
    },
};*/