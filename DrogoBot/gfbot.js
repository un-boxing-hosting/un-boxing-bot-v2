const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./gfbot-config.json`);
const client = new Discord.Client();
const bot = new Discord.Client();
const gac = require('giphy-js-sdk-core');
const Giphy = gac(GIPHYtoken);

client.on("ready", () => {
	console.log('Ready!');
	client.user.setActivity(`with you uwu`, { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to Girlfriend bot, at your service!`))
  .catch(console.error);
  console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);
  });

  client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`"DrogoBot sleep." `, { type: 'WATCHING' });
  });
  
  client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`"DrogoBot sleep. `, { type: 'WATCHING' });
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
      .setTitle('Someone is in my DMs uwu')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('Drogoton, un boxing man yt', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` Received: ${dms}`)
      .setThumbnail('https://cdn.discordapp.com/avatars/755089837836599377/3c223555b4a2db7bfc3c1f18adcfbc8e.webp?size=2048')
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
	if (message.author.bot) return;
  //if (!message.content.startsWith(prefix)) return;
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

	} 
})


client.login(token)