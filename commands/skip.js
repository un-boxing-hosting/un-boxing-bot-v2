module.exports = {
	name: 'skip',
    aliases: ['s', 'next'],
	description: 'Skips the song currently playing.',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
	async execute(bot, message, args) {
        const player = bot.music.players.get(message.guild.id);
        if(!player) return message.channel.send("No song/s currently playing in this guild.");

        const Member = message.member;
	    const voiceChannel = Member.voice.channel;
        if(!voiceChannel || voiceChannel.id !== player.voiceChannel.id) return message.channel.send("You need to be in a voice channel to use the skip command.");

        player.stop();
        return message.channel.send("Skipped the current song!");
	},
};