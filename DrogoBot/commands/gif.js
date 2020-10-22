const { GIPHYtoken } = require('../drogobot-config.json');
const GphApiClient = require('giphy-js-sdk-core')
const Giphy = GphApiClient(GIPHYtoken);

module.exports = {
	name: 'gif',
    aliases: ['g', 'gi'],
	description: 'sends gif of rour choice ',
    cooldown: 2,
    usage: '(the gif you want)',
    args: true,
	execute(bot, message, args) {
       
        
      try { Giphy.search ('gifs' , {"q":args})
             .then((Response) => {
              var totalresponses = Response.data.length;
              var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
               var Responsefinal = Response.data[Responseindex];
 
               message.channel.send("",{
               files: [Responsefinal.images.fixed_height.url]
            })})
        } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
                
     } 
	},
};