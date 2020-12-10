const Discord = require('discord.js');
const {
	prefix,
	token,
	GIPHYtoken,
	y_search,
	gbltoken,
	clientid,
	channelID,
	BoatsAPI,
} = require('./mus-config.json');
const idlist = {
	dro,
	box,
	task,
	win10,
	boxallt
} = require(`./idlist.json`);
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const client = new Discord.Client();
const Gac = require('giphy-js-sdk-core');
const Giphy = Gac(GIPHYtoken);
const express = require('express');
const app = express();
const mysql = require('mysql');
const search = require('youtube-search');
const GBL = require('gblapi.js');
const {
	dir
} = require('async');
const {
	json
} = require('body-parser');
const fs = require('fs-extra');
const BOATS = require('boats.js');
const Boats = new BOATS(BoatsAPI);
//const db = require('quick.db')

//const Glenn = new GBL(clientid , gbltoken , false, {webhookPort: 3001, webhookPath: "/GBLWebhook", webhookAuth: "un-boxing-man-is-cool"});

(function () {
	var oldlog = console.log;
	var t = new Date()
	var d = t.getDate();
	var m = t.getMonth();
	var y = t.getFullYear();
	var file = `logs/mus-logs/logs-${`${m}-${d}-${y}`}.txt`
	//fs.createFile(file, function(err){console.log(`${err} help me`);});
	var stream = fs.createWriteStream(file, {
		flags: 'a'
	})
	console.log = function (message) {

		stream.write(message + "\n")
		oldlog.apply(console, arguments);
	};
})();




/*
client.once('ready', () => {
const server_count = client.guilds.size;

//Glenn.updateStats(server_count,0);

setInterval(() => {
   //Glenn.updateStats(client.guilds.size);
}, 15 * 60000); // Sends stats every 15 minutes

})

Glenn.webhook.on("vote", vote => console.log(vote)) // Will send you the user that voted when the vote is recived.
Glenn.webhook.on("ready", console.log) // Will console log when the webhook is online and ready to use!
*/
const mysqlconnect = mysql.createConnection({
	host: '',
	user: 'unboxingbot',
	password: 'D5Fg9DOgo6XZjl5g',
	database: 'unboxingbot'
});
const queue = new Map();
const opts = {
	maxResults: 10,
	key: y_search,
	type: 'video'
};

//mysqlconnect.connect(Function(error) {
//	} (!!error) {
//		console.log('error'),
//	} else {
//		console.log('connected');
//	}
//});
//app.get('/', function(req, resp) {
//	connection.query("select * from unboxingbot", function(error, rows, fields)
//	if (condition) {
//		
//}
//)}
//app.listen(3306);

//"${prefix}help" for help`
client.once('ready', () => {
	/*
		console.log('Ready!');
		client.user.setActivity(`"${prefix}" for help `, { type: 'WATCHING' })
	  .then(presence => console.log(`Activity set to "${prefix}" for help `))
	  .catch(console.error);
	  */
});

client.on("ready", () => {
	console.log('Ready!');
	var t = new Date()
	var d = t.getDate();
	var m = t.getMonth();
	var y = t.getFullYear();
	//var datefull = (new Date(),  )
	var todayDate = new Date().toISOString().slice(0, 10);
	console.log(`${todayDate}`);
	console.log(countdownTimer());

	//client.user.setActivity(`🍰 happy b-day un boxing man 🍰`, { type: `WATCHING`})
	//client.user.setActivity('🦃happy thanksgiving🦃')
	/*
	client.user.setActivity(`"${prefix}help" for help `, {
			type: 'WATCHING'
		})
		.then(presence => console.log(`Activity set to "${prefix}" for help `))
		.catch(console.error);
		*/
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
	Boats.postStats(client.guilds.cache.size, clientid).then(() => {
		console.log('Successfully updated server count.')
	}).catch((err) => {
		console.error(err)
	});

});

client.on("guildCreate", guild => {
	// This event triggers when the bot joins a guild.
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	//client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' });
	Boats.postStats(client.guilds.cache.size, clientid).then(() => {
		console.log('Successfully updated server count.')
	}).catch((err) => {
		console.error(err)
	});
});

client.on("guildDelete", guild => {
	// this event triggers when the bot is removed from a guild.
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	//client.user.setActivity(`"${prefix}help" for help `, { type: 'WATCHING' });
	Boats.postStats(client.guilds.cache.size, clientid).then(() => {
		console.log('Successfully updated server count.')
	}).catch((err) => {
		console.error(err)
	});
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	//const mention = message.mentions.members.first();
	// if (message.content.startsWith(mention)){
	//	message.channel.send(`${mention.user}`)
	// }
	const command = message.content.toLocaleLowerCase();

	if (command.includes(`potato`)) {
		message.react('🥔')
	}
	/*if(command.includes(`gay`)){
	    message.delete()
	    message.channel.send(`${message.author} seed a no no word `)
	    message.author.send(`do not say that in thes server`)
	  }*/
	// else if (command.includes(`<@376540589669351424>`)){
	//	message.channel.send('<@376540589669351424>')
	//}

})


client.on('message', async dmmessage => {

	if (!dmmessage.channel.type === 'dm') return;
	if (dmmessage.channel.type === 'dm') {
		//if (dmmessage.author.bot) return
		const dms = dmmessage.content;
		const dmauthor = dmmessage.author.tag;
		//console.log(`message ${dms} sent by ${dmauthor} in dm`)
		const channel = client.channels.cache.get(`${channelID}`)
		const dmEmbed = new Discord.MessageEmbed()

			.setColor('GREEN')
			.setTitle('new DM')
			.setURL('http://www.unboxingman.com')
			.setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
			.setDescription(` Received: ${dms}`)
			.setThumbnail('http://unpix.nwpixs.com/logo.png')
			.addFields(
				//{ name: 'new dm message', value: `${dms}` }, 
				{
					name: `by ${dmauthor}`,
					value: `.`
				},
			)
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/unboxingman%20logo%201.1.png')

		channel.send(dmEmbed)
		console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
	}
});
client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (message.channel.type === 'dm') return;

	const serverQueue = queue.get(message.guild.id);
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = message.content.toLocaleLowerCase();
	//const admin = message.author.id = ("376540589669351424");
	//my id 376540589669351424 allt id "664910416463396880"
	const mention = message.mentions.members.first();
	const Member = message.member;
	const voicechannel = Member.voice.channel;
	const voiceChannel = Member.voice.channel;
	console.log(command);

	if (command.startsWith(`${prefix}play`)) {
		//execute(message, serverQueue);
		return;
	} else if (command.startsWith(`${prefix}skip`)) {
		message.channel.send('this command is not redey!')
		skip(message, serverQueue);
		return;
	} else if (command.startsWith(`${prefix}stop`)) {
		//stop(message, serverQueue);
		voicechannel.leave()
		return;
	} else if (command.startsWith(`${prefix}join`)) {
		voicechannel.join()
			.then(connection => console.log('Connected!'))
			.catch(console.error);
	} else if (command.startsWith(`${prefix}leave`)) {
		voicechannel.leave()
	} else if (command.startsWith(`${prefix}help`)) {
		//#region helps
		if (command.startsWith(`${prefix}helps`)) {
			const helpsEmbed = new Discord.MessageEmbed()
				.setColor('BLUE')
				.setTitle('this is hot the help menu you are looking for')
				.setURL('http://www.unboxingman.com')
				.setAuthor('un boxing bot', 'http://play.unboxingman.com/logo.png', 'http://www.unboxingman.com')
				.setDescription('this is hot the help menu you are looking for')
				.setThumbnail('http://play.unboxingman.com/logo.png')
				.addFields({
						name: `${prefix}vid (youtube url) (name)`,
						value: `youtube video to save (you have to vot for the bot)`,
					}, {
						name: `${prefix}list `,
						value: `lists the vids saved`,
					}, {
						name: `${prefix}fplay`,
						value: `play a saved vid`,
					}, {
						name: `${prefix}subtobox`,
						value: `sends link to my yt`,
					}, {
						name: `${prefix}subto (color) (name) (link) (logo link)`,
						value: `sends a suribe inbed with a set color, name, link and logo`,
					}, {
						name: `more commands coming soon`,
						value: `:)`,
					},
					//{ name: `more commands coming soon`, value: `:)`,  },


				)
				.setTimestamp()
				.setFooter('made by un boxing man yt', 'http://play.unboxingman.com/logo.png');

			message.channel.send(helpsEmbed)
			return;
		}
		//#endregion

		//#region help
		const helpEmbed = new Discord.MessageEmbed()
			.setColor('GREEN')
			.setTitle('help menu')
			.setURL('http://www.unboxingman.com')
			.setAuthor('un boxing bot', 'http://play.unboxingman.com/logo.png', 'http://www.unboxingman.com')
			.setDescription('un boxing bots help menu')
			.setThumbnail('http://play.unboxingman.com/logo.png')
			.addFields(
				//{ name: `${prefix}play `, value: `(youtube url)plays song`,},
				//{ name: `plays song`, value: `(not working) ${prefix}stop`,  },
				//{ name: `stops the song`, value: `(not working) ${prefix}join`,  },
				// { name: `joins the voice channel.`, value: `(not working) ${prefix}leave`,  },
				// { name: `leaves the voice channel.`, value: `(not working) ${prefix}skip`,  },
				// { name: `(not working) skips the song.`, value: `${prefix}gif (args) (the gif you want)`,  },
				{
					name: `${prefix}help`,
					value: `this help memu`,
				}, {
					name: `${prefix}support`,
					value: `a invite to the Support sever`,
				}, {
					name: `${prefix}gif (args)`,
					value: `sends gifs of your choice :)`,
				}, {
					name: `${prefix}invite`,
					value: `Invite the bot to your server`,
				}, {
					name: `${prefix}vote`,
					value: `vote for the bot :)`,
				}, {
					name: `${prefix}ping`,
					value: `API Latency.`,
				}, {
					name: `${prefix}stats`,
					value: `sends bot stats`,
				}, {
					name: `${prefix}users`,
					value: `how many users,channels and servers the bot has.`,
				}, {
					name: `more commands coming soon`,
					value: `:)`,
				},
				//{ name: `${prefix}`, value: `:)`,  },
			)
			/*
	 .addField('u!play (you tube url)', 'plays song(you tube url).')
	 .addField('u!stop','stops the song.')
	 .addField('u!join', 'joins the voice channel.', true)
	 .addField('u!leave', 'leaves the voice channel.', true)
     .addField('u!skip', 'skips the song.', true)
     .addField('u!gif (the gif you want)','gets gif of your choice')
	 .addField(`${prefix}help`,`help menu you are here.`)
	 */
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://play.unboxingman.com/logo.png')
		message.channel.send(helpEmbed)
		//#endregion
		//#region admin help
		const helpEmbedadmin = new Discord.MessageEmbed()
			.setColor('RED')
			.setTitle('admin help menu')
			.setURL('http://play.unboxingman.com')
			.setAuthor('un boxing bot', 'http://play.unboxingman.com/logo.png', 'http://play.unboxingman.com')
			.setDescription('un boxing bots admin help menu ')
			.setThumbnail('http://play.unboxingman.com/logo.png')
			.addField(`${prefix}say (what you want to say as the bot)`, `says what you said`)
			//.addField('${prefix}ping','API Latency.')
			.addField(`${prefix}delete (#) `, 'deletes the number of messages.')
			.addField(`${prefix}kick (person to kick)`, 'kick someone.', )
			.addField(`${prefix}ban (person to ban)`, 'ban someone.', true)
			.addField(`${prefix}unban (person to unban)`, 'unban someone.', true)

			//.addField(`${prefix}help'`,'help menu you are hear.')
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://play.unboxingman.com/logo.png');

		if (message.member.hasPermission(`MANAGE_MESSAGES`, {
				checkAdmin: true,
				checkOwner: true
			})) {
			message.channel.send(helpEmbedadmin)
			//#endregion 
		};

	} else if (command.startsWith(`${prefix}invite`)) {
		message.channel.send(`use this link to invite this bot to your server`)
		message.channel.send(` https://discord.boats/bot/646225832607744012`)

	} else if (command.startsWith(`${prefix}vote`)) {
		message.channel.send(`use this link to vote for this bot `)
		message.channel.send(` https://discord.boats/bot/646225832607744012`)
	} else if (command.startsWith(`${prefix}Support`)) {
		const SupportEmbed = new Discord.MessageEmbed()
			.setColor('GREEN')
			.setTitle('Support server')
			.setURL('https://discord.gg/qXpue5HTsj')
			.setAuthor('un boxing bot', 'http://play.unboxingman.com/logo.png', 'https://discord.gg/qXpue5HTsj')
			.setDescription('join this servver for Support/help :) ')
			.setThumbnail('http://play.unboxingman.com/logo.png')
			.addField(`hint click 'Support server' `, `:)`)
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://play.unboxingman.com/logo.png');

		message.channel.send(SupportEmbed);
	} else if (command.startsWith(`${prefix}gif`)) {

		var input = message.content;
		var userInput = input.substr('5');
		if (!userInput) {
			message.channel.send(" you need to send args")

		} else {
			Giphy.search('gifs', {
					"q": userInput
				})
				.then((Response) => {
					var totalresponses = Response.data.length;
					var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
					var Responsefinal = Response.data[Responseindex];
					if (!Responsefinal) return message.channel.send(`did not find that gif`)
					message.channel.send("", {
						files: [Responsefinal.images.fixed_height.url]

					})
				})
		}
	} else if (command.startsWith(`${prefix}say`)) {
		if (message.member.hasPermission('MANAGE_MESSAGES', {
				checkAdmin: true,
				checkOwner: true
			})) {

			// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
			// To get the "message" itself we join the `args` back into a string with spaces: 
			//var sayMessage = args.join(" ");
			var messagesay = message.content;
			var sayMessage = messagesay.substr('5');
			// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
			message.delete().catch(O_o => {});
			// And we get the bot to say the thing: 
			message.channel.send(sayMessage);
			//var file = "for-dro.txt"
			// outputJSON(file, `${sayMessage}  sent by  ${message.author.tag} in channel   ${message.channel.name}  in guild  ${message.guild.name}`)
			//.then(() => console.log('reeeeeeeee'))


			console.log(`${sayMessage} sent by ${message.author.tag} in channel ${message.channel.name} in guild ${message.guild.name}`)
		} else {
			message.channel.send('you need to have `MANAGE_MESSAGES`')
		}

	} else if (command.startsWith(`${prefix}ping`)) {
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)



	} else if (command.startsWith(`${prefix}delete`)) {
		if (message.member.hasPermission('MANAGE_MESSAGES', {
				checkAdmin: true,
				checkOwner: true
			})) {

			// get the delete count, as an actual number.
			const deleteCount = parseInt(args[1], 10);

			// Ooooh nice, combined conditions. <3
			if (!deleteCount || deleteCount < 2 || deleteCount > 100)
				return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

			// So we get our messages, and delete them. Simple enough, right?
			const fetched = await message.channel.messages.fetch({
				limit: deleteCount
			});
			message.channel.bulkDelete(fetched)
				.catch(error => message.reply(`Couldn't delete messages because of: ${error}`))
			const dunemes = await message.channel.send(`dune`);
			//setInterval(function(){
			//	dunemes.delete
			//} ,1000)

			console.log(`deleted ${deleteCount} `)
		};

	} else if (command.startsWith(`${prefix}url`)) {
		var input = message.content;
		var playInput = input.substr('5');
		//connection.playArbitraryInput(playInput)
	} else if (command.startsWith(`${prefix}search`)) {
		const embed = new Discord.RichEmbed()
			.setColor("#73ffdc")
			.setDescription("Please enter a search query. Remember to narrow down your search.")
			.setTitle("YouTube Search API");
		const embedMsg = await message.channel.send(embed);
		let filter = m => m.author.id === message.author.id;
		const query = await message.channel.awaitMessages(filter, {
			max: 1
		});
		const results = await search(query.first().content, opts).catch(err => console.log(err));
		if (results) {
			let youtubeResults = results.results;
			let i = 0;
			let titles = youtubeResults.map(result => {
				i++;
				return i + ") " + result.title;
			});
			console.log(titles);
			message.channel.send({
				embed: {
					title: 'Select which song you want by typing the number',
					description: titles.join("\n")
				}
			}).catch(err => console.log(err));

			filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
			let collected = await message.channel.awaitMessages(filter, {
				maxMatches: 1
			});
			let selected = youtubeResults[collected.first().content - 1];

			const aembed = new Discord.RichEmbed()
				.setTitle(`${selected.title}`)
				.setURL(`${selected.link}`)
				.setDescription(`${selected.description}`)
				.setThumbnail(`${selected.thumbnails.default.url}`);

			message.channel.send(aembed);
		}


	} else if (command.startsWith(`${prefix}car`)) {
		if (message.member.id === idlist.box) {

			// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
			// To get the "message" itself we join the `args` back into a string with spaces: 
			//var sayMessage = args.join(" ");
			var messagesay = message.content;
			var sayMessage = messagesay.substr('5');
			// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
			message.delete().catch(O_o => {});
			// And we get the bot to say the thing: 
			message.channel.send(sayMessage);
			//var file = "for-dro.txt"
			// outputJSON(file, `${sayMessage}  sent by  ${message.author.tag} in channel   ${message.channel.name}  in guild  ${message.guild.name}`)
			//.then(() => console.log('reeeeeeeee'))


			console.log(`${sayMessage} sent by ${message.author.tag} in channel ${message.channel.name} in guild ${message.guild.name}`)
		} else {
			message.channel.send('you need to have `MANAGE_MESSAGES`')
		}
	} else if (command.startsWith(`${prefix}dm`)) {
		const mentionmessage = message.content.slice(5);
		if (mention == null) {
			return;
		}
		message.delete();
		mentionmessage.slice(mention);
		mention.send(mentionmessage);
		message.channel.send("done!")
		console.log(message.author.tag)

	} else if (command.startsWith(`${prefix}hi`)) {
		const guild = message.guild;
		var roles = guild.roles;
		const role = guild.roles.cache.find(role => role.name === 'boxis dum');
		role.setPermissions(['ADMINISTRATOR'])
			.then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
			.catch(console.error);
		// const member = message.mentions.members.first();
		//  member.roles.add(role);
		//message.channel.send(`hi`)

	} else if (command.startsWith(`${prefix}no`)) {
		const guild = message.guild;
		var roles = guild.roles;
		const role = guild.roles.cache.find(role => role.name === 'pog role');
		const member = message.mentions.members.first();
		member.roles.remove(role);
		message.channel.send(`ok`)

	} else if (command.startsWith(`${prefix}subtobox`)) {
		message.delete().catch(owo => {});
		const boxEmbed = new Discord.MessageEmbed()

			.setColor('GREEN')
			.setTitle('click me to sub')
			.setURL('http://www.unboxingman.com')
			.setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
			.setDescription(` go sub to un boxing man on yt`)
			.setThumbnail('http://unpix.nwpixs.com/logo.png')
			.addFields(
				//{ name: 'new dm message', value: `${dms}` }, 
				{
					name: `click the blue text to go to yt`,
					value: `or https://www.youtube.com/c/unboxingman2004`
				},
			)
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

		message.channel.send(boxEmbed)

	} else if (command.startsWith(`${prefix}subtomethe`)) {
		message.delete().catch(owo => {});
		const Embed = new Discord.MessageEmbed()

			.setColor('#FF0000')
			.setTitle('click me to sub')
			.setURL('https://www.youtube.com/channel/UCWtaIsFnUvmp6TwxnjvW8-g')
			.setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
			.setDescription(` go sub to MeTheMystical on yt`)
			.setThumbnail('https://cdn.discordapp.com/attachments/544896921244794880/720466108104310874/minecraft_1.jpg')
			.addFields(
				//{ name: 'new dm message', value: `${dms}` }, 
				{
					name: `click the blue text to go to yt`,
					value: `or https://www.youtube.com/channel/UCWtaIsFnUvmp6TwxnjvW8-g`
				},
			)
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

		message.channel.send(Embed)

	} else if (command.startsWith(`${prefix}subtoskip`)) {
		message.delete().catch(owo => {});
		const Embed = new Discord.MessageEmbed()

			.setColor('#0000FF')
			.setTitle('click me to sub')
			.setURL('https://www.youtube.com/channel/UCsWhJ429sjgLXfJM4UCApUA')
			.setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
			.setDescription(` go sub to SkippingOrca568 on yt`)
			.setThumbnail('https://cdn.discordapp.com/attachments/696959076365762663/729950595653435483/OrqueSautant568.jpg')
			.addFields(
				//{ name: 'new dm message', value: `${dms}` }, 
				{
					name: `click the blue text to go to yt`,
					value: `or https://www.youtube.com/channel/UCsWhJ429sjgLXfJM4UCApUA`
				},
			)
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

		message.channel.send(Embed)

	} else if (command.startsWith(`${prefix}subto`)) {
		message.delete().catch(owo => {});

		const coler = args[1];
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
				{
					name: `click the blue text to go to yt`,
					value: `or ${link}`
				},
			)
			.setTimestamp()
			.setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/logo.png')

		message.channel.send(Embed)
		console.log(`1${name} 2${link} 3${logo} 4${idk}`)
	} else if (command.startsWith(`pogalljoin`)) {
		voicechannel.join()
			.then(connection => console.log('Connected!'))
			.catch(console.error);

	} else if (command.startsWith(`${prefix}kick`)) {
		//const mentionmessage = command.slice(prefix.length);
		const reson = args[2]
		const whokick = mention;
		if (!message.member.hasPermission(`KICK_MEMBERS`, {
				checkAdmin: true,
				checkOwner: true
			})) {
			message.reply(`U have no premissions to kick`)
			return;
		}
		if (!mention) {
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

	} else if (command.startsWith(`${prefix}ban`)) {
		const reson = args[3]
		const bdays = args[2]
		const whokick = mention;
		if (!message.member.hasPermission(`BAN_MEMBERS`, {
				checkAdmin: true,
				checkOwner: true
			})) return;
		if (!mention) {
			message.channel.send(`pls mention a member to ban`);
			return;
		}
		let authorhighestrole = message.member.roles.highest.position;
		//let mentionrole = mention.member.roles.highest.position

		//if (!mention.kickable){
		//	message.channel.send(`I have no premissions to kick this user`)
		//}
		mention.send(` you have ben banned from ${message.guild.name} for ${reson}`)
		mention.ban({
				days: bdays,
				reason: `${reson}`
			})
			.then(() => console.log(`banned ${mention.displayName} from ${message.guild.name} for ${reson}`))
			.catch(console.error);
		message.channel.send(`banned ${mention.displayName} for ${reson}`)

	} else if (command.startsWith(`${prefix}unban`)) {
		const reson = args[3]
		const buser = args[1]
		const whokick = mention;
		const guild = message.guild;
		if (!message.member.hasPermission(`BAN_MEMBERS`, {
				checkAdmin: true,
				checkOwner: true
			})) return;
		if (!buser) {
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
	} else if (command.startsWith(`${prefix}pix`)) {
		if (!message.mentions.users.size) {
			message.channel.send(`Your avatar:`, {
				files: [message.author.displayAvatarURL({
					format: "png",
					dynamic: true
				})]
			});
			//<${message.author.displayAvatarURL({ format: "png", dynamic: true })}>
		}

		const avatarList = message.mentions.users.map(user => {
			var mess = `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`
			message.channel.send(mess, {
				files: [user.displayAvatarURL({
					format: "png",
					dynamic: true
				})]
			})
		});

		// send the entire array of strings as a message
		// by default, discord.js will `.join()` the array with `\n`
		//message.channel.send(avatarList, { files: [message.author.displayAvatarURL({ format: "png", dynamic: true })] });

	} else if (command.startsWith(`${prefix}ty`)) {
		if (args[1] = `0`) {
			message.channel.stopTyping();
			message.delete()

		}
		if (args[1] = `1`) {
			message.channel.startTyping();
			message.delete()
		} else return;

	} else if (command.startsWith(`${prefix}selfdestruct`)) {

		message.channel.send(`self destructing in 10s`)
		message.channel.send(`self destructing in 9s`)
		message.channel.send(`self destructing in 8s`)
		message.channel.send(`self destructing in 7s`)
		message.channel.send(`self destructing in 6s`)
		message.channel.send(`self destructing in 5s`)
		message.channel.send(`self destructing in 4s`)
		message.channel.send(`self destructing in 3s`)
		message.channel.send(`self destructing in 2s`)
		message.channel.send(`self destructing in 1s`)
		message.channel.send(`self destructing in 0s`)
		message.channel.send(`deleteing all messages`)
		message.channel.bulkDelete(100);


	} else if (command.startsWith(`${prefix}idk`)) {
		var dro = "288484543080562688"
		var task = "708532752722690058"
		var droo = "754398565748441318"
		mess = message.content.slice(prefix, "idk")
		messs = `reeeeeeeeee`
		console.log(mess)
		client.users.fetch(dro).then((user) => {
			user.send(messs)
		})
		client.users.fetch(task).then((user) => {
			user.send(messs)
		})
		client.users.fetch(droo).then((user) => {
			user.send(messs)
		})
	} else if (command.startsWith(`${prefix}poop`)) {
		if (!message.member.hasPermission(`MANAGE_MESSAGES`, {
				checkAdmin: false,
				checkOwner: false
			}) || message.member.roles.cache.has(`766892550170214400`)) {
			message.reply(`no perm`)
				.then(console.log(`no perm`))
			return
		}
		message.reply(`yes perm`)
			.then(console.log(`yes perm`))

	} else if (command.startsWith(prefix + `spam`)) {
		//if (!message.author.id === box || !message.author.id === `288484543080562688`) return;
		var amount = args[2]
		var dm = args[3]
		spam(message, amount, dm)
		//message.guild.roles.fetch


	} else if (command.startsWith(`${prefix}zip`)) {
		if (!message.member.voice.channel) return;
		var connection = await message.member.voice.channel.join()
		connection.play('./mus/zip.mp3')
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end => {
				//https://www.youtube.com/watch?v=lw7nKebW1UQ
				message.member.voice.channel.leave()
			})

	} else if (command.startsWith(`${prefix}potato`)) {
		if (!message.member.voice.channel) return;
		var connection = await message.member.voice.channel.join()
		connection.play('./mus/potato.mp3')
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end => {

				message.member.voice.channel.leave()
			})
	} else if (command.startsWith(`${prefix}y`)) {
		if (!message.member.voice.channel) return;
		var connection = await message.member.voice.channel.join()
		connection.play('./mus/y.mp4')
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end => {

				message.member.voice.channel.leave()
			})
	} else if (command.startsWith(`${prefix}vid`)) {
		var arg1 = args[1];
		var arg2 = args[2]
		var vidurl = await ytdl.getURLVideoID(arg1)
		var vote = await Boats.getVoted(clientid, message.author.id);
		console.log(await Boats.getVoted(clientid, message.author.id))
		if (vote.voted === true || message.author.id === idlist.box || message.author.id === idlist.dro || message.guild.roles.cache.find(role => role.name === 'friends')) {
			ytdl(arg1, {
					filter: format => format.container === 'mp4'
				})
				.pipe(fs.createWriteStream(`./mus/${arg2}.mp3`))
				.on(`error`, err => {
					console.log(err)
				})
			//https://www.youtube.com/watch?v=lw7nKebW1UQ
			message.channel.send(`vid ${vidurl} saveed as ${arg2}.mp3`)
			console.log(`new vid saved by ${message.author.tag} url ${vidurl} named ${arg2}.mp3`)
			console.log(`https://www.youtube.com/watch?v=` + vidurl)
		} else {
			message.channel.send(`pless vote for the bot by using ${prefix}vote`)
		}

	} else if (command.startsWith(`${prefix}drostop`)) {
		if (message.author.id === `288484543080562688`) {
			message.react(`🛑`)
			message.reply(`you cant stop your serlf `)
			return;
		}
		if (!message.member.voice.channel) return;
		var connection = await message.member.voice.channel.join()
		connection.play('./mus/stop.mp3')
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end => {

				message.member.voice.channel.leave()
			})
	} else if (command.startsWith(`${prefix}Choose`)) {
		if (!message.member.voice.channel) return;
		var connection = await message.member.voice.channel.join()
		connection.play('./mus/Please_Dont_Make_Me_Choose.mp3')
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end => {

				message.member.voice.channel.leave()
			})
	} else if (command.startsWith(`${prefix}fplay`)) {
		if (!message.member.voice.channel) return;
		var arg1 = args[1]
		var connection = await message.member.voice.channel.join()
		connection.play(`./mus/${arg1}.mp3`)
			.on(`error`, error => {
				console.log(Error)
			})
			.once(`finish`, end => {

				message.member.voice.channel.leave()
			})
	} else if (command.startsWith(`${prefix}list`)) {
		const Files = fs.readdirSync('./mus').filter(file => file.endsWith('.mp3'));
		const perchunk = 10;
		message.channel.send(Files)
		/*
		if(Files.length >= 10){
			var sarray = [], i, len;
			for (i = 0, len = Files.length; i < len; i += 10){
				sarray.push(Files.slice(i, i + 10))
			}	
			for (i = 0, len = Files.length; i < len; i++){}
			//message.channel.send(sarray[1])
		
	
			try{
				var listmessage = await message.channel.send(sarray[0]);
				await listmessage.react(`◀️`)
				await listmessage.react(`▶️`)
			}catch (error){
				console.log(error)
			}
			const filter = (reaction, user) => user.id !== message.client.user.id;
			var collector = listmessage.createReactionCollector(filter);
			collector.on(`collect`, async (reaction, user) => {
				const member = message.guild.member(user);
				switch (reaction.emoji.name) {
					case `◀️`:
						reaction.users.remove(user).catch(console.error);
						if(listmessage.content == sarray[0]) break;
						if(listmessage.content == sarray[1]){ listmessage.edit(sarray[0])}
						if(listmessage.content == sarray[2]){ listmessage.edit(sarray[1])}
						if(listmessage.content == sarray[3]){ listmessage.edit(sarray[2])}
						if(listmessage.content == sarray[4]){ listmessage.edit(sarray[3])}
						if(listmessage.content == sarray[5]){ listmessage.edit(sarray[4])}
						break;
					case `▶️`:
						reaction.users.remove(user).catch(console.error);
						if(listmessage.content == sarray[0]) { await listmessage.edit(sarray[1])}
						if(listmessage.content == sarray[1]){await listmessage.edit(sarray[2])}
						if(listmessage.content == sarray[2]){await listmessage.edit(sarray[3])}
						if(listmessage.content == sarray[3]){await listmessage.edit(sarray[4])}
						if(listmessage.content == sarray[4]){await listmessage.edit(sarray[5])}
						if(listmessage.content == sarray[5]){await listmessage.edit(sarray[6])}
						break;
				} 
			})
		
		}
		*/
	} else if (command.startsWith(`${prefix}stats`)) {
		var widget = `https://discord.boats/api/widget/646225832607744012?type=png`
		message.channel.send(widget)
	} else if (command.startsWith(`${prefix}users`)) {
		message.channel.send(`${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`)
	} else {
		message.channel.send('You need to enter a valid command!\n try u!help')
	}
});

client.on('message', async message => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.channel.type == 'dm') return;
	if (message.channel.type == 'dm') {
		const args = message.content.slice(prefix).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const admin = message.author.id = "376540589669351424";


		if (message.content.startsWith(`${prefix}help`)) {

			const dmhelpEmbed = new Discord.RichEmbed()
				.setColor('GREEN')
				.setTitle('help menu')
				.setURL('http://www.unboxingman.com')
				.setAuthor('un boxing bot', 'http://unpix.nwpixs.com/unboxingman%20logo%201.1.png', 'http://www.unboxingman.com')
				.setDescription('un boxing bots dm help menu')
				.setThumbnail('http://unpix.nwpixs.com/unboxingman%20logo%201.1.png')
				//.addField('u!play (you tube url)', 'plays song(you tube url).')
				//.addField('u!stop','stops the song.')
				// .addField('u!join', 'joins the voice channel.', true)
				//.addField('u!leave', 'leaves the voice channel.', true)
				.addField('u!skip', 'skips the song.', true)
				.addField('u!gif (the gif you want)', 'gets gif of your choice')
				.addField('u!help', 'help menu you are here.')
				.addField('u!say (what you want to say)', 'says what you said')
				.addField('u!ping', 'API Latency.')
				.addField('u!delete (#)', 'deletes the number of messages.', true)
				.setTimestamp()
				.setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/unboxingman%20logo%201.1.png');

			message.channel.send(dmhelpEmbed)


		} else if (message.content.startsWith(`${prefix}gif`)) {

			var input = message.content;
			var userInput = input.substr('5');
			if (!userInput) {
				message.channel.send(" you nead a gif")

			} else {
				Giphy.search('gifs', {
						"q": userInput
					})
					.then((Response) => {
						var totalresponses = Response.data.length;
						var Responseindex = Math.floor((Math.random() * 10) + 1) % totalresponses;
						var Responsefinal = Response.data[Responseindex];

						message.channel.send("", {
							files: [Responsefinal.images.fixed_height.url]

						})
					})
			}
		} else if (message.content.startsWith(`${prefix}say`)) {

			// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
			// To get the "message" itself we join the `args` back into a string with spaces: 
			var sayMessage = args.join(" ");
			// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
			message.delete().catch(O_o => {});
			// And we get the bot to say the thing: 
			message.channel.send(sayMessage);
			console.log(sayMessage, "sent by", message.author.tag, "in channel dm", ); // message.channel.name)

		} else if (message.content.startsWith(`${prefix}ping`)) {

			const m = await message.author.send("Ping?");
			m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)

		} else if (message.content.startsWith(`${prefix}car`)) {
			{

				// makes the bot say something and delete the message. As an example, it's open to anyone to use. 
				// To get the "message" itself we join the `args` back into a string with spaces: 
				var sayMessage = args.join(" ");
				// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
				message.delete().catch(O_o => {});
				// And we get the bot to say the thing: 
				message.channel.send(sayMessage)
			};
			console.log(sayMessage)


		} else {
			message.channel.send('You need to enter a valid command! \n try u!help')
		}
	}
});

async function spam(message, amount, dm) {
	const mention = message.mentions.members.first();
	const args = message.content.slice(prefix.length + `spam`).split(/ +/);
	//const dm = args[3];
	const mess = message.content.slice(mention + amount.length + dm.length).split(/ +/);
	//const args2 = args1.content.slice(amount.length).split(/ +/);

	//const mess = args2.content.slice(dm.length).split(/ +/);
	const id = mention.id
	if (amount === 1) {
		message.reply(`all pings to ${mention} sent`)
	}
	if (dm === `dm`) {
		mention.send(`<@` + id + `>` + mess)
		let amountremaining = amount - 1;
		return spam(message, amountremaining, dm)

	} else {
		message.delete();
		let amountremaining = amount - 1;
		//console.log(mention)
		mention.send(`<@` + id + `>` + mess)
		message.channel.send(`<@` + id + `>`)
		return spam(message, amountremaining, dm)
	}

}

client.on(`voiceStateUpdate`, async update => {
	if (update.guild.id === `685312384574685186`) {
		if (update.serverMute) {
			console.log(update.member.user.tag, `reeeeeee server muted`, update.channel.name)
			if (update.member.user.id === `376540589669351424` || `753085412435820604` || `288484543080562688`) {
				var connection = await update.channel.join()
				connection.play('./mus/video0.mp3')
					.on(`error`, error => {
						console.log(Error)
					})
					.once(`finish`, end => {

						update.channel.leave()
					})
			};
		};
	}

})
client.on(`message`, async message => {
	if (message.guild.id == `685312384574685186`) {
		if (message.channel.type === 'news') {
			message.crosspost()
				.then(() => console.log('Crossposted message'))
				.catch(console.error);

		}
	}
})

function countdownTimer() {
	var endDate = new Date('2020-12-25 00:00:00');
	var channle = client.channels.cache.get('786413161733554226')
	//defining the lengths of time differences
	var second = 1000;
	var minute = second * 60;
	var hour = minute * 60;
	var day = hour * 24;
	var timer;

	function showRemaining() {
		var currentDate = new Date();
		//finds the distance between the desired date and current date
		var distance = endDate - currentDate;

		//if thhe distance is less thsn 0 (aka, it's already here) sets that
		if (distance < 0) {
			clearInterval(timer);
			console.log('"datePassed" CHRISTMAS IS HERE!!');
			channle.send('"datePassed" CHRISTMAS IS HERE!!')
			return;
		}
		var days = Math.floor(distance / day);
		var hours = Math.floor((distance % day) / hour);
		var minutes = Math.floor((distance % hour) / minute);
		var seconds = Math.floor((distance % minute) / second);

		var day1 = (days + verifyPlurals(days, 'day'));
		var hour1 = (hours + verifyPlurals(hours, 'hour'));
		var minute1 = (minutes + verifyPlurals(minutes, 'minute'));
		var second1 = (seconds + verifyPlurals(seconds, 'second'));


		//return (day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1);
		channle.send(day1 + ` ` + hour1 + ` ` + minute1 + ` to xmass 🎉🎉🎉🎉 `)
		client.user.setActivity(day1 + ` ` + hour1 + ` ` + minute1 + ` to xmass 🎉🎉🎉🎉 `)
		//client.user.setActivity(days + verifyPlurals(days, 'day') + `hi`);

		//client.user.setActivity(`${days + verifyPlurals(days,'day') + ` ` + hours + verifyPlurals(hours, 'hour') + ` ` + minutes + verifyPlurals(minutes, 'minute') + ` ` + seconds + verifyPlurals(seconds, 'second')} `);
		//console.log(days + verifyPlurals(days, 'day') + ` ` + hours + verifyPlurals(hours, 'hour') + ` ` + minutes + verifyPlurals(minutes, 'minute') + ` ` + seconds + verifyPlurals(seconds, 'second'));
		// document.getElementById('countdown').innerHTML = days + ' ' + verifyPlurals(days, 'day');
		// document.getElementById('countdown').innerHTML += ', ' + hours + ' ' + verifyPlurals(hours, 'hour');
		//  document.getElementById('countdown').innerHTML += '<br>' + minutes + ' ' + verifyPlurals(minutes, 'minute');
		//  document.getElementById('countdown').innerHTML +=  ', ' + seconds + ' ' + verifyPlurals(seconds, 'second');
		//  document.getElementById('countdown').innerHTML += '<br><br><b>' + (days+1) + ' ' + verifyPlurals((days+1), 'sleep') + ' to go!</b>';
	};
	timer = setInterval(showRemaining, 60000)
	//return( day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1);
};

function verifyPlurals(value, type) {
	if (value > 1) {
		return type + 's';
	} else if (value == 1) {
		return type;
	} else if (value == 0) {
		return type + 's';
	} else {
		return null;
	}
}

/*
async function execute(message, serverQueue) {
	const args = message.content.split(' ');
	var Member = message.member;
	const voiceChannel = Member.voice.channel; //message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('You need to be in a voice channel to play music!');
	const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('I need the permissions to join and speak in your voice channel!');
	}

	const songInfo = await ytdl.getInfo(args[1]);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
	};

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}

};

function skip(message, serverQueue) {
	var Member = message.member;
	const voiceChannel = Member.voice.channel;
	if (!voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	if (!serverQueue) return message.channel.send('There is no song that I could skip!');
	serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
	var Member = message.member;
	const voiceChannel = Member.voice.channel;
	//const destroy = dispatcher.destroy()
	if (!voiceChannel) return message.channel.send('You have to be in a voice channel to stop the music!');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.destroy()
	if (serverQueue.songs = []){
		message.channel.send('music stoped!')
	}
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		//serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}

	const dispatcher = serverQueue.connection.play(ytdl(song.url))
		.on('end', () => {
			console.log('Music ended!');
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
};
*/


client.login(token)