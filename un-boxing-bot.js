const Discord = require('discord.js');
const {
    prefix,
    token,
    GIPHYtoken,
    y_search,
    gbltoken,
    clientid,
    channelID,
    nodes
} = require('./mus-config-dev.json');
//const defaultSettings = require(`./commands/setings.json`)
const ytdl = require('ytdl-core');
const ffmpeg = require('ffmpeg');
const GphApiClient = require('giphy-js-sdk-core');
const search = require('youtube-search');
const GBL = require('gblapi.js');
const fs = require('fs');
const {
    ErelaClient,
    Utils
} = require('erela.js')
const bot = new Discord.Client();
const client = new Discord.Client();
const Giphy = GphApiClient(GIPHYtoken);
const cooldowns = new Discord.Collection();
const db = require('quick.db');
//const Enmap = require('enmap');
//const fs = require('fs-extra');
bot.commands = new Discord.Collection();

(function () {
    var oldlog = console.log;
    var t = new Date()
    var d = t.getDate();
    var m = t.getMonth();
    var y = t.getFullYear();
    var file = `boxing-logs/logs-${`${m}-${d}-${y}`}.txt`
    //fs.createFile(file, function(err){console.log(`${err} help me`);});
    var stream = fs.createWriteStream(file, {
        flags: 'a'
    })
    console.log = function (message) {

        stream.write(message + "\n")
        oldlog.apply(console, arguments);
    };
})();

bot.on('message', async dmmessage => {

    if (!dmmessage.channel.type === 'dm') return;
    if (dmmessage.channel.type === 'dm') {
        //if (dmmessage.author.bot) return
        const dms = dmmessage.content;
        const dmauthor = dmmessage.author.tag;
        //console.log(`message ${dms} sent by ${dmauthor} in dm`)
        const channel = bot.channels.cache.get(`${channelID}`)
        const dmEmbed = new Discord.MessageEmbed()

            .setColor('GREEN')
            .setTitle('new DM')
            .setURL('http://www.unboxingman.com')
            .setAuthor('un boxing bot', 'http://unpix.nwpixs.com/logo.png', 'http://www.unboxingman.com')
            .setDescription(` Received: ${dms}`)
            .setThumbnail('http://unpix.nwpixs.com/logo.png')
            .addFields(
                //{ name: 'new dm message', value: `${dms}` }, 
                {
                    name: `by ${dmauthor}`,
                    value: `.`
                },
            )
            .setTimestamp()
            .setFooter('made by un boxing man yt', 'http://unpix.nwpixs.com/unboxingman%20logo%201.1.png')

        channel.send(dmEmbed)
        console.log(`message ${dms} sent by ${dmmessage.author.tag} in dm`)
    }
});

//#region 

bot.on(`messageReactionAdd`, async react => {
    // if (!channel.guild) return;
    //if (react.)
    //var y = db.get(`channelcreate_${channel.guild.id}`)
    //if (y !== 'enabled') return;
    // var x = db.get('loggingchannel_' + channel.guild.id)
    //var x = bot.channels.cache.get(x)
    return;

})

bot.on('messageDelete', async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }

    }

    if (message.guild) {
        // if (message.author.bot) return;
        var y = db.get('messagedelete_' + message.guild.id)
        if (y !== `enabled`) return;
        var x = db.get('loggingchannel_' + message.guild.id)
        x = bot.channels.cache.get(x)
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        const deletionLog = fetchedLogs.entries.first();
        const {
            executor,
            target
        } = deletionLog;
        if (message.channel == x) {
            var embed = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setAuthor('message deleted', message.guild.iconURL)
                .addField('user', message.author.tag)
            if (!deletionLog) {
                embed.addField(`was deleted, but no relevant audit logs were found.`)
            }
            if (deletionLog) {
                embed.addField('deleteed by', executor.tag)

            }
            if (message.content) {

                embed.addField('message', message.content)

            }

            embed.addField('channel', message.channel)
            embed.setTimestamp()
            message.guild.owner.send(embed).catch()
            x.send(`dmed the guild owner :)`)
            return;
        }
        var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor('message deleted', message.guild.iconURL)
            .addField('user', message.author.tag)
        if (!deletionLog) {
            embed.addField(`was deleted, but no relevant audit logs were found.`)
        } else {
            embed.addField('deleteed by', executor.tag)
        }
        embed.addField('message', message.content)
        embed.addField('channel', message.channel)
        embed.setTimestamp()
        x.send(embed).catch()
    }

});
bot.on("channelCreate", async function (channel) {
    if (!channel.guild) return;
    var y = db.get(`channelcreate_${channel.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + channel.guild.id)
    var x = bot.channels.cache.get(x)
    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('channel created', channel.guild.iconURL)
        .addField('channel', channel)
        .addField('channel id', channel.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()


});
bot.on("channelDelete", async function (channel) {
    if (!channel.guild) return;
    var y = db.get(`channelcreate_${channel.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + channel.guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('channel deleted', channel.guild.iconURL)
        .addField('channel name', channel.name)
        .addField('channel id', channel.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()


});
bot.on("emojiCreate", async function (emoji) {

    var y = db.get(`emojicreate_${emoji.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + emoji.guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('emoji created', emoji.url)
        .addField('emote name', emoji.name)
        .addField('emote', emoji + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()


});
bot.on("emojiUpdate", async function (emoji1, emoji2) {

    var y = db.get(`emojiUpdate_${emoji1.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + emoji1.guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('emoji Updated', emoji1.url)
        .addField('old emote name', emoji1.name)
        .addField('new emote name', emoji2.name)
        .addField('emote', emoji1 + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()


});
bot.on("emojiDelete", async function (emoji) {
    var y = db.get(`emojidelete_${emoji.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + emoji.guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor('emoji deleted', emoji.url)
        .addField('emote name', emoji.name)
        .addField('emote url', emoji + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()


});
bot.on("guildBanAdd", async function (guild, user) {

    var y = db.get(`guildbanadd_${guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("user banned", guild.iconURL)
        .addField('banned user', user.tag)
        .addField('user id', user.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()

});
bot.on("guildBanRemove", async function (guild, user) {

    var y = db.get(`guildbanremove_${guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("user unbanned", guild.iconURL)
        .addField('unbanned user', user.tag)
        .addField('user id', user.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()
});
bot.on("guildMemberAdd", async function (member) {
    var y = db.get(`guildmemberaddrole_${member.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('joinrole_' + member.guild.id)
    member.roles.add(x)
    // var x = bot.channels.cache.get(x)
});
bot.on("guildMemberAdd", async function (member) {
    // console.log(member.user.tag)
    var y = db.get(`guildmemberadd_${member.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + member.guild.id)
    var x = bot.channels.cache.get(x)

    var embed1 = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("user join", member.guild.iconURL)
        .addField('user tag', member.user.tag)
        .addField('user id', member.user.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed1).catch()
});
bot.on(`guildMemberRemove`, async function (member) {
    // console.log(member.user.tag)
    var y = db.get(`guildmemberremove_${member.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + member.guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("user left", member.guild.iconURL)
        .addField('user tag', member.user.tag)
        .addField('user id', member.user.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()

});
bot.on("messageDeleteBulk", async function (messages) {

    var y = db.get(`messagebulkdelete_${messages.random().guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + messages.random().guild.id)
    var x = bot.channels.cache.get(x)
    if (messages.random().channel == x) return;

    await messages.array().reverse().forEach(m => {
        var x = m.createdAt.toString().split(' ')
        fs.appendFile('messagebulkdelete.txt', `[${m.author.tag}], [#${m.channel.name}]: ["${m.content}"], created at [${x[0]} ${x[1]} ${x[2]} ${x[3]} ${x[4]}]\n\n`, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    });

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("message bulk delete", messages.random().guild.iconURL)
        .addField('channel', messages.random().channel)
        .addField('messages count', messages.array().length + `\n**----------------------**`)
        .setTimestamp()
    await x.send(embed).catch()
    await x.send(`Here is the log file for the deleted messages: \n`).catch()
    await x.send(({
        files: [{
            attachment: 'messagebulkdelete.txt'
        }]
    })).catch()

    fs.unlink('messagebulkdelete.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

});
bot.on("roleCreate", async function (role) {
    var y = db.get(`rolecreate_${role.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + role.guild.id)
    var x = bot.channels.cache.get(x)


    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("role Create", role.guild.iconURL)
        .addField('role name', role.name)
        .addField('role id', role.id + `\n**----------------------**`)
        .setTimestamp()
    x.send(embed).catch()

});
bot.on("roleDelete", async function (role) {

    var y = db.get(`roledelete_${role.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + role.guild.id)
    var x = bot.channels.cache.get(x)

    var embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor("role deleted", role.guild.iconURL)
        .addField('role name', role.name)
        .addField('role id', role.id + `\n**----------------------**`)
        .setTimestamp()

    // x.send(embed).catch()

});
bot.on(`roleUpdate`, async function (role1, role2) {
    var y = db.get(`roleupdate_${role1.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + role1.guild.id)
    var x = bot.channels.cache.get(x)
    const role1Permissions = role1.permissions.toArray();
    const role2Permissions = role2.permissions.toArray();
    var embed = new Discord.MessageEmbed()
    if (arrayDiff(role1Permissions, role2Permissions).length !== 0) {
        embed.setColor('RANDOM')
        embed.setAuthor("role update", role1.guild.iconURL)
        if (role1.name == role2.name) {
            embed.addField(`role name`, role1.name)
        }
        embed.addField(`prms`, arrayDiff(role1Permissions, role2Permissions))
        embed.setTimestamp()
        // x.send(embed).catch()
    }
    if (role1.color !== role2.color) {
        embed.setColor(role2.color)
        embed.setAuthor("role update", role1.guild.iconURL)
        embed.addFields({
            name: `old color`,
            value: role1.color,
        }, {
            name: `new color`,
            value: role2.color,
            inline: true
        });
        embed.setTimestamp()
        //x.send(embed).catch()
    }
    if (role1.name !== role2.name) {
        embed.setColor('RANDOM')
        embed.setAuthor("role update", role1.guild.iconURL)
        embed.addFields({
            name: `old name`,
            value: role1.name,
        }, {
            name: `new name`,
            value: role2.name,
            inline: true
        });
        embed.setTimestamp()
        //x.send(embed).catch()
    }
    if (role1.position !== role2.position) {
        console.log(role1.position, role2.position);
    };
    if (role1.name !== role2.name || role1.color !== role2.color || arrayDiff(role1Permissions, role2Permissions).length !== 0) {
        x.send(embed).catch()
    } else return;

});
bot.on(`messageUpdate`, async function (oldmess, newmess) {
    var y = db.get(`messageUpdate_${oldmess.guild.id}`)
    if (y !== 'enabled') return;
    var x = db.get('loggingchannel_' + oldmess.guild.id)
    var x = bot.channels.cache.get(x)
    /*
        var embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor("message Updated", oldmess.guild.iconURL)
            .addField('message Updated by', oldmess.author)
            .addField('message Updated in channel', oldmess.channel)
            .addField('message Updated from', oldmess.content)
            .addField('message Updated to', newmess.content)
            .addField('message id', newmess.id + `\n**----------------------**`)
            .setTimestamp()

        //x.send(embed) //.catch()
    */

})
//#endregion
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}
bot.prefix = prefix;
/*
bot.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
  });
  /*
  const defaultSettings = {
    prefix: "!",
    modLogChannel: "mod-log",
    modRole: "Moderator",
    adminRole: "Administrator",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"
  }
  */

bot.on("ready", () => {
    bot.music = new ErelaClient(bot, nodes);
    // Listens to events.
    bot.music.on("nodeConnect", node => console.log("New node connected"));
    bot.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    bot.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`));
    bot.music.on("queueEnd", player => {
        player.textChannel.send("Queue has ended.")
        bot.music.players.destroy(player.guild.id);
    });
    console.log(`Bot has started, with ${bot.users.cache.size} users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.`);
    // console.log(countdownTimer())
    bot.user.setActivity(`"${prefix}help" for help`);
    //bot.user.setActivity('🦃happy thanksgiving🦃')
    //bot.user.setActivity(`🍰 happy b-day un boxing man 🍰`, { type: `WATCHING`})
});
/*
  bot.on("guildDelete", guild => {
    bot.settings.delete(guild.id);
  });

  bot.on(`guildMemberAdd`, member => {
    bot.settings.ensure(member.guild.id, defaultSettings);
    let welcomeMessage = bot.settings.get(member.guild.id, "welcomeMessage");
    welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)
    member.guild.channels
    .resolve("name", bot.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
  })
*/
bot.on('message', async message => {
    if (message.author.bot) return;
    //const guildConf = bot.settings.ensure(message.guild.id, defaultSettings);
    if (!message.content.startsWith(prefix)) return;
    //const voicechannel = Member.voice.channel;
    //const serverQueue = queue.get(message.guild.id);
    const args = message.content.split(/\s+/g);
    const commandName = args.shift().slice(prefix.length).toLowerCase();

    //const args = message.content.slice(prefix.length).split(/ +/);
    //const commandName = args.shift().toLowerCase();

    const command = bot.commands.get(commandName) ||
        bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');

    }
    if (command.args && !args.length) {
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);

    }
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }


    }
    try {
        command.execute(bot, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

function arrayDiff(a1, a2) {
    var a = [],
        diff = [];
    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }
    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }
    for (var k in a) {
        diff.push(k);
    }
    return diff;
}

function countdownTimer() {
    var endDate = new Date('2020-12-25 00:00:00');

    //defining the lengths of time differences
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var timer;

    function showRemaining() {
        var currentDate = new Date();
        //finds the distance between the desired date and current date
        var distance = endDate - currentDate;

        //if thhe distance is less thsn 0 (aka, it's already here) sets that
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<h1 id="datePassed">CHRISTMAS IS HERE!!</h1>';

            return;
        }
        var days = Math.floor(distance / day);
        var hours = Math.floor((distance % day) / hour);
        var minutes = Math.floor((distance % hour) / minute);
        var seconds = Math.floor((distance % minute) / second);

        var day1 = (days + verifyPlurals(days, 'day'));
        var hour1 = (hours + verifyPlurals(hours, 'hour'));
        var minute1 = (minutes + verifyPlurals(minutes, 'minute'));
        var second1 = (seconds + verifyPlurals(seconds, 'second'));


        //return (day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1);
        bot.user.setActivity(day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1 + ` to xmass 🎉🎉🎉🎉 `)
        //client.user.setActivity(days + verifyPlurals(days, 'day') + `hi`);

        //client.user.setActivity(`${days + verifyPlurals(days,'day') + ` ` + hours + verifyPlurals(hours, 'hour') + ` ` + minutes + verifyPlurals(minutes, 'minute') + ` ` + seconds + verifyPlurals(seconds, 'second')} `);
        //console.log(days + verifyPlurals(days, 'day') + ` ` + hours + verifyPlurals(hours, 'hour') + ` ` + minutes + verifyPlurals(minutes, 'minute') + ` ` + seconds + verifyPlurals(seconds, 'second'));
        // document.getElementById('countdown').innerHTML = days + ' ' + verifyPlurals(days, 'day');
        // document.getElementById('countdown').innerHTML += ', ' + hours + ' ' + verifyPlurals(hours, 'hour');
        //  document.getElementById('countdown').innerHTML += '<br>' + minutes + ' ' + verifyPlurals(minutes, 'minute');
        //  document.getElementById('countdown').innerHTML +=  ', ' + seconds + ' ' + verifyPlurals(seconds, 'second');
        //  document.getElementById('countdown').innerHTML += '<br><br><b>' + (days+1) + ' ' + verifyPlurals((days+1), 'sleep') + ' to go!</b>';
    };
    timer = setInterval(showRemaining, 10000)
    //return( day1 + ` ` + hour1 + ` ` + minute1 + ` ` + second1);
};

function verifyPlurals(value, type) {
    if (value > 1) {
        return type + 's';
    } else if (value == 1) {
        return type;
    } else if (value == 0) {
        return type + 's';
    } else {
        return null;
    }
}



bot.on('error', e => {
    console.log(e)
})
bot.login(token).catch(e => console.log(e));
bot.on('error', e => {
    console.log(e)
})
bot.login(token).catch(e => console.log(e));