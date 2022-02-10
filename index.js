const { Client, Collection } = require('discord.js');
const client = new Client({
  partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
  intents: [
      'GUILDS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS',
      'GUILD_INVITES', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS',
      'GUILD_MESSAGE_TYPING', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES', 'GUILD_WEBHOOKS',
      'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'DIRECT_MESSAGE_TYPING'
  ]
});
const config = require("./config.js");
const fs = require('fs')
const { TextDatabase } = require("@maxisthemoose/text-database");


const TDB = new TextDatabase({
    databaseName: "addresses",
    location: "./addresses.txt",
});

client.config = config
client.commands = new Collection();
client.slashcommands = new Collection();
client.db = TDB

const commandFolders = fs.readdirSync('./commands/chat');


for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/chat/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/chat/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const slashFolders = fs.readdirSync('./commands/slash');


for (const sfolder of slashFolders) {
	const scommandFiles = fs.readdirSync(`./commands/slash/${sfolder}`).filter(file => file.endsWith('.js'));
	for (const sfile of scommandFiles) {
		const scommand = require(`./commands/slash/${sfolder}/${sfile}`);
		client.slashcommands.set(scommand.data.name, scommand);
	}
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}


client.login(config.token);