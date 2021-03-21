const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
  name: 'help1',
  //aliases: ['', ''],
  description: '',
  cooldown: 5,
  usage: '',
  guildOnly: true,
  args: false,
  async execute(bot, message, args) {
    var prefix = bot.prefix;
    if (!message.guild) return message.channel.send(`use this command in a server, not dm!`)
    if (!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`sorry, you need manage channels / manage guild permission to use this!`)
    var embed = new Discord.MessageEmbed()
      .setAuthor(`help`, message.guild.iconURL)

      .setTitle(`configuration for logging bot in ${message.guild.name}\n----------------------`)
      .setColor('RANDOM')
    var y = await db.get(`allenabled_${message.guild.id}`)
    if (y == 'enabled') {
      embed.addField('logging deleted messages [1]', "enabled")
      embed.addField('logging created roles [2]', "enabled")
      embed.addField('logging deleted roles [3]', "enabled")
      embed.addField('logging bulk message deletes [4]', "enabled")
      embed.addField('logging member leaves/user kicks [5]', "enabled")
      embed.addField('logging member joins [6]', "enabled")
      embed.addField('logging guild bans [7]', "enabled")
      embed.addField('logging guild unbans [8]', "enabled")
      embed.addField('logging emoji creations [9]', "enabled")
      embed.addField('logging emoji deletions [10]', "enabled")
      embed.addField('logging channel creations [11]', "enabled")
      embed.addField('logging channel deletions [12]', "enabled")
      embed.addField('logging updated roles [13]', "enabled")
      embed.addField('logging message Update [14]', "enabled")
      embed.addField('logging emoji Update [15]', "enabled")

      embed.addField(`----------------------`, `commands: \n\`${prefix}enable [number]\` - enable the logging for a module\n\`${prefix}enable all\` - enable all logging modules \n \`${prefix}disable [number]\` - disable a logging module \n\`${prefix}disable all\` - disable all logging modules\n \`${prefix}reset\` - refreshes the bots entire cache for the server; everything set to default, with no logging channel`)
      var x = await db.get('loggingchannel_' + message.guild.id)
      if (x == null) embed.addField(`there is no logging channel set up for this server. to set one up, type:`, `\`${prefix}setchannel #channel\``)
      if (x !== null) {
        var y = bot.channels.cache.get(x)
        embed.addField(`----------------------`, `logging channel rn is ${y}. to set up another channel, type **${prefix}setchannel #channel**`)
      }
      embed.setFooter(`any suggestions for the bot or the setting up process? hit me up:\n` + `<@` + `376540589669351424` + `>`)
    } else if (y == "disabled") {
      embed.addField('logging deleted messages [1]', "disabled")
      embed.addField('logging created roles [2]', "disabled")
      embed.addField('logging deleted roles [3]', "disabled")
      embed.addField('logging bulk message deletes [4]', "disabled")
      embed.addField('logging member leaves/user kicks [5]', "disabled")
      embed.addField('logging member joins [6]', "disabled")
      embed.addField('logging guild bans [7]', "disabled")
      embed.addField('logging guild unbans [8]', "disabled")
      embed.addField('logging emoji creations [9]', "disabled")
      embed.addField('logging emoji deletions [10]', "disabled")
      embed.addField('logging channel creations [11]', "disabled")
      embed.addField('logging channel deletions [12]', "disabled")
      embed.addField('logging updated roles [13]', "disabled")
      embed.addField('logging message Update [14]', "disabled")
      embed.addField('logging emoji Update [15]', "disabled")
      embed.addField(`----------------------`, `commands: \n\`${prefix}enable [number]\` - enable the logging for a module\n\`${prefix}enable all\` - enable all logging modules \n \`${prefix}disable [number]\` - disable a logging module \n\`${prefix}disable all\` - disable all logging modules\n \`${prefix}reset\` - refreshes the bots entire cache for the server; everything set to default, with no logging channel`)
      var x = await db.get('loggingchannel_' + message.guild.id)
      if (x == null) embed.addField(`there is no logging channel set up for this server. to set one up, type:`, `\`${prefix}setchannel #channel\``)
      if (x !== null) {
        var y = bot.channels.cache.get(x)
        embed.addField(`----------------------`, `logging channel rn is ${y}. to set up another channel, type **${prefix}setchannel #channel**`)
      }
    } else {

      var x = await db.get('messagedelete_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging deleted messages [1]', "disabled")
      } else {
        embed.addField('logging deleted messages [1]', "enabled")
      }
      var x = await db.get('rolecreate_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging created roles [2]', "disabled")
      } else {
        embed.addField('logging created roles [2]', "enabled")
      }
      var x = await db.get('roledelete_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging deleted roles [3]', "disabled")
      } else {
        embed.addField('logging deleted roles [3]', "enabled")
      }
      var x = await db.get('messagebulkdelete_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging bulk message deletes [4]', "disabled")
      } else {
        embed.addField('logging bulk message deletes [4]', "enabled")
      }
      var x = await db.get('guildmemberremove_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging member leaves/user kicks [5]', "disabled")
      } else {
        embed.addField('logging member leaves/user kicks [5]', "enabled")
      }
      var x = await db.get('guildmemberadd_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging member joins [6]', "disabled")
      } else {
        embed.addField('logging member joins [6]', "enabled")
      }
      var x = await db.get('guildbanadd_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging guild bans [7]', "disabled")
      } else {
        embed.addField('logging guild bans [7]', "enabled")
      }
      var x = await db.get('guildbanremove_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging guild unbans [8]', "disabled")
      } else {
        embed.addField('logging guild unbans [8]', "enabled")
      }
      var x = await db.get('emojicreate_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging emoji creations [9]', "disabled")
      } else {
        embed.addField('logging emoji creations [9]', "enabled")
      }
      var x = await db.get('emojidelete_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging emoji deletions [10]', "disabled")
      } else {
        embed.addField('logging emoji deletions [10]', "enabled")
      }
      var x = await db.get('channelcreate_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging channel creations [11]', "disabled")
      } else {
        embed.addField('logging channel creations [11]', "enabled")
      }
      var x = await db.get('channeldelete_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging channel deletions [12]', "disabled")
      } else {
        embed.addField('logging channel deletions [12]', "enabled")
      }
      var x = await db.get('roleupdate_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging updated roles [13]', "disabled")
      } else {
        embed.addField('logging updated role [13]', "enabled")
      }
      var x = await db.get('messageUpdate_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging message Update [14]', "disabled")
      } else {
        embed.addField('logging message Update [14]', "enabled")
      }
      var x = await db.get('emojiUpdate_' + message.guild.id)
      if (x == null || x == "disabled") {
        embed.addField('logging emoji Updates [15]', "disabled")
      } else {
        embed.addField('logging emoji Updates [15]', "enabled")
      }
      embed.addField(`----------------------`, `commands: \n\`${prefix}enable [number]\` - enable the logging for a module\n\`${prefix}enable all\` - enable all logging modules \n \`${prefix}disable [number]\` - disable a logging module \n\`${prefix}disable all\` - disable all logging modules\n \`${prefix}reset\` - refreshes the bots entire cache for the server; everything set to default, with no logging channel`)
      var x = await db.get('loggingchannel_' + message.guild.id)
      if (x == null) embed.addField(`there is no logging channel set up for this server. to set one up, type:`, `\`${prefix}setchannel #channel\``)
      if (x !== null) {
        var y = bot.channels.cache.get(x)
        embed.addField(`----------------------`, `logging channel rn is ${y}. to set up another channel, type **${prefix}setchannel #channel**`)
      }
    }
    embed.setFooter(`any suggestions for the bot? hit me up:\n` + `<@376540589669351424>`)
    embed.addField(`----------------------\n`, `[bot invite](https://discordapp.com/oauth2/authorize?bot_id=562509947405860889&permissions=8&scope=bot)`)
    message.channel.send(embed)

  },
};