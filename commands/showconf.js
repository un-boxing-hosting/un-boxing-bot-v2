const defaultSettings  = require(`./setings.json`)
module.exports = {
	name: 'showconf',
    aliases: ['showc', ''],
	description: 'showconf',
    cooldown: 5,
    usage: '',
    guildOnly: true,
    args: false,
	async execute(bot, message, args) {
        
        const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
        let configProps = Object.keys(guildConf).map(prop => {
            return `${prop}  :  ${guildConf[prop]}`;
          });
          message.channel.send(`The following are the server's current configuration:
          \`\`\`${configProps.join("\n")}\`\`\``);
	},
};