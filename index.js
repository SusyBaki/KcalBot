const {	Client, Events, IntentsBitField, Collection	} = require('discord.js');
const fs = require('fs');
const { DisTube } = require('distube');
const { YouTubePlugin } = require ('@distube/youtube')
const { VoiceConnectionStatus } = require('@discordjs/voice');
const play = require('./commands/play.js');
require('dotenv').config();

const bind = process.env.PREFIX

const client = new Client({ intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
	IntentsBitField.Flags.GuildVoiceStates,
    ],
});

client.distube = new DisTube(client, {
	plugins: [
		new YouTubePlugin()
	  ],
	  emitAddListWhenCreatingQueue: true,
	  emitAddSongWhenCreatingQueue: true,
 });

/*
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
		*/
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
	console.log(command.name, command.description)
}

client.on('messageCreate', (message) => {

    if (!message.content.startsWith(bind) || message.author.bot) return;

    const args = message.content.slice(bind.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
	const music = client;

    //command execution
	if (!client.commands.has(command)) return;
	try {
		client.commands.get(command).execute(message, args, music);
	} catch (error) {
		console.error(error);
		message.channel.send('there was an error trying to execute that command!');
	}

});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.DC_API_KEY);
