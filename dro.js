const discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } = require('./dro,config.json');
const client = new discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
Giphy = GphApiClient(GIPHYtoken)

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
    if(message.content.startsWith(`${prefix}hi`)){
        message.channel.send("you are a potato")
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
