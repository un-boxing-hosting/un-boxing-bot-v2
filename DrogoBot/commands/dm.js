module.exports = {
	name: 'dm',
	description: 'dm command',
    usage: '',
    args: 'true',
	async execute(bot, message, args) {
//const mentionmessage = message.content.slice(5);
if(mention == null) { return; }
message.delete();
//mentionmessage.slice(mention);
mention.send(mentionmessage);
message.channel.send("done!")
	},
};