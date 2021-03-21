const Discord = require('discord.js');
module.exports = {
    name: 'help',
    description: "Embeds!",
    execute(message, args) {
        const newEmbed = new Discord.MessageEmbed()
            .setColor('#660000')
            .setTitle('MTM Commands')
            .setURL('https://methemystical.wixsite.com/my-site')
            .setAuthor('MeTheMystical', 'https://methemystical.wixsite.com/my-site')
            .setDescription('Commands and Tools to use')
            .setThumbnail('https://static.wixstatic.com/media/2dd856_b9a578310fbb4519803ca701a587b422~mv2.png/v1/fill/w_129,h_129,al_c,q_85,usm_0.66_1.00_0.01/2dd856_b9a578310fbb4519803ca701a587b422~mv2.webp')
            .addFields({
                name: 'Regular field title',
                value: 'Some value here'
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true
            }, {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true
            }, )
            .setImage('https://i.imgur.com/wSTFkRM.png')
            .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        message.channel.send(newEmbed);


    }
}