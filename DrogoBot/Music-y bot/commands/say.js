module.exports = {
	name: 'say',
    aliases: ['', ''],
	description: '',
    cooldown: 5,
    usage: '',
    args: true,
	async execute(bot, message, args) {
		if (message.member.hasPermission( 'MANAGE_MESSAGES', { checkAdmin:true, checkOwner: true })){
            var messagesay = message.content;
            var sayMessage= messagesay.substr('4');
            message.delete().catch(O_o=>{});  
            message.channel.send(sayMessage);
            console.log(sayMessage ,"sent by" ,message.author.tag,"in channel ", message.channel.name, "in guild", message.guild.name)
	}
},}