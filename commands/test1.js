const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: 'test1',
    aliases: ['', ''],
    description: '',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        if (args[1] == `true`) {
            const role = args[2];
            const emote = args[3]
            db.set(`reactRole_` + message.guild.id, )

        } else {
            db.get()
        }
    },
};