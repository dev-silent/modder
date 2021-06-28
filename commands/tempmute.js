const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send('You do not have perms to use this command.')
    if(!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send('I do not have perms to mute.')
    
    const muteRole = msg.guild.roles.cache.get('848267182429175819')
    const memberRole = msg.guild.roles.cache.get('848114102060318753')
    const mentionedMember = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
    let time = args[1]
    let reason = args.slice(2).join(" ")
    const tempmuteEmbed = new Discord.msgEmbed()
    .setTitle(`You have been muted in ${msg.guild.name}`)
    .addField(`Time: ${time}`, `Reason: ${reason}`)
    .setTimestamp()
  
    if(!args[0]) return msg.channel.send('You must mention a member to tempmute.')
    if(!mentionedMember) return msg.channel.send('The member mentioned is not in the server.')
    if(!mentionedMember.roles.highest.position >= msg.member.roles.highest.position) return msg.channel.send('You cannot mute people in the same role or higher.')
    if(!time) return msg.channel.send('You must mention a time.')
    if(!reason) reason = 'No reason given'

    msg.delete()

    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err))
    await mentionedMember.roles.remove(memberRole.id).catch(err => console.log(err))
    await mentionedMember.send(tempmuteEmbed).catch(err => console.log(err))

    setTimeout(async function () {
      await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err))
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err))
    await mentionedMember.send(`You have been unmuted in ${msg.guild.name}`).catch(err => console.log(err))
    }, ms(time))
}