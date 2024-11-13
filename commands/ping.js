const os = require('node:os');

module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		const sysPing = `cpu type: ${os.machine()}\nfree memory: ${os.freemem()}\nup time: ${os.uptime()}`
		console.log(sysPing);
		message.channel.send(sysPing);
	},
};