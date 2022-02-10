const Discord = require('discord.js');

module.exports = {
    name: "download",
    descripcion: "Download the txt with all the addresses",
    uso: "",
    ejemplo: "",
    alias: ["txt"],
    run: (client, message, args) => {
        if(!message.member.roles.cache.some(role => role.id === client.config.admin) && message.author.id !== "587637039051046922") return
        const attachment = new Discord.MessageAttachment('./addresses.txt')
        message.channel.send({ files: [attachment] })
    }
}