const Discord = require('discord.js')

exports.run = async(client, msg, args) => {
    if (msg.author.id !== '620708924093628436') return msg.channel.send("You do not have permission to use this command!");
    const embed = new msgEmbed()
        .setTitle('Evaluating...')
    const msg = await msg.channel.send(embed);
    try {
        const data = eval(args.join(' ').replace(/```/g, ''));
        const embed = new msgEmbed()
            .setTitle('output:')
            .setDescription(await data)
        .setColor('GREEN')
        await msg.edit(embed)
        await msg.react('✅')
        await msg.react('❌')
        const filter = (reaction, user) => (reaction.emoji.name === '❌' || reaction.emoji.name === '✅') && (user.id === msg.author.id);
        msg.awaitReactions(filter, { max: 1 })
            .then((collected) => {
                collected.map((emoji) => {
                    switch (emoji._emoji.name) {
                        case '✅':
                            msg.reactions.removeAll();
                            break;
                        case '❌':
                            msg.delete()
                            break;
                    }
                })
            })
    } catch (e) {
        const embed = new msgEmbed()
            .setTitle('error')
            .setDescription(e)
            .setColor("#FF0000")
        return await msg.edit(embed);
    }
}