const discord = require('discord.js');
const { prefix, token, GIPHYtoken } = require('./dro,config.json');
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
