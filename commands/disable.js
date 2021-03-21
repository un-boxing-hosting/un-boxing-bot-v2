const db = require('quick.db');
//const { prefix } = require('./mus-config-dev.json');
module.exports = {
  name: 'disable',
  //aliases: ['', ''],
  description: 'disable s logging for events',
  cooldown: 5,
  usage: 'you need to specify a number with the event u want to not log. type \`${prefix}help\``',
  guildOnly: true,
  args: true,
  async execute(bot, message, args) {
    var prefix = bot.prefix;
    if (!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`sorry, you need manage channels / manage guild permission to use this!`)
    if (!args[0]) return message.channel.send(`you need to specify a number with the event u want to not log. type \`${prefix}help\``)
    var x = await db.get('loggingchannel_' + message.guild.id)
    if (x == null || x == 'none') {
      return message.channel.send(`you haven't set up a logging channel for this guild. type \`${prefix}help\``)
    }
    if (args[0] > 12 || args[0] < 1) return message.reply(`type \`${prefix}help\` and find the number with what event u want to disable logging for`)
    switch (args[0]) {
      case "1":
        await db.set(`messagedelete_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for deleted messages`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "2":
        await db.set(`rolecreate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for created roles`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "3":
        await db.set(`roledelete_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for deleted roles`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "4":
        await db.set(`messagebulkdelete_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for message bulk deletes`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "5":
        await db.set(`guildmemberremove_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging member leaves/user kicks`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "6":
        await db.set(`guildmemberadd_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for new members`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "7":
        await db.set(`guildbanadd_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging banned users`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "8":
        await db.set(`guildbanremove_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging unbanned users`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "9":
        await db.set(`emojicreate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for emoji creations`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "10":
        await db.set(`emojidelete_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for emoji deletions`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "11":
        await db.set(`channelcreate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for channel creations`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "12":
        await db.set(`channeldelete_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for channel deletions`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "13":
        await db.set(`roleupdate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, disabled the logging for role update`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "14":
        await db.set(`messageUpdate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, enabled the logging for message Update`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "15":
        await db.set(`emojiUpdate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok, enabled the logging for emoji Updates`)
        await db.delete(`allenabled_${message.guild.id}`)
        break;
      case "all":
        await db.set(`allenabled_${message.guild.id}`, 'disabled')
        await db.set('roleupdate_' + message.guild.id, 'disabled')
        await db.set(`messagedelete_${message.guild.id}`, 'disabled')
        await db.set('rolecreate_' + message.guild.id, 'disabled')
        await db.set('roledelete_' + message.guild.id, 'disabled')
        await db.set('messagebulkdelete_' + message.guild.id, 'disabled')
        await db.set('guildmemberremove_' + message.guild.id, 'disabled')
        await db.set('guildmemberadd_' + message.guild.id, 'disabled')
        await db.set('guildbanadd_' + message.guild.id, 'disabled')
        await db.set('guildbanremove_' + message.guild.id, 'disabled')
        await db.set('emojicreate_' + message.guild.id, 'disabled')
        await db.set('emojidelete_' + message.guild.id, 'disabled')
        await db.set('channelcreate_' + message.guild.id, 'disabled')
        await db.set('channeldelete_' + message.guild.id, 'disabled')
        await db.set(`messageUpdate_${message.guild.id}`, 'disabled')
        await db.set(`emojiUpdate_${message.guild.id}`, 'disabled')
        message.channel.send(`ok disabled logging for all events in this guild`)
    }
  },
};