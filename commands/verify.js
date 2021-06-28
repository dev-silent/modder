const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send('I require the manage roles permission.')

    const roles = msg.guild.roles.cache.get('848114102060318753')

    await msg.member.roles.add(roles.id).catch(err => console.log(err))
    msg.delete()
}