const db = require('quick.db');
const Discord = require('discord.js');
module.exports = {
    name: 'userjoinrole',
    aliases: ['newuserrole', 'newmemberrole', 'nmrole'],
    description: 'As soon as a user joins the server to asigns a role',
    cooldown: 5,
    usage: 'role id to be givein',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        if (args[0] === `disable`) {
            await db.set(`guildmemberaddrole_` + message.guild.id, 'disabled');
            await db.delete(`joinrole_` + message.guild.id);
            message.channel.send(`new user role disabled`);
        } else {
            await db.set(`guildmemberaddrole_` + message.guild.id, 'enabled');
            await db.set(`joinrole_` + message.guild.id, args[0]);
            message.channel.send(`new user role enabled with role ` + args[0]);
        }


        // await db.set(`guildmemberaddrole_` + message.guild.id, 'enabled')
        //await db.set(`joinrole_` + message.guild.id, )
        //console.log(args[0])
    },
};