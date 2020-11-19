const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./drogobot-config.json`);
const client = new Discord.Client();
const ytdl = require('ytdl-core');
//const bot = new Discord.Client();
const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);
const fs = require('fs-extra');
const hothead = "491611965870047242";
const me = "288484543080562688";
const pidgeonman = "376540589669351424";
const tasks = "708532752722690058";
const hothead2 = "727578483965952060";

(function(){
  var	oldlog = console.log;
  var t = new Date()
  var d = t.getDate();
  var m = t.getMonth();
  var y = t.getFullYear();
  var file = `logs/drogo-logs/logs-${`${m}-${d}-${y}`}-(main).txt`
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
  const user = client.users.cache.get(pidgeonman);
user.send('aahhhhh')
return;
  });
  client.on('messageDelete', async message => {
    // ignore direct messages
    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const deletionLog = fetchedLogs.entries.first();
  
    // Let's perform a coherence check here and make sure we got *something*
    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);
  
    // We now grab the user object of the person who deleted the message
    // Let us also grab the target of this action to double check things
    const { executor, target } = deletionLog;
  
  
    // And now we can update our output with a bit more information
    // We will also run a check to make sure the log we got was for the same author's message
    if (target.id === message.author.id) {
      console.log(`A message by ${message.author.tag} was deleted by ${executor.tag} in ${message.guild.name}.`);
    }	else {
      console.log(`A message by ${message.author.tag} was deleted in ${message.guild.name}, but we don't know by who.`);
    }
  });

  client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`"${prefix} for help" `, { type: 'WATCHING' });
  });
  
  client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' });
  });

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async dmmessage => {
    
    if (!dmmessage.channel.type === 'dm') return;
	if (dmmessage.channel.type === 'dm'){
        if (dmmessage.author.bot) {
          const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmbEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('bot sent dm')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('drogobot', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` sent: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/DrogoLogo.png')
      .addFields(
          //{ name: 'new dm message', value: `${dms}` }, 
          { name:`${dmauthor}`,  value: `.`},
      )
      .setTimestamp()
      .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

	   channel.send(dmbEmbed)
	   console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
	} else {
        
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('new DM')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('drogobot', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` Received: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/DrogoLogo.png')
      .addFields(
          //{ name: 'new dm message', value: `${dms}` }, 
          { name:`by ${dmauthor}`,  value: `.`},
      )
      .setTimestamp()
      .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

	   channel.send(dmEmbed)
	   console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
  }
  }
});

client.on('message' , async message => {
  if (message.author.bot) return;
  if (message.webhookID) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = message.content.toLocaleLowerCase();
  const mention = message.mentions.users.first();
  const Member = message.member;
	const voicechannel = Member.voice.channel;
    var DrogoYT = "https://www.youtube.com/channel/UCz-zElbMg6wpUnqeT7uiz7A"
  if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Uhh");
         m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
         console.log(message.author.tag + " used the ping command in " + message.guild.name)
  }else if (message.content.startsWith(`${prefix}drogoyt`)){
		message.delete().catch(owo=>{});
		const drogoEmbed = new Discord.MessageEmbed()

		.setColor('GREEN')
        .setTitle('click me to sub')
        .setURL(DrogoYT)
        .setAuthor('DrogoBot', 'http://dr.nwpixs.com/media/DrogoLogo.png', 'http://www.unboxingman.com')
        .setDescription(` go sub to Drogoton on yt`)
        .setThumbnail('http://dr.nwpixs.com/media/DrogoLogo.png')
        .addFields(
            //{ name: 'new dm message', value: `${dms}` }, 
            { name:`click the title to go to yt`,  value: `or ${DrogoYT}`},
        )
        .setTimestamp()
        .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

       message.channel.send(drogoEmbed)
       console.log(message.author.tag + " used the DrogoYT command in " + message.guild.name)

	} else if (command.startsWith(`${prefix}gif`)){ 
		   var input = message.content;
       var userInput= input.substr('4');
      if (!userInput) {
          message.channel.send(" you nead a gif")
           
      }  else { Giphy.search ('gifs' , {"q":userInput})
              .then((Response) => {
               var totalresponses = Response.data.length;
               var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
               var Responsefinal = Response.data[Responseindex];
    
                  message.channel.send("",{
                  files: [Responsefinal.images.fixed_height.url]
                  
             })})} 
             console.log(message.author.tag + " used the gif command in " + message.guild.name)
  } else if (command.startsWith(`${prefix}say`)){ 
      if (message.member.hasPermission( 'MANAGE_MESSAGES', { checkAdmin:true, checkOwner: true })){
        var messagesay = message.content;
        var sayMessage= messagesay.substr('4');
        message.delete().catch(O_o=>{});  
        message.channel.send(sayMessage);
        console.log(sayMessage ,"sent by" ,message.author.tag,"in channel ", message.channel.name, "in guild", message.guild.name)
      }  else 
      message.delete().catch(O_o=>{});
      message.channel.send("You don't have permission to run this command.")
      return
  }else if (command.startsWith(`${prefix}restart`)){
      message.channel.send('Restarting...')
      .then(client.user.setActivity("Restarting...", { type: 'PLAYING' }))
      .then(console.log("Restarting..."))
      .then(msg => client.destroy())
      .then(setTimeout(function(){ 
        client.login(token)
        .then(console.log("Done Restarting!"))
     }, 5000));
  }else if (command.startsWith(`${prefix}dm`)){
    if (!message.member.guild.id === `753369508680433697`) return
		const mentionmessage = message.content.slice(4);
		if(mention == null) { return; }
		message.delete();
		mentionmessage.slice(mention);
		mention.send(mentionmessage);
    message.channel.send("done!")
    console.log(`A message was sent from the bot by ${message.author.tag}. "${mentionmessage}"`)

	} else if (command.startsWith(`${prefix}subto`)){
		//message.delete().catch(owo=>{});
	
	/*	const coler =args[1];
		const name = args[2];
		const link = args[3];
		const logo = args[4];
		const idk = coler.toLocaleUpperCase();
	
		const Embed = new Discord.MessageEmbed()

		.setColor(`${idk}`)
        .setTitle('click me to sub')
        .setURL(`${link}`)
        .setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
        .setDescription(` go sub to ${name} on yt`)
        .setThumbnail(`${logo}`)
        .addFields(
            //{ name: 'new dm message', value: `${dms}` }, 
            { name:`click the blue text to go to yt`,  value: `or ${link}`},
        )
        .setTimestamp()
        .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

	   message.channel.send(Embed)
	   console.log(`1${name} 2${link} 3${logo} 4${idk}`)*/
  } else if(command.startsWith(`${prefix}welcome`)){ 
    message.delete()
    message.channel.send("Welcome to the server! My name is DrogoBot and I am cool.")
    console.log(message.author.tag + " used the welcome command in " + message.guild.name)
  } else if(command.startsWith(`${prefix}help`)){ 
   message.channel.send("DrogoBot help menu \n +help is the help command you already ran, dummy! \n +welcome Welcomes people. \n +say Tells the bot to say something in that channel. \n +gif Searches for gifs depending on what follows after the command.")
   console.log(message.author.tag + " used the help command in " + message.guild.name)
  }
   else if(command.startsWith(`${prefix}activity`)){ 
    var input = message.content;
    var userInput= args[1]
    var type = args[2]
    if (!userInput) {
      client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' })
    }
    if (type === `s`){
      var type1 = `STREAMING`
      client.user.setActivity(`gsfgsgfsdgsd`, { type: `STREAMING` })//URL: "https://www.twitch.tv/z1gaming" }) 
      console.log(type1)
      
    }
    if (type === `p`){
      var type2 = `PLAYING`
      client.user.setActivity(`"${userInput}`, { type: `${type2}` }) 
    }
    if (type === `l`){
      var type3 = `LISTENING`
      client.user.setActivity(`"${userInput}`, { type: `${type3}` }) 
      
    }
    if (type === `w`){
      var type4 = `WATCHING`
      client.user.setActivity(`"${userInput}`, { type: `${type4}` }) 
      
    } else if (!type) {

      client.user.setActivity(`"${userInput}`, { type: `CUSTOM_STATUS` }) 
    }
    console.log(`${userInput} ${type}`)
  //}else if(command.startsWith(`${prefix}propose`)){ 
   // message.delete()
   // message.channel.send("<@!280497242714931202>, will you marry me?")
  //  console.log("It happened!")
 // }else if(command.startsWith(`${prefix}fact`)){
  //  message.channel.send("<@!288484543080562688> is better than <@!376540589669351424>. That's true")
   // console.log("DrogoBot be spitting straight facts")
  //}else if(command.startsWith(`${prefix}admin`)){
  //  var input = message.content;
 //   var userInput= args[1]
  }else if(command.startsWith(`${prefix}webhook`)){
    channel.createWebhook('Webhook made by DrogoBot', {
      avatar: 'http://dr.nwpixs.com/media/DrogoLogo.png',
    })
      .then(webhook => console.log(`Created webhook ${webhook}`))
      .catch(console.error);    
  }
    else if(command.startsWith(`${prefix}login`)){ 
    var input = message.content;
    var userInput= args[1]
    if (!userInput) {
      message.channel.send("Please choose a bot.")
      client.login(token)
    }
    if (type === `1`){
      var username = DrogoBot
      message.channel.send(`switching to ${username}`)
console.log(`${client.user.username} switching to DrogoBot.`)
client.destroy      
client.login(token)
    }
    if (type === `2`){
      var username = Devgoton
      message.channel.send(`switching to ${username}`)
      console.log(`${client.user.username} switching to Devgoton.`)
      client.destroy
      client.login(token2)
    }
    console.log(`Bot signed in as ${username}`)
	}else if (message.content.startsWith(`${prefix}vid`)){
   // if (message.member.user.id === pidgeonman || hothead || hothead2) return;
        // if (!message.member.user.id === me) return
		var arg1 = args[1];
		var arg2 = args[2]
		var vidurl = await ytdl.getURLVideoID(arg1)
		
		ytdl(arg1, { filter: format => format.container === 'mp4' })
       .pipe(fs.createWriteStream(`F:/DrogoBotmp3/${arg2}.mp3`));
		message.channel.send(`vid ${vidurl} saveed as ${arg2}.mp3`)
		console.log(`new vid saved by ${message.author.tag} url ${vidurl} named ${arg2}.mp3`)
		console.log(`https://www.youtube.com/watch?v=`+ vidurl)

	}else if (message.content.startsWith(`${prefix}fplay`)){
    //if (message.member.user.id === hothead || hothead2) return;
    // if (!message.member.user.id === me) return
		if (!message.member.voice.channel) return;
		var arg1 = args[1]
		var connection = await message.member.voice.channel.join()
      connection.play(`F:/DrogoBotmp3/${arg1}.mp3`)
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end =>{
				
				message.member.voice.channel.leave()
			}) 
    }
})

client.login(token)