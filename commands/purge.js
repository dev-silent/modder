const { Discord, msgEmbed } = require("discord.js");

exports.run = async(client, msg, args) => {
    if(!args[0]) return msg.channel.send('Please specify a number of msgs to delete ranging from 1 - 99')
    if(isNaN(args[0])) return msg.channel.send('Numbers are only allowed')
    if(parseInt(args[0]) > 99) return msg.channel.send('The max amount of msgs that I can delete is 99')
    await msg.channel.bulkDelete(parseInt(args[0]) + 1)
        .catch(err => console.log(err))
    msg.channel.send('Deleted ' + args[0]  + " messages.")

    msg.delete()
}