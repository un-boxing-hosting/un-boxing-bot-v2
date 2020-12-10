const db = require('quick.db');
//const { prefix } = require('./mus-config-dev.json');
module.exports = {
	name: 'setchannel',
    //aliases: ['', ''],
	description: 'sat a channel to logg to',
    cooldown: 5,
    usage: 'please specify the channel, like so: \`${prefix}setchannel #channel\`',
    guildOnly: true,
    args: true,
	async execute(bot, message, args) {
        var prefix = bot.prefix;
    if (!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`sorry, you need manage channels / manage guild permission to use this!`)
    if (!args[0] || args[1]) return message.reply(`please specify the channel, like so: \`${prefix}setchannel #channel\``)
    
    x = message.mentions.channels.first()
    if (!x) return message.channel.send(`please specify the channel, like so: \`${prefix}setchannel #channel\``)
    await db.set(`loggingchannel_${message.guild.id}`, x.id)
        message.channel.send(`ok, logging channel for this guild set to ${x}`)
	},
};