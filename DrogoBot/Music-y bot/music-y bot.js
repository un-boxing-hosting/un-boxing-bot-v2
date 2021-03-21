const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./pmb-config.json`);
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const { join } = require("path");
//const bot = new Discord.Client();
const fs = require('fs-extra');
const { IncomingMessage } = require('http');
const { ifError } = require('assert');
const hothead = "491611965870047242";
const me = "288484543080562688";
const pidgeonman = "376540589669351424";
const tasks = "708532752722690058";
const hothead2 = "727578483965952060";
const moron = "302374575801630721";
const drogotestguild = "753369508680433697";

(function(){
  var	oldlog = console.log;
  var t = new Date()
  var d = t.getDate();
  var m = t.getMonth();
  var y = t.getFullYear();
  var file = `F:/botlog/Music-y Bot/log-${`${m}-${d}-${y}`}.txt`
  //fs.createFile(file, function(err){console.log(`${err} help me`);});
  var stream = fs.createWriteStream(file, {flags: 'a'})
  console.log = function (message) {
  
    stream.write(message + "\n")
    oldlog.apply(console, arguments);
  };
  
  })();
  client.on("ready", () => {
	console.log('Ready!');
	client.user.setActivity(`"${prefix}help" for help. Currently in  ${client.guilds.cache.size} servers. `, { type: 'WATCHING' , status: 'idle' })
  .then(presence => console.log(`Activity set to "${prefix}help" for help. Currently in  ${client.guilds.cache.size} servers.`))
  .catch(console.error);
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  const user = client.users.cache.get(me);
  const user2 = client.users.cache.get(pidgeonman);
user.send('Bot now online.')
user2.send("Music-y Bot now online")
return;
  });
  client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  const user2 = client.users.cache.get(pidgeonman);
  const user = client.users.cache.get(me);
  user.send(`Music-y Bot has joined ${guild.name}`);
  user2.send(`Music-y Bot has joined ${guild.name}`);
  client.user.setActivity(`"${prefix} for help" `, { type: 'WATCHING' });
  //channel.createInvite()
  //.then(invite => console.log(`Created an invite with a code of ${invite.code}`))
 // .catch(console.error);
  });
  
  client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  const user2 = client.users.cache.get(pidgeonman);
  const user = client.users.cache.get(me);
  user.send(`Music-y Bot has been removed from ${guild.name}`);
  user2.send(`Music-y Bot has been removed from ${guild.name}`);
	client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' });
  });

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});
client.on('message' , async message => {
    if (message.author.bot) return;
    if (message.webhookID) return;
   // if (message.user.id === moron) return;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = message.content.toLocaleLowerCase();
    const mention = message.mentions.users.first();
    const Member = message.member;
      const voicechannel = Member.voice.channel;
      if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Uhh");
         m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
         console.log(message.author.tag + " used the ping command in " + message.guild.name)
      } else if (message.content.startsWith(`${prefix}download`)){
		var arg1 = args[1];
        var arg2 = args[2]
        if (!arg1) return message.channel.send("Did you forget the entire command?")
        if (!arg2) return message.channel.send("You need a name!")
        if (message.content.includes(".mp3")) return message.channel.send("You do not need to add .mp3 to file name, it is already done.");
    var vidurl = await ytdl.getURLVideoID(arg1)

		
		ytdl(arg1, { filter: format => format.container === 'mp4' })
	   .pipe(fs.createWriteStream(`./music/${arg2}.mp3`))
	   .on(`error`, err => {
		   console.log(err)
	   })
		message.channel.send(`vid ${vidurl} saveed as ${arg2}.mp3`)
		console.log(`new vid saved by ${message.author.tag} url ${vidurl} named ${arg2}.mp3`)
		console.log(`https://www.youtube.com/watch?v=`+ vidurl)
	}else if (message.content.startsWith(`${prefix}play`)){
		if (!message.member.voice.channel) return;
        var arg1 = args[1]
    var connection = await message.member.voice.channel.join()
    message.channel.send(`Started playing ${arg1}.mp3`);
    console.log(`${message.author.tag} started playing ${arg1}.mp3 in channel ${message.channel.name} in guild ${message.guild.name}`);
      connection.play(`./music/${arg1}.mp3`)
			.on(`error`, error => {
				console.log(Error)
      })
			.once(`finish`, end =>{
				
				message.member.voice.channel.leave()
      })
      
    }else if (message.content.startsWith(`${prefix}list`)){
    const dir = fs.readdirSync(join("./music")).filter((file) => file.endsWith(".mp3"));
    message.channel.send(dir)
    
    }else if(command.startsWith(`${prefix}help`)){ 
        message.channel.send("**DO NOT ADD .MP3 TO ANY FILE NAME IN THE COMMANDS, IT IS AUTOMATICALLY DONE.** \nMusic-y Bot commands: \n =help \n This command is the one you just ran. \n =list \n This command shows you all of the music on the bot. \n =download (youtube.com link) (file name) \n This command downloads a YouTube video as an MP3 format with the given name set. \n =play (file name) \n This command plays any file in the system. \n =ping \n This command gives you the ping of the bot.")
        console.log(message.author.tag + " used the help command in " + message.guild.name)
    }else if (command.startsWith(`${prefix}unban`)) {

      const buser = args[1]
      const whokick = mention;
      const guild = args[2];
      const guild2 = client.guilds.cache.find(guild)
      if (!message.member.hasPermission(`BAN_MEMBERS`, {
          checkAdmin: true,
          checkOwner: true
        })) return;
      if (!buser) {
        message.channel.send(`pls send a member id to unban`);
        return;
      }
      //let authorhighestrole = message.member.roles.highest.position;
      //let mentionrole = mention.member.roles.highest.position
  
      //if (!mention.kickable){
      //	message.channel.send(`I have no premissions to kick this user`)
      //}
      //buser.send(` you have ben unbanned from ${message.guild.name} for ${reson}`)
      guild2.members.unban(buser)
        .then(() => console.log(`unbanned ${buser} from ${message.guild.name}`))
        .catch(console.error);
      message.channel.send(`unbanned ${buser}`)
    }

    })
client.login(token)