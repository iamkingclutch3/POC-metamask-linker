const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('wallet')
		.setDescription('Link your metamask wallet')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Link your metamask wallet')
				.addStringOption(option => option.setName('address').setDescription('Enter your metamask wallet adress').setRequired(true))),
		async execute(interaction, client) {
		if(!interaction.member.roles.cache.some(role => role.id === client.config.allowrole)) return await interaction.reply({ content: `This command is only for whitelisted people see <#914258300827213845> for more info.`, ephemeral: true })
		if(client.db.getData(interaction.user.id)){
            return await interaction.reply({ content: "You can only use this command once. If you want to change your linked address create a support ticket.", ephemeral: true })
        } 
		//if(!valid) return await interaction.reply({ content: "This is not a valid ETH adress.", ephemeral: true})
			client.db.writeData(interaction.user.id, interaction.options.getString('address'))
			const embed = new Discord.MessageEmbed()
            .setAuthor({ name: "[New Wallet] " +interaction.user.username+ " has submited his wallet", iconURL: interaction.user.avatarURL()})
            .addField('User', `<@${interaction.user.id}>`, true)
			.addField('ID', interaction.user.id, true)
			.setTimestamp()
            client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
			await interaction.channel.send(`${interaction.user}'s wallet has been added`)
			await interaction.deferReply()
			await interaction.deleteReply()
			return
	},
};