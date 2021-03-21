const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '%';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('MTM is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    if (command === 'help') {
        client.commands.get('help').execute(message, args);

    } else if (command === 'hi') {
        client.commands.get('hi').execute(message, args);
    } else if (command === 'creation') {
        client.commands.get('creation').execute(message, args);
    } else if (command === 'website') {
        client.commands.get('website').execute(message, args);

    }
});





client.login('ODE3NDk3NTYxNDY0MDQ1NTg4.YEKX7w.grPXOIXwNVEirSfizlX2DW-SyYk');