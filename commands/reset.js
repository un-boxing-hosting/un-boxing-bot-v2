const db = require('quick.db');
//const { prefix } = require('./mus-config-dev.json');
module.exports = {
	name: 'reset',
    //aliases: ['', ''],
	description: 'reset logging setings',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
	async execute(bot, message, args) {
        var prefix = bot.prefix;
        if (!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`sorry, you need manage channels / manage guild permission to use this!`)
        await db.delete(`loggingchannel_${message.guild.id}`)
        await db.delete(`allenabled_${message.guild.id}`)
       await db.delete(`messagedelete_${message.guild.id}`)
        await db.delete('rolecreate_' + message.guild.id)
        await db.delete('roledelete_' + message.guild.id)
       await db.delete('messagebulkdelete_' + message.guild.id)
       await db.delete('guildmemberremove_' + message.guild.id)
       await db.delete('guildmemberadd_' + message.guild.id)
       await db.delete('guildbanadd_' + message.guild.id)
       await db.delete('guildbanremove_' + message.guild.id)
       await db.delete('emojicreate_' + message.guild.id)
       await db.delete('emojidelete_' + message.guild.id)
        await db.delete('channelcreate_' + message.guild.id)
        await db.delete('channeldelete_' + message.guild.id)
     message.channel.send(`done, cleared all cache for this server. type \`${prefix}help\` to setup again.`)
     }
	
};