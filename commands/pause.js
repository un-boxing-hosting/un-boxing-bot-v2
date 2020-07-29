module.exports = {
	name: 'pause',
    aliases: ['pa', 'resume'],
	description: 'Makes the bot pause/resume the music currently playing.',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
	async execute(bot, message, args) {
        const player = bot.music.players.get(message.guild.id);
        if (!player) return message.channel.send("No song/s currently playing in this guild.");

        const Member = message.member;
	    const voiceChannel = Member.voice.channel;
        if (!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to pause music.");
        

        player.pause(player.playing);
        return message.channel.send(`Player is now ${player.playing ? "resumed" : "paused"}.`);
    
	},
};