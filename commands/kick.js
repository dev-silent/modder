const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send('You cannot use this command.')
    const mentionedMember = msg.mentions.members.first()
    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No reason given"
    const kickEmbed = new Discord.msgEmbed()
    .setTitle(`You were kicked from ${msg.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("RED")
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL())

    if(!args[0]) return msg.channel.send('Please do this command again but mention a member!')
    if(!mentionedMember) return msg.channel.send("The member that you may have mentioned is not in the server.")
    try {
      await mentionedMember.send(kickEmbed)
    } catch(err) {
      console.log('I wan unable to message the member stated.')
    }
    try {
      mentionedMember.kick(reason)
    } catch (err) {
      console.log(err);
      msg.channel.send("I was unable to kick the user from the server. (contact dev because this may be a error)")
    }
    msg.channel.send(`${mentionedMember} has been kicked!`)
  }
