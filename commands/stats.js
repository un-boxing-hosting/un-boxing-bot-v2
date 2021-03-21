module.exports = {
    name: 'stats',
    aliases: [],
    description: '',
    cooldown: 5,
    usage: '',
    guildOnly: false,
    args: false,
    async execute(bot, message, args) {
        var widget = `https://discord.boats/api/widget/646225832607744012?type=png`
        message.channel.send(widget)
    },
};