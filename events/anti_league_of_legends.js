const { Events } = require('discord.js');

module.exports = {
	name: Events.LigaDasLendas,
	once: true,
	execute(client, member) {
		if (member.activity.name.Lower() = 'League of Legends'){
            console.log('grrrrrr')
        }
    },
};
