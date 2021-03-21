module.exports = {
    name: 'users',
    aliases: ['guilds', 'channels'],
    description: 'how many users,channels and servers the bot has.',
    cooldown: 5,
    usage: '',
    guildOnly: false,
    args: false,
    async execute(bot, message, args) {
        message.channel.send(`${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`)
    },
};