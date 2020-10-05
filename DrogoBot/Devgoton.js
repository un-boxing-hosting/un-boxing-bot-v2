const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./devgoton-config.json`);
const client = new Discord.Client();
//const bot = new Discord.Client();
const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);

client.on("ready", () => {
	console.log('Ready!');
	client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to "${prefix}help" for help `))
  .catch(console.error);
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
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
        if (dmmessage.author.bot) return
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        //console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('new DM')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('Devgoton', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
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
});

client.on('message' , async message => {
	//if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = message.content.toLocaleLowerCase();
  const mention = message.mentions.users.first();
  const Member = message.member;
	const voicechannel = Member.voice.channel;
    
  if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Ping?");
         m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
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
  } else if (command.startsWith(`${prefix}say`)){ 
      if (message.member.hasPermission( 'MANAGE_MESSAGES', { checkAdmin:true, checkOwner: true })){
        var messagesay = message.content;
        var sayMessage= messagesay.substr('4');
        message.delete().catch(O_o=>{});  
        message.channel.send(sayMessage);
        console.log(sayMessage ,"sent by" ,message.author.tag,"in channel ", message.channel.name, "in guild", message.guild.name)
      }  
  } else if (command.startsWith(`${prefix}dm`)){
		const mentionmessage = message.content.slice(5);
		if(mention == null) { return; }
		message.delete();
		mentionmessage.slice(mention);
		mention.send(mentionmessage);
		message.channel.send("done!")

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
    message.channel.send("Welcome to the server! My name is DrogoBot and I am cool.")
  } else if(command.startsWith(`${prefix}help`)){ 
    message.channel.send(" help menu \n =help is the help command you already ran, dummy! \n =welcome Welcomes people. \n =say Tells the bot to say something in that channel. \n =gif Searches for gifs depending on what follows after the command.")
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
  }
})

client.login(token)