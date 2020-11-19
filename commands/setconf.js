const defaultSettings  = require(`./setings.json`)
module.exports = {
	name: 'setconf',
    aliases: ['sc'],
	description: 'setconf for your server',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: true,
	async execute(bot, message, args) {

    const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
    const rolename = guildConf.adminRole
    const adminRole = message.guild.roles.cache.fetch("Administrator", guildConf.adminRole);
    //const adminRole = message.guild.roles.cache.find(role => role.name === rolename);
    if(!adminRole) return message.reply("Administrator Role Not Found");
    /*
    try {
        if(!message.member.roles.cache.has(adminRole.id) || !message.member.hasPermission(`MANAGE_MESSAGES`, { checkAdmin: true, checkOwner: true})) {
            msg = message.member.roles.cache.has(adminRole.id)
            console.log(msg)
           // console.log(adminRole)
           // message.channel.send(`fuck`)
        }
       // message.channel.send(`${adminRole.id}`)
    } catch (err){
        console.log(err)
    }
    */
    
    if(!message.member.roles.cache.has(adminRole.id ) || !message.member.hasPermission(`MANAGE_MESSAGES`, { checkAdmin: false, checkOwner: false})) {
        console.log(adminRole, adminRole.id)
        return message.reply("You're not an admin, sorry!");
    }
    
    const [prop, ...value] = args;
    if(!bot.settings.has(message.guild.id, prop)) {
        return message.reply("This key is not in the configuration.");
    }
    bot.settings.set(message.guild.id, value.join(" "), prop);
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
    console.log(adminRole, adminRole.id)
    
     //!message.member.hasPermission(`MANAGE_MESSAGES`, { checkAdmin: true, checkOwner: true})
    }
    
};