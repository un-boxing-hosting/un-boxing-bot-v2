const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: 'usercounter',
    aliases: ['uc', 'mc'],
    description: '',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        if (!message.member.hasPermission(`MANAGE_CHANNELS`) || !message.member.hasPermission(`MANAGE_GUILD`)) return message.channel.send(`sorry, you need manage channels / manage guild permission to use this!`)

        var embed1 = new Discord.MessageEmbed()
            .setAuthor(`user counter set up`, message.guild.iconURL)
            .setColor('RANDOM')
            .setTitle(`configuration for user counter in ${message.guild.name}\n----------------------`)
            .addFields({
                name: ` send the number with what you whant`,
                value: `example (0)`
            }, {

                name: ` cate channels for users, bots`,
                value: `[1]`
            }, {
                name: ` cate channels for all members (users and bots)`,
                value: `[2]`
            }, {
                name: ` cate channels for all members, users, bots`,
                value: `[3]`
            }, )
        message.channel.send(embed1)
        //var replye = await message.

    }
};