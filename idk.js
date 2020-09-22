const Discord = require('discord.js');
const { prefix, token, GIPHYtoken, channelID } =require(`./mus-config-dev.json`);
const client = new Discord.Client();
const Gac = require('giphy-js-sdk-core');
const { response } = require('express');
const Giphy = Gac(GIPHYtoken);

client.once('ready', () => {
	console.log('Ready!');
	//client.user.setActivity(`"${prefix}" for help `, { type: 'WATCHING' })
  //.then(presence => console.log(`Activity set to "${prefix}" for help `))
  //.catch(console.error);
});

client.on('message', async message => {


   if (message.content.startsWith(`ilikecatgirls`)){
        //message.channel.send(`y!catgirl`)
      
     Giphy.search('gifs' , {"q":"catgirl"})
        .then((Response) => {
            var totalresponses = Response.data.length;
            var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
            var Responsefinal = Response.data[100];

            message.channel.send("cat girl",{
            files: [Responsefinal]
            //Responsefinal.images.fixed_height.url
            })

            })//.catch((console.error) => {
                .catch(console.error)
           // message.channel.send('error potato');
           // }) 
   }
    
})

client.login(token);