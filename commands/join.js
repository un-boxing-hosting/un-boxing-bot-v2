
module.exports = {
	name: 'join',
    aliases: ['j'],
	description: 'join channel',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
	async execute(bot, message, args) {
		const Member = message.member;
        const voicechannel = Member.voice.channel;
        const botvoicechannel = bot.voice.channel;
        const player = bot.music.players.get(message.guild.id);
        if (botvoicechannel){
            bot.music.players.destroy(player.guild.id);
        } if (!botvoicechannel){
           
            voicechannel.join()
            player.pause(player.playing);
        }
	},
};