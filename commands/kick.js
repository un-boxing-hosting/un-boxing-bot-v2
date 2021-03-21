module.exports = {
    name: 'kick',
    aliases: [],
    description: 'kick a user ',
    cooldown: 5,
    usage: '@ a user to kick',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        const mention = message.mentions.members.first();
        const reson = args[1]
        const whokick = mention;
        if (!message.member.hasPermission(`KICK_MEMBERS`, {
                checkAdmin: true,
                checkOwner: true
            })) {
            message.reply(`U have no premissions to kick`)
            return;
        }
        if (!mention) {
            message.channel.send(`pls mention a member to kick`);
            return;
        }
        let authorhighestrole = message.member.roles.highest.position;
        //let mentionrole = mention.member.roles.highest.position

        if (!mention.kickable) {
            message.channel.send(`I have no premissions to kick this user`)
            return;
        }

        mention.kick(reson)
            .then(() => console.log(`kicked ${mention.displayName} from ${message.guild.name} for ${reson}`))
            .catch(console.error);
        message.channel.send(`kicked ${mention.displayName} for ${reson}`)
        mention.send(` you have ben kicked from ${message.guild.name} for ${reson}`)
    },
};