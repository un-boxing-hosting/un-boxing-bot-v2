const discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } = require('./dro,config.json');
const client = new discord.Client();
const Enmap = require('enmap');

var GphApiClient = require('giphy-js-sdk-core')
Giphy = GphApiClient(GIPHYtoken)

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep'
});
const defaultSettings = {
  prefix: "!",
  modLogChannel: "mod-log",
  modRole: "Moderator",
  adminRole: "Administrator",
  welcomeChannel: "welcome",
  welcomeMessage: "Say hello to {{user}}, everyone!"
}

client.once('ready', () => {
console.log('ready!')
client.user.setActivity('"d! help" for help and to chat', { type: 'WATCHING' })
  .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
  .catch(console.error);

})

client.on('message', message => { 
  if(message.content.startsWith(`${prefix}help`)){
    message.channel.send("`drogoton s help menu \n d! help- help menu \n d! hi - say hi to me or die \n d! po - potato!!! \n d! mu - muffins!!! \n d! cat - I LOVE CAT \n d! dog - dog  `")}
  
})

client.on('message', async dmmessage => {
	if (dmmessage.channel.type === 'dm'){
		const dms = dmmessage.content;
		console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
	}
});
client.on("guildDelete", guild => {
  // When the bot leaves or is kicked, delete settings to prevent stale entries.
  client.settings.delete(guild.id);
});

client.on("guildMemberAdd", member => {
  // This executes when a member joins, so let's welcome them!

  // First, ensure the settings exist
  client.settings.ensure(member.guild.id, defaultSettings);

  // First, get the welcome message using get: 
  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

  // Our welcome message has a bit of a placeholder, let's fix that:
  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

  // we'll send to the welcome channel.
  member.guild.channels
    .resolve("name", client.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
});

client.on('message', async dmmessage => {
    
  if (!dmmessage.channel.type === 'dm') return;
if (dmmessage.channel.type === 'dm'){
      if (dmmessage.author.bot) return
      const dms = dmmessage.content;
      const dmauthor = dmmessage.author.tag;
      //console.log(`message ${dms} sent by ${dmauthor} in dm`)
      const channel = client.channels.cache.get(`${channelID}`)
      const dmEmbed = new discord.MessageEmbed()
      
      .setColor('GREEN')
      .setTitle('new DM')
      .setURL('http://dro.unboxingman.com')
      .setAuthor('drogoton', 'http://play.unboxingman.com/dro/DrogoLogo.png', 'http://dro.unboxingman.com')
      .setDescription(` Received: ${dms}`)
      .setThumbnail('http://play.unboxingman.com/dro/DrogoLogo.png')
      .addFields(
          //{ name: 'new dm message', value: `${dms}` }, 
          { name:`by ${dmauthor}`,  value: `.`},
      )
      .setTimestamp()
      .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

     channel.send(dmEmbed)
}
});
client.on("message", async (message) => {
  // This stops if it's not a guild (obviously), and we ignore all bots.
  // Pretty standard for any bot.
  if(!message.guild || message.author.bot) return;

  // We can use ensure() to actually grab the default value for settings,
  // if the key doesn't already exist. 
  const guildConf = client.settings.ensure(message.guild.id, defaultSettings);

  // Now we can use the values! 
  // We stop processing if the message does not start with our prefix for this guild.
  if(message.content.indexOf(guildConf.prefix) !== 0) return;

  //Then we use the config prefix to get our arguments and command:
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(guildConf.prefix.length).toLowerCase();

  // Commands Go Here
    // Alright. Let's make a command! This one changes the value of any key
  // in the configuration.
  if(command === "setconf") {
    // Command is admin only, let's grab the admin value: 
    const adminRole = message.guild.roles.fetch("name", guildConf.adminRole);
    if(!adminRole) return message.reply("Administrator Role Not Found");

    // Then we'll exit if the user is not admin
    //if(!message.member.hasPermission(`MANAGE_MESSAGES`, { checkAdmin: true, checkOwner: true}) || !message.member.roles.cache.has(adminRole.id )) {
    //  return message.reply("You're not an admin, sorry!");
  //  }

    // Let's get our key and value from the arguments. 
    // This is array destructuring, by the way. 
    const [prop, ...value] = args;
    // Example: 
    // prop: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)

    // We can check that the key exists to avoid having multiple useless, 
    // unused keys in the config:
    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }

    // Now we can finally change the value. Here we only have strings for values 
    // so we won't bother trying to make sure it's the right type and such. 
    client.settings.set(message.guild.id, value.join(" "), prop);

    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }
  if(command === "showconf") {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}`;
    });
    message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps.join("\n")}\`\`\``);
  }
});

client.on('message',message => {
  if(message.content.startsWith(`${prefix}cat`)){
    Giphy.search('gifs' , {"q":"love cats"})
    .then((Response) => {
      var totalresponses = Response.data.length;
      var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
      var Responsefinal = Response.data[Responseindex];

      message.channel.send("I LOVE CAT :grinning:",{
        files: [Responsefinal.images.fixed_height.url]
      })

      }).catch(() => {
        message.channel.send('error potato');
      }) 
  }
})
client.on(`message`, async messagepog => {
  //if (messagepog.author.bot) return;
  const reply = messagepog.author
  const mention = messagepog.mentions.users.first();

  if(messagepog.content.includes("pog")){

    if(messagepog.content.includes(mention)) {
      //mention.send('champ');
      message.delete();
      //mentionmessage.slice(mention);
      const m = await mention.send(`reeeeeeeee`);
      messagepog.channel.send("done!");
      m.react('potato');

  } else {
    const m = await messagepog.channel.send(`champ ${reply}`);
    m.react(messagepog.guild.emojis.cache.get('755199656883126363'));
    messagepog.react(messagepog.guild.emojis.cache.get('755199656883126363'));
  }
}
});


client.on('message', message => {
  const Member = message.member;
	const voicechannel = Member.voice.channel;
    if(message.content.startsWith(`${prefix}hi`)){
        message.channel.send("you are a potato")
       }
       if (message.content.startsWith(`${prefix}fm`)){
         const guild = message.guild
        client.settings.delete(guild.id);
       }
   
   if(message.content.startsWith(`${prefix}po`)){
     Giphy.search('gifs' , {"q":"potato"})
         .then((Response) => {
           var totalresponses = Response.data.length;
           var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
           var Responsefinal = Response.data[Responseindex];

           message.channel.send("potato",{
             files: [Responsefinal.images.fixed_height.url]
           })

           }).catch(() => {
             message.channel.send('error potato');
           }) 
     }
     if (message.content.startsWith(`${prefix}say`)){ 
      if (message.member.hasPermission( 'MANAGE_MESSAGES', { checkAdmin:true, checkOwner: true })){
           
         // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
         // To get the "message" itself we join the `args` back into a string with spaces: 
         //var sayMessage = args.join(" ");
         var messagesay = message.content;
           var sayMessage= messagesay.substr('5');
         // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
         message.delete().catch(O_o=>{}); 
         // And we get the bot to say the thing: 
         message.channel.send(sayMessage);
         console.log(sayMessage ,"sent by" ,message.author.tag,"in channel ", message.channel.name, "in guild", message.guild.name)
      } else {
        message.channel.send('you need to have `MANAGE_MESSAGES`')
      }
     }
     const mention = message.mentions.users.first();
     if (message.content.startsWith(`${prefix}dm`)){
      const mentionmessage = message.content.slice(5);
      if(mention == null) { return; }
      message.delete();
      mentionmessage.slice(mention);
      mention.send(mentionmessage);
      message.channel.send("done!")
  
    }if (message.content.startsWith(`pogalljoin`)) {
      voicechannel.join()
      .then(connection => console.log('Connected!'))
      .catch(console.error);
    }
})

client.on('message', message => { 
 if(message.content.startsWith(`${prefix}mu`)){
   Giphy.search('gifs' , {"q":"muffins"})
       .then((Response) => {
         var totalresponses = Response.data.length;
         var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
         var Responsefinal = Response.data[Responseindex];

         message.channel.send("muffin",{
           files: [Responsefinal.images.fixed_height.url]
         })

         }).catch(() => {
           message.channel.send('error muffin');
         }) 
       }
})

client.on('message', message => {
 if(message.content.startsWith(`${prefix}dog`)){
   Giphy.search('gifs' , {"q":"dogs"})
       .then((Response) => {
         var totalresponses = Response.data.length;
         var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
         var Responsefinal = Response.data[Responseindex];

         message.channel.send("dog :slight_frown: ",{
           files: [Responsefinal.images.fixed_height.url]
         })

         }).catch(() => {
           message.channel.send('error potato');
         }) 
   }
})



client.on('message',message => {
  if(message.content.startsWith(`${prefix}gi`)){
    Giphy.search('gifs' , {"q":"giraffe"})
    .then((Response) => {
      var totalresponses = Response.data.length;
      var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
      var Responsefinal = Response.data[Responseindex];

      message.channel.send("giraffe:",{
        files: [Responsefinal.images.fixed_height.url]
      })

      }).catch(() => {
        message.channel.send('errorgiraffe');
      }) 
  }
})

client.login(token);
