const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
 //Permission Checking
 if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send('You do not have perms to use this command.')
 if (!msg.guild.me.hasPermission("BAN_MEMBERS")) return msg.channel.send('I do not have perms. :(')

 //Variables
 let reason = args.slice(1).join(" ")
 const mentionedMember = msg.mentions.members.first()

 //Input Checking
 if (!reason) reason = 'No reason given'
 if (!args[0]) return msg.channel.send('You must mention someone to ban.')
 if (!mentionedMember) return msg.channel.send('The member you mentioned is not in the server.')
 if (!mentionedMember.bannable) return msg.channel.send('I cannot ban this user.')

 //Executing
 const banEmbed = new Discord.msgEmbed()
   .setTitle(`You have been banned from ${msg.guild.name}`)
   .setDescription(`Reason: ${reason}`)
   .setColor("RED")
   .setTimestamp()

 await mentionedMember.send(banEmbed).catch(err => console.log(err))
 await mentionedMember.ban({
   days: 7,
   reason: reason,
 }).catch(err => console.log(err)).then(() => msg.channel.send("Banned: " + mentionedMember.user.tag))
}