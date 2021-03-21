const Discord = require('discord.js');
const { prefix, token, /*GIPHYtoken,*/ channelID } =require(`./DBE-config.json`);
const client = new Discord.Client();
//const bot = new Discord.Client();
/*const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);*/
//const fs = require('fs-extra');

/*(function(){
  var	oldlog = console.log;
  var t = new Date()
  var d = t.getDate();
  var m = t.getMonth();
  var y = t.getFullYear();
  var file = `F:/botlog/dbe/log-${`${m}-${d}-${y}`}.txt`
  //fs.createFile(file, function(err){console.log(`${err} help me`);});
  var stream = fs.createWriteStream(file, {flags: 'a'})
  console.log = function (message) {
  
    stream.write(message + "\n")
    oldlog.apply(console, arguments);
  };
  
  })();*/

client.on("ready", () => {
	console.log('Ready!');
	client.user.setActivity(`someone attractive... <3 `, { type: 'WATCHING' })
  .then(presence => console.log(`someone attractive... <3`))
  .catch(console.error);
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
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
      console.log(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
    }	else {
      console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
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
      .setAuthor('DBE', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
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
      .setAuthor('DBE', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
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
    // add message as a parameter to your callback function
    /*client.on('message', function(message) {
        // Now, you can use the message variable inside
        if (message.content === `${prefix}loop` { 
            var interval = setInterval (function () {
                // use the message's channel (TextChannel) to send a new message
                message.channel.send("<@288484543080562688> is so cool!")
                .catch(console.error); // add error handling here
            }, 1 * 6); //6000
        } 
    })*/

client.on('message' , async message => {
  if (message.author.bot) return;
  if (message.webhookID) return;
  if (!message.member.user.id === me) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = message.content.toLocaleLowerCase();
  const mention = message.mentions.users.first();
  const Member = message.member;
    const voicechannel = Member.voice.channel;




    
if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Ping?");
         m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
  }/* else if (command.startsWith(`${prefix}gif`)){ 
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
            }*/ else if (command.startsWith(`${prefix}say`)){ 
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
		const mentionmessage = message.content.slice(4);
		if(mention == null) { return; }
		message.delete();
		mentionmessage.slice(mention);
		mention.send(mentionmessage);
    message.channel.send("done!")
    console.log(`A message was sent from the bot by ${message.author.tag}. "${mentionmessage}"`)

	} else if (command.startsWith(`${prefix}subto`)){
		message.delete().catch(owo=>{});
	
		const coler =args[1];
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
	   console.log(`1${name} 2${link} 3${logo} 4${idk}`)
  } else if(command.startsWith(`${prefix}welcome`)){ 
    message.delete()
    message.channel.send("Welcome to the server! My name is DBE and I am cool.")
  } else if(command.startsWith(`${prefix}help`)){ 
   message.channel.send("DBE help menu \n +help is the help command you already ran, dummy! \n +welcome Welcomes people. \n +say Tells the bot to say something in that channel. \n +gif Searches for gifs depending on what follows after the command.")
  }
  else if (message.content.startsWith(`${prefix}fplay`)){
    //if (message.member.user.id === hothead || hothead2) return;
    // if (!message.member.user.id === me) return;
    if (!message.member.voice.channel) return;
    if (!message.member.user.id === me) return;
		var arg1 = args[1]
		var connection = await message.member.voice.channel.join()
      connection.play(`F:/DrogoBotmp3/${arg1}.mp3`)
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end =>{
				
				return;
			}) 
    }
})

client.login(token)