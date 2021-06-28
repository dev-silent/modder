const config = require('./config.json')
const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', async () => {
    console.log('I am online and ready to mod.')
    client.user.setPresence({
        activity: {
          name: 'Chat',
          type: 'WATCHING'
        },
        status: 'dnd'
      })    
    })

client.on('message', async (msg) => {
    if (msg.author.bot) return
    if (!msg.guild) return

    var prefix = config.prefix
    if (!msg.content.toLowerCase().startsWith(prefix)) return

    var args = msg.content.split(' ')
    var cmd = args.shift().slice(prefix.length)

    try {
        var file = require(`./commands/${cmd}.js`)
        file.run(client, msg, args)
    } catch (err) {
        console.warn(err)
    }
})

   

    client.on('messageUpdate', (oldMessage, newMessage) => {
    if (newMessage.content.includes('<@!620708924093628436>')) { //YOUR USER ID HERE
        newMessage.delete()
        return newMessage.reply('you cannot ping this user!')
    }
    const usersMap = new Map();
    const LIMIT = 5;
    const TIME = 7000;
    const DIFF = 3000;
    client.on('message', async(msg) => {
        if(msg.author.bot) return;
        if(usersMap.has(mesmsgsage.author.id)) {
            const userData = usersMap.get(msg.author.id);
            const { lastMsg, timer } = userData;
            const difference = msg.createdTimestamp - lastMsg.createdTimestamp;
            let msgCount = userData.msgCount;
            console.log(difference);
    
            if(difference > DIFF) {
                clearTimeout(timer);
                console.log('Cleared Timeout');
                userData.msgCount = 1;
                userData.lastMsg = msg;
                userData.timer = setTimeout(() => {
                    usersMap.delete(msg.author.id);
                    console.log('Removed from map.')
                }, TIME);
                usersMap.set(msg.author.id, userData)
            }
            else {
                ++msgCount;
                if(parseInt(msgCount) === LIMIT) {
                    let muterole = msg.guild.roles.cache.find(role => role.name === 'Muted');
                    if(!muterole) {
                        try{
                            muterole = await msg.guild.roles.create({
                                name : "Muted",
                                permissions: []
                            })
                            msg.guild.channels.cache.forEach(async (channel, id) => {
                                await channel.createOverwrite(muterole, {
                                    SEND_MESSAGES: false,
                                    ADD_REACTIONS : false
                                })
                            })
                        }catch (e) {
                            console.log(e)
                        }
                    }
                    msg.member.roles.add(muterole);
                    msg.channel.send('You have been muted!');
                    setTimeout(() => {
                        msg.member.roles.remove(muterole);
                        msg.channel.send('You have been unmuted!')
                    }, TIME);
                } else {
                    userData.msgCount = msgCount;
                    usersMap.set(msg.author.id, userData);
                }
            }
        }
        else {
            let fn = setTimeout(() => {
                usersMap.delete(msg.author.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(msg.author.id, {
                msgCount: 1,
                lastMsg : msg,
                timer : fn
            });
        }
    })
})

client.login(config.token)