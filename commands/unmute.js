const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if (!msg.member.hasPermission("MUTE_MEMBERS")) return msg.channel.send('You do not have perms to use this command.')
    if (!msg.guild.me.hasPermission("MUTE_MEMBERS")) return msg.channel.send('I do not have perms to mute people.')
    let reason = args.slice(1).join(" ")

    const muteRole = msg.guild.roles.cache.get('848267182429175819')
    const memberRole = msg.guild.roles.cache.get('848114102060318753')
    const mentionedMember = msg.mentions.members.first() || msg.guild.members.cache.get(args[0])
    const unmuteEmbed = new Discord.msgEmbed()
      .setTitle(`You have been unmuted in ${msg.guild.name}`)
      .setColor("RED")
      .setTimestamp()


    if(!args[0]) return msg.channel.send('No member stated.')
    if(!mentionedMember) return msg.channel.send('The member stated is not in the server.')
    if(mentionedMember.user.id == msg.author.id) return msg.channel.send('You cannot mute yourself.')
    if(mentionedMember.user.id == client.user.id) return msg.channel.send('You cannot mute me!')
    if(!reason) reason = 'No reason given'
    if(mentionedMember.roles.cache.has(memberRole.id)) return msg.channel.send('This member is already unmuted.')
    if(msg.member.roles.highest.postition <= mentionedMember.roles.highest.postition) return msg.channel.send('You cannot unmute someone that has the same role as you or someone that is higher than you.')

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err))
    await mentionedMember.roles.add(memberRole.id).catch(err => console.log(err).then( msg.channel.send('Error please dm the developer now.')))
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(msg.channel.send('Error please dm the developer now.')))

    msg.channel.send(`Member has been unmuted`)
}