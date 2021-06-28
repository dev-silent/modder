const { Discord, msgEmbed } = require("discord.js");

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.channel.send('You do not have perms to use this cmd.')
    if(!msg.guild.me.hasPermission("MANAGE_CHANNELS")) return msg.channel.send('I do not have perms to lock.')

    const role = msg.guild.roles.cache.get('848114102060318753')
    let lockChannel = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0])
    if(!lockChannel) lockChannel = msg.channel;

    await lockChannel.updateOverwrite(role, {
      SEND_MESSAGES: false
    }).catch(err => console.log(err))
    msg.channel.send('I have locked the channel :lock:')
  }