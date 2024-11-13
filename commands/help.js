const fs = require('fs')

module.exports = {
    name: 'help',
    description: 'herp',
    execute(message, args) {

        const commandFiles = fs.readdirSync('/commands').filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`/commands${file}`);
            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            //client.commands.set(command.name, command);
            console.log(command.name, command.description)
            return `${command.name},${command.description}`
        }
        console.log(commandFiles)
        //message.channel.send(commandFiles);
    }
}