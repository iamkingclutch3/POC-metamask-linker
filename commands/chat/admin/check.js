const Discord = require('discord.js');

module.exports = {
    name: "check",
    categoria: "admin", //owner, config, fun, info, images, voice, utility, mod, eco
    cooldown: 3,
    descripcion: "",
    uso: "", //opcional: (), obligatorio []
    ejemplo: "",
    alias: ["get"],
    run: (client, message, args) => {
        if(!message.member.roles.cache.some(role => role.id === client.config.admin) && message.author.id !== "587637039051046922") return

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(user => user.username == args[0])
        if(!user) return message.channel.send("Please, specify the user whose address you want to get.")

        const address = client.db.getData(user.id)
        if(!address) return message.channel.send(`${user.username} does not have a wallet address yet.`)
        message.channel.send(`${user.username}'s wallet address is: \`${address}\``)
    }
}