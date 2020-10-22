module.exports = {
	name: 'help',
    aliases: ['h', 'mainhelp'],
	description: 'help command',
    usage: '',
	async execute(message, args) {
		message.channel.send("DrogoBot help menu \n +help is the help command you already ran, dummy! \n +welcome Welcomes people. \n +say Tells the bot to say something in that channel. \n +gif Searches for gifs depending on what follows after the command.")
	},
};