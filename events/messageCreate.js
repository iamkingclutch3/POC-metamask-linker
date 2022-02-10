module.exports = {
	name: 'messageCreate',
	async execute (message, client, tools) {
        if(message.channel.type === 'DM') return;
        if(message.author.bot) return;

        let prefix = client.config.prefix

        if(!message.content.startsWith(prefix)) return

        const args = message.content.slice(prefix.length + 1).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        let cmd = client.commands.get(command) || client.commands.find((c) => c.alias && c.alias.includes(command))
        if(!cmd) return 

        if (cmd) {
              return cmd.run(client, message, args)
        }
    }
}