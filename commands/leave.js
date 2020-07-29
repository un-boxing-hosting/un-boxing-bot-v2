module.exports = {
	name: 'leave',
    aliases: ['lea', 'stop'],
	description: 'Makes the bot leave the voice channel.',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
	async execute(bot, message, args) {
        const Member = message.member;
	    const voiceChannel = Member.voice.channel;
        const player = bot.music.players.get(message.guild.id);

        if(!player) return message.channel.send("No song/s currently playing in this guild.");
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the leave command.");

        bot.music.players.destroy(message.guild.id);
        return message.channel.send("Successfully stopped the music.")
	},
};