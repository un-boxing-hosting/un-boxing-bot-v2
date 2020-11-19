const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, y_search, gbltoken, clientid, channelID, nodes } = require('./mus-config-dev.json');
const defaultSettings = require(`./commands/setings.json`)
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const GphApiClient = require('giphy-js-sdk-core');
const search = require('youtube-search');
const GBL = require('gblapi.js');
const fs = require('fs');
const { ErelaClient, Utils } = require('erela.js')
const client = new Discord.Client();
const bot = new Discord.Client();
const Giphy = GphApiClient(GIPHYtoken);
const cooldowns = new Discord.Collection();
const Enmap = require('enmap');
//const fs = require('fs-extra');

(function(){
    var	oldlog = console.log;
    var t = new Date()
    var d = t.getDate();
    var m = t.getMonth();
    var y = t.getFullYear();
    var file = `boxing-logs/logs-${`${m}-${d}-${y}`}.txt`
    //fs.createFile(file, function(err){console.log(`${err} help me`);});
    var stream = fs.createWriteStream(file, {flags: 'a'})
    console.log = function (message) {
    
        stream.write(message + "\n")
        oldlog.apply(console, arguments);
    };
})();


bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
  });
  /*
  const defaultSettings = {
    prefix: "!",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"
  }
  */

bot.on("ready", () => {
    bot.music = new ErelaClient(bot, nodes);
    // Listens to events.
    bot.music.on("nodeConnect", node => console.log("New node connected"));
    bot.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    bot.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
    bot.music.on("queueEnd", player => {
        player.textChannel.send("Queue has ended.")
        bot.music.players.destroy(player.guild.id);
    });
	console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`); 
    bot.user.setActivity(`"${prefix}help" for help`);
    //bot.user.setActivity(`🍰 happy b-day un boxing man 🍰`, { type: `WATCHING`})
  });

  client.on("guildDelete", guild => {
    bot.settings.delete(guild.id);
  });

  bot.on(`guildMemberAdd`, member => {
    bot.settings.ensure(member.guild.id, defaultSettings);
    let welcomeMessage = bot.settings.get(member.guild.id, "welcomeMessage");
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)
    member.guild.channels
    .resolve("name", bot.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
  })

  bot.on('message', async message => {
    if (message.author.bot) return;
    const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
    if (!message.content.startsWith(guildConf.prefix)) return;
    //const voicechannel = Member.voice.channel;
    //const serverQueue = queue.get(message.guild.id);
    const args = message.content.split(/\s+/g);
    const commandName = args.shift().slice(guildConf.prefix.length).toLowerCase();
   
    //const args = message.content.slice(prefix.length).split(/ +/);
    //const commandName = args.shift().toLowerCase();

	const command = bot.commands.get(commandName)
        || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    
    }if (command.args && !args.length) {
    	let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
		    reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

	    return message.channel.send(reply);
     
    }if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
     if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
        
      
    } try {
        command.execute(bot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

  });





  bot.login(token)