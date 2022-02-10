const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs')
const path = require('path');
const dirPath = path.resolve(__dirname, '../commands/slash');
const { token, clientId, serverId } = require('../config')

const commands = [];

const slashFolders = fs.readdirSync(dirPath);


for (const sfolder of slashFolders) {
	const scommandFiles = fs.readdirSync(`${dirPath}/${sfolder}`).filter(file => file.endsWith('.js'));
	for (const sfile of scommandFiles) {
		const scomando = require(`${dirPath}/${sfolder}/${sfile}`);
		commands.push(scomando.data.toJSON())
	}
}

const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, serverId))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, serverId)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
