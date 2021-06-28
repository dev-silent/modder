const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if (!msg.member.hasPermission("MANAGE_msgS")) return msg.channel.send('You do not have perms to use this cmd!')
    if (!msg.guild.me.hasPermission("MANAGE_ROLES")) return msg.channel.send('I do not have perms for this cmd.')

    const warnRole1 = msg.guild.roles.cache.find(role => role.name == '[Warning: 1]')
    const warnRole2 = msg.guild.roles.cache.find(role => role.name == '[Warning: 2]')
    const warnRole3 = msg.guild.roles.cache.find(role => role.name == '[Warning: 3]')
    const mentionedMember = msg.guild.members.cache.get(args[0]) || msg.mentions.members.first();
    let punishment = 1;
    let reason = args.slice(2).join(" ")

    if (!warnRole1) await msg.guild.roles.create({
      data: {
        name: '[Warning: 1]',
        color: 'GREY'
      }
    }).catch(err => console.log(err))
    if (!warnRole2) await msg.guild.roles.create({
      data: {
        name: '[Warning: 2]',
        color: 'GREY'
      }
    }).catch(err => console.log(err))
    if (!warnRole3) await msg.guild.roles.create({
      data: {
        name: '[Warning: 3]',
        color: 'GREY'
      }
    }).catch(err => console.log(err))

    if (!args[0]) return msg.channel.send('You need to mention a member to add or remove a warning.')
    if (!mentionedMember) return msg.channel.send('The member mentioned is not in the server.')
    if (!reason) reason = 'No reason provided';


    if (mentionedMember.roles.cache.has(warnRole1.id)) punishment = 2
    if (mentionedMember.roles.cache.has(warnRole2.id)) punishment = 3
    if (mentionedMember.roles.cache.has(warnRole3.id)) punishment = 4

    if (!['add', 'remove'].includes(args[1])) {
      if (punishment == 1) {
        return msg.channel.send(`${mentionedMember.user.tag} has no warnings.`)
      } else if (punishment == 2) {
        return msg.channel.send(`${mentionedMember.user.tag} has 1 warnings.`)
      } else if (punishment == 3) {
        return msg.channel.send(`${mentionedMember.user.tag} has 2 warnings.`)
      } else if (punishment == 4) {
        return msg.channel.send(`${mentionedMember.user.tag} has 3 warnings.`)
      }
    } else {
      if (args[1] == 'add') {
        if (punishment == 1) {
          await mentionedMember.roles.add(warnRole1.id).catch(err => console.log(err))
          return msg.channel.send(`${mentionedMember}, you have been warned, for ${reason}`)
        } else if (punishment == 2) {
          await mentionedMember.roles.add(warnRole2.id).catch(err => console.log(err))
          await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err))
          return msg.channel.send(`${mentionedMember}, you have been warned, for ${reason}`)
        } else if (punishment == 3) {
          await mentionedMember.roles.add(warnRole3.id).catch(err => console.log(err))
          await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err))
          return msg.channel.send(`${mentionedMember}, you have been warned, for ${reason}`)
        } else if (punishment == 4) {
         
        }
      } else if (args[1] == 'remove') {
        if (punishment == 1) {
          return msg.channel.send(`${mentionedMember.user.tag}, has no warnings`)
        } else if (punishment == 2) {
          await mentionedMember.roles.remove(warnRole1.id).catch(err => console.log(err))
          return msg.channel.send(`I removed a warning from ${mentionedMember.user.tag}`)
        } else if (punishment == 3) {
          await mentionedMember.roles.remove(warnRole2.id).catch(err => console.log(err))
          return msg.channel.send(`I removed a warning from ${mentionedMember.user.tag}`)
        } else if (punishment == 4) {
          await mentionedMember.roles.remove(warnRole3.id).catch(err => console.log(err))
          return msg.channel.send(`I removed a warning from ${mentionedMember.user.tag}`)
        }
      }
    }
  }

