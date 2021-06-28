const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send('You do not have perms to use this command.')
    if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send('I do not have perms. :(')

    //Variables
    let reason = args.slice(1).join(" ")
    let userID = args[0]

    //Input Checking
    if (!reason) reason = 'No reason given'
    if (!args[0]) return msg.channel.send('You must mention someones id to unban.')
    if (isNaN(args[0])) return msg.channel.send('The ID you said is not a number.')

    //Executing
    msg.guild.fetchBans().then(async bans => {
      if(bans.size == 0) return msg.channel.send('This server has no one banned.')
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return msg.channel.send('The user id is not banned from this server')
      await msg.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err)
        return msg.channel.send('Something went wrong. Dm the bot developer because this may be a error.')
      }).then(() => {
        msg.channel.send(`Successfully unbanned ${args[0]}`)
      })
    })
}