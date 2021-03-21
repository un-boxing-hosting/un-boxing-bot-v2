const Discord = require('discord.js'); 

const client = new Discord.Client(); 

const prefix = '%'; 

client.once('ready', () => { 
    console.log('MTM is online!');

});

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){ 
    const command = require(`./commands/${file}`); 

    client.commands.set(command.name, command);

client.on ('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split (/ +/);
    const command = args.shift().toLowerCase(); 
   
    if (command === 'hello'){
    client.commands.get('hello').execute(message, args);

    } else if (command === 'when'){
      client.commands.get('when').execute(message, args);

    } else if (command === 'tools'){
        client.commands.get('tools').execute(message, args);

    } 

});





































client.login('ODE3NDk3NTYxNDY0MDQ1NTg4.YEKX7w.OsGll3M-92zVzRYnAsznQdyQs1I')}