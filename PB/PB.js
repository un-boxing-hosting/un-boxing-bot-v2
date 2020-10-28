const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./PB-config.json`);
const client = new Discord.Client();
//const bot = new Discord.Client();
const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);
const fs = require('fs-extra');

(function(){
  var	oldlog = console.log;
  var t = new Date()
  var d = t.getDate();
  var m = t.getMonth();
  var y = t.getFullYear();
  var file = `pb-logs/logs-${`${m}-${d}-${y}`}.txt`
  //fs.createFile(file, function(err){console.log(`${err} help me`);});
  var stream = fs.createWriteStream(file, {flags: 'a'})
  console.log = function (message) {
  
    stream.write(message + "\n")
    oldlog.apply(console, arguments);
  };
  
  })();

client.on("ready", () => {
	console.log('Ready!');
	client.user.setActivity(`you. `, { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to Watching you. `))
  .catch(console.error);
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  });

  client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`you. `, { type: 'WATCHING' });
  });
  
  client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`"you. `, { type: 'WATCHING' });
  });

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message' , async message => {
	const mention = message.mentions.members.first();
	 if (message.content.startsWith(mention)){
		message.channel.send(`${mention.user}`)
	 }
  const command = message.content.toLocaleLowerCase();
  if(command.includes(`niger`)){
    message.delete()
    message.channel.send(`${message.author} seed a no no word `)
    message.author.send(`do not say that in thes server`)

  } if (command.includes(`potato`)){
    message.react('🥔')
  }if(command.includes(`bitch`)){
    message.delete()
    message.channel.send(`${message.author} seed a no no word `)
    message.author.send(`do not say that in thes server`)

  }else if (command.includes(`<@376540589669351424>`)){
	message.channel.send('<@376540589669351424>')
	}
  
})
client.on('message', async dmmessage => {
    
    if (!dmmessage.channel.type === 'dm') return;
	if (dmmessage.channel.type === 'dm'){
        if (dmmessage.author.bot) return
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = client.channels.cache.get(`${channelID}`)
        const dmEmbed = new Discord.MessageEmbed()
        
        .setColor('GREEN')
      .setTitle('new DM')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('PotatoMC Bot', 'http://play.unboxingman.com/dro/PotatoMC.png', 'http://dro.unboxingman.com')
      .setDescription(` Received: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/PotatoMC.png')
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
  const mention = message.mentions.members.first();
  const Member = message.member;
	const voicechannel = Member.voice.channel;
    
  if (command.startsWith(`${prefix}ping`)) { 
        const m = await message.channel.send("Ping?");
         m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)

  } else if (command.startsWith(`${prefix}say`)){ 
      if (message.member.hasPermission( 'MANAGE_MESSAGES', { checkAdmin:true, checkOwner: true })){
        var messagesay = message.content;
        var sayMessage= messagesay.substr('6');
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
    
  }else if(command.startsWith(`${prefix}help`)){ 
   message.channel.send("PotatoMC Bot help menu \n p!help is the help command you already ran, dummy! \n p!ping shows you the bot's ping.")
  }else if (command.startsWith(`${prefix}kick`)){
		//const mentionmessage = message.content.slice(prefix.length);
	const reson = args[2]
	const whokick = mention;
	if (!message.member.hasPermission(`KICK_MEMBERS`, { checkAdmin:true, checkOwner: true })) return;
	if (!mention){
		message.channel.send(`pls mention a member to kick`);
		return;
	}
	let authorhighestrole = message.member.roles.highest.position;
	//let mentionrole = mention.member.roles.highest.position
	
	//if (!mention.kickable){
	//	message.channel.send(`I have no premissions to kick this user`)
	//}
	mention.send(` you have ben kicked from ${message.guild.name} for ${reson}`)
	mention.kick(reson)
		.then(() => console.log(`kicked ${mention.displayName} from ${message.guild.name} for ${reson}`))
		.catch(console.error);
	message.channel.send(`kicked ${mention.displayName} for ${reson}`)
	
  }else if (command.startsWith(`${prefix}ban`)){
	const reson = args[3]
	const bdays = args[2]
	const whokick = mention;
	if (!message.member.hasPermission(`BAN_MEMBERS`, { checkAdmin:true, checkOwner: true })) return;
	if (!mention){
		message.channel.send(`pls mention a member to ban`);
		return;
	}
	let authorhighestrole = message.member.roles.highest.position;
	//let mentionrole = mention.member.roles.highest.position
	
	//if (!mention.kickable){
	//	message.channel.send(`I have no premissions to kick this user`)
	//}
	mention.send(` you have ben banned from ${message.guild.name} for ${reson}`)
	mention.ban({ days: bdays, reason: `${reson}` })
		.then(() => console.log(`banned ${mention.displayName} from ${message.guild.name} for ${reson}`))
		.catch(console.error);
	message.channel.send(`banned ${mention.displayName} for ${reson}`)

  }else if (command.startsWith(`${prefix}unban`)){
	const reson = args[3]
	const buser = args[1]
	const whokick = mention;
	const guild = message.guild;
	if (!message.member.hasPermission(`BAN_MEMBERS`, { checkAdmin:true, checkOwner: true })) return;
	if (!buser){
		message.channel.send(`pls send a member id to unban`);
		return;
	}
	//let authorhighestrole = message.member.roles.highest.position;
	//let mentionrole = mention.member.roles.highest.position
	
	//if (!mention.kickable){
	//	message.channel.send(`I have no premissions to kick this user`)
	//}
	//buser.send(` you have ben unbanned from ${message.guild.name} for ${reson}`)
	guild.members.unban(buser)
		.then(() => console.log(`unbanned ${buser} from ${message.guild.name} for ${reson}`))
		.catch(console.error);
	message.channel.send(`unbanned ${buser} for ${reson}`)
  }else {
    message.channel.send(`You need to enter a valid command!\n try ${prefix}help`)
  }

})

client.login(token)