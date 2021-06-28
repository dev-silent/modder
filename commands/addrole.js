const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_ROLES")) return msg.channel.send('You do not have permission.')
    //next we define some variables
    const target = msg.mentions.members.first() //member = mentions
    if(!target) return msg.channel.send('No member specified') //when no member is pinged
    const role = msg.mentions.roles.first() // roles = mentions
    if(!role) return msg.channel.send('No role specified') //when no role is specified or pinged
    //now the code!
    await target.roles.add(role) // adding the role to the user
    msg.channel.send(`${target.user.username} has obtained a role`)
}