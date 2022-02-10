const Discord = require('discord.js');

module.exports = {
    name: "add",
    descripcion: "Link your metamask wallet!",
    uso: "!metamask add [adress]",
    ejemplo: "!metamask 0xb794f5ea0ba39494ce839613fffba74279579268",
    alias: ["metamask"],
    run: (client, message, args) => {
        const address = args[0]
        if(!message.member.roles.cache.some(role => role.id === client.config.allowrole)) return message.channel.send("This command is only for whitelisted people see <#914258300827213845> for more info.")

        if(!address) return message.channel.send("You must write a valid Metamask address.")
        if(client.db.getData(message.author.id) && !message.member.roles.cache.some(role => role.id === client.config.admin) && message.author.id !== "587637039051046922"){
            message.channel.send(`${message.author}, you can only use this command once. If you want to change your linked address create a ticket.`)
        } 
        client.db.writeData(message.author.id, address)
        message.channel.send(`${message.author}'s wallet has been added`).then(b =>{
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: "[New Wallet] " +message.author.username+ " has submited his wallet", iconURL: message.author.avatarURL()})
            .addField('User', `<@${message.author.id}>`, true)
            .addField('ID', message.author.id, true)
            .setTimestamp()
            client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
            message.delete()
            return 
        })
    }
}