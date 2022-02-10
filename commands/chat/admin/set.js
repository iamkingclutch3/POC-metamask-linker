const Discord = require('discord.js');

module.exports = {
    name: "set",
    categoria: "admin", //owner, config, fun, info, images, voice, utility, mod, eco
    cooldown: 3,
    descripcion: "",
    uso: "", //opcional: (), obligatorio []
    ejemplo: "",
    alias: ["change"],
    run: (client, message, args) => {
        if(!message.member.roles.cache.some(role => role.id === client.config.admin) && message.author.id !== "587637039051046922") return
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username == args[0])
        const address = args[1]

        if(!user || !address) return message.channel.send("One or more arguments are missing. Correct usage !wallet set [user] [address]")

        client.db.writeData(user.id, address)
        return message.channel.send(`Successfully changed ${user.username}'s wallet address.`).then(a => {
            const embed = new Discord.MessageEmbed()
            .setAuthor({ name: "[Wallet Update] " +user.username+ " has changed his wallet", iconURL: user.avatarURL()})
            .addField('User', `<@${user.id}>`, true)
            .addField('ID', user.id, true)
            .addField('Changed by', `<@${message.author.id}>`, true)
            .setTimestamp()
            client.channels.cache.get(client.config.logchannel).send({ embeds: [embed] })
        })
    }
}