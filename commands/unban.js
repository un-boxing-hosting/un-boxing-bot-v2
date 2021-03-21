module.exports = {
    name: 'unban',
    aliases: [],
    description: 'unbans a user',
    cooldown: 5,
    usage: 'send a user id to unban',
    guildOnly: true,
    args: true,
    async execute(bot, message, args) {
        const mention = message.mentions.members.first();
        const reson = args[3]
        const buser = args[1]
        const whokick = mention;
        const guild = message.guild;
        if (!message.member.hasPermission(`BAN_MEMBERS`, {
                checkAdmin: true,
                checkOwner: true
            })) return;
        if (!buser) {
            message.channel.send(`pls send a member id to unban`);
            return;
        }
        //let authorhighestrole = message.member.roles.highest.position;
        //let mentionrole = mention.member.roles.highest.position

        //if (!mention.kickable){
        //	message.channel.send(`I have no premissions to kick this user`)
        //}
        //buser.send(` you have ben unbanned from ${message.guild.name} for ${reson}`)
        guild.members.unban(buser)
            .then(() => console.log(`unbanned ${buser} from ${message.guild.name} for ${reson}`))
            .catch(console.error);
        message.channel.send(`unbanned ${buser} for ${reson}`)
    },
};