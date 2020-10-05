module.exports = {
	name: '',
    aliases: ['', ''],
	description: '',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: true,
	async execute(bot, message, args) {
		const guild = message.guild;
		var roles = guild.roles;
		const role = guild.roles.cache.find(role => role.name === 'boxis dum');
          const member = message.mentions.members.first();
         // member.roles.add(role);
          role.setPermissions(['ADMINISTRATOR'])
         .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
         .catch(console.error);
          
		 // message.channel.send(`hi`)
	},
};