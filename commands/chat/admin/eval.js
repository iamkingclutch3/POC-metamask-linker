const Discord = require('discord.js');
const { inspect } = require('util')

module.exports = {
    name: "eval",
    categoria: "owner",
    descripcion: "Evalua un codigo de JavaScript",
    uso: "eval [codigo]",
    alias: ["toeval", "e"],
    run: async (client, message, args, tools) => {
      if (message.author.id !== '587637039051046922') return;
      const start = Date.now()
      const command = args.join(" ")
      if(!command) return message.channel.send("**You must write a command!**")

      try {
          const evaled = eval(command)
          let words = ["destroy"]
          if(words.some(word => message.content.toLowerCase().includes(word))){
              return message.channel.send("Those words are not allowed!")
          }
          const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Evaluated correctly!")
          .addField(`**📩Type**:`,`\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
          .addField("**📨Evaluated in:**", `\`\`\`yanl\n${Date.now() - start}ms\`\`\``,
          true)
          .addField(`**📥Input**`, `\`\`\`js\n${command}\`\`\``)
          .addField(`**📤Output**`, `\`\`\`js\n${inspect(evaled, {depth: 0})}\`\`\``)

          message.channel.send({ embeds: [embed] })
      } catch (error) {
          const embedfailure = new Discord.MessageEmbed()

          .setColor("RED")
          .addField(`📥Input`, `\`\`\`js\n${command}\`\`\``)
          .addField(`🔴Error`, `\`\`\`js\n${error}\`\`\``)

          message.channel.send({ embeds: [embedfailure] })
      }
    }
  }