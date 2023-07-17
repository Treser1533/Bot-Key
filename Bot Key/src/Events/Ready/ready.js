const client = require('../../../index')
const { Events } = require('discord.js');

client.on(Events.ClientReady, async () => {
	console.log(`🤖 - [BOT]: Iniciado !`);
	console.log(`---------------SERVER-------------\n✅ - Conectado em ${client.guilds.cache.size} Servidores`)
	console.log(`🤖 - [CONECTADO]: ${client.user.tag}`)
})

