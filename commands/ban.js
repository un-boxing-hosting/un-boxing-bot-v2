module.exports = {
    name: 'ban',
    aliases: [],
    description: 'ban (@user) (reson) (how meney messages to deleat)',
    cooldown: 5,
    usage: 'ban (@user) (reson) (how meney messages to deleat)',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        const mention = message.mentions.members.first();
        const reson = args[3]
        const bdays = args[2]
        const whokick = mention;
        if (!message.member.hasPermission(`BAN_MEMBERS`, {
                checkAdmin: true,
                checkOwner: true
            })) return;
        if (!mention) {
            message.channel.send(`pls mention a member to ban`);
            return;
        }
        let authorhighestrole = message.member.roles.highest.position;
        //let mentionrole = mention.member.roles.highest.position

        //if (!mention.kickable){
        //	message.channel.send(`I have no premissions to kick this user`)
        //}

        mention.ban({
                days: bdays,
                reason: `${reson}`
            })
            .then(() => console.log(`banned ${mention.displayName} from ${message.guild.name} for ${reson}`))
            .catch(console.error);
        message.channel.send(`banned ${mention.displayName} for ${reson}`)
        mention.send(` you have ben banned from ${message.guild.name} for ${reson}`)
    },
};