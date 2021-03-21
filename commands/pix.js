module.exports = {
    name: 'pix',
    aliases: ['Avatar'],
    description: '@ the user/s for ther pix or yours',
    cooldown: 5,
    usage: '@ the user/s for ther pix',
    guildOnly: false,
    args: false,
    async execute(bot, message, args) {
        if (!message.mentions.users.size) {
            message.channel.send(`Your avatar:`, {
                files: [message.author.displayAvatarURL({
                    format: "png",
                    dynamic: true
                })]
            });

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
        message.channel.send(avatarList, {
            files: [message.author.displayAvatarURL({
                format: "png",
                dynamic: true
            })]
        });

    },
};