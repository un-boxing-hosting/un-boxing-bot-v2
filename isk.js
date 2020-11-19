client.on("message", async (message) => {
    // This stops if it's not a guild (obviously), and we ignore all bots.
    // Pretty standard for any bot.
    if(!message.guild || message.author.bot) return;
  
    // We can use ensure() to actually grab the default value for settings,
    // if the key doesn't already exist. 
    const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
  
    // Now we can use the values! 
    // We stop processing if the message does not start with our prefix for this guild.
    if(message.content.indexOf(guildConf.prefix) !== 0) return;
  
    //Then we use the config prefix to get our arguments and command:
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(guildConf.prefix.length).toLowerCase();
  
    // Commands Go Here
      // Alright. Let's make a command! This one changes the value of any key
    // in the configuration.
    if(command === "setconf") {
      // Command is admin only, let's grab the admin value: 
      const adminRole = message.guild.roles.fetch("name", guildConf.adminRole);
      if(!adminRole) return message.reply("Administrator Role Not Found");
  
      // Then we'll exit if the user is not admin
      if(!message.member.hasPermission(`MANAGE_MESSAGES`, { checkAdmin: true, checkOwner: true}) || !message.member.roles.cache.has(adminRole.id )) {
        return message.reply("You're not an admin, sorry!");
     }
  
      // Let's get our key and value from the arguments. 
      // This is array destructuring, by the way. 
      const [prop, ...value] = args;
      // Example: 
      // prop: "prefix"
      // value: ["+"]
      // (yes it's an array, we join it further down!)
  
      // We can check that the key exists to avoid having multiple useless, 
      // unused keys in the config:
      if(!client.settings.has(message.guild.id, prop)) {
        return message.reply("This key is not in the configuration.");
      }
  
      // Now we can finally change the value. Here we only have strings for values 
      // so we won't bother trying to make sure it's the right type and such. 
      client.settings.set(message.guild.id, value.join(" "), prop);
  
      // We can confirm everything's done to the client.
      message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
    }
    if(command === "showconf") {
      let configProps = Object.keys(guildConf).map(prop => {
        return `${prop}  :  ${guildConf[prop]}`;
      });
      message.channel.send(`The following are the server's current configuration:
      \`\`\`${configProps.join("\n")}\`\`\``);
    }
  });