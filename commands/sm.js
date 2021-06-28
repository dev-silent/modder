const Discord = require('discord.js')
exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return
    if(!args[0]) return msg.reply('You need to specify a time for me to set the slowmode to.')
    if(isNaN(args[0])) return msg.reply('You need to specify a valid time for me to set slowmode to.')
    var time = args[0]

    if(args[0] < 0) return msg.reply('You need to specify a positive number for me to set slowmode to.')
    if(args[0] > 21600) return msg.reply('You need to specify a time that is less than 6 hours (21,600)')
    msg.channel.setRateLimitPerUser(time)

    var embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle(`I have successfully set the slowmode to ${time} hours or seconds!`)
    msg.channel.send(embed)
}