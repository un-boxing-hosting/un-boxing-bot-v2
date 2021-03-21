module.exports = {
    name: 'spam',
    aliases: ['', ''],
    description: '',
    cooldown: 5,
    usage: '',
    guildOnly: false,
    args: true,
    async execute(bot, message, args) {
        var amount = args[2]
        spam(message, amount)

        async function spam(message, amount) {
            const mention = message.mentions.members.first();
            //const args = message.content.slice(prefix.length + `spam`).split(/ +/);
            const dm = args[3];
            const mess = message.content.slice(mention, amount, dm).split(/\s+/g);
            //const args2 = args1.content.slice(amount.length).split(/ +/);

            //const mess = args2.content.slice(dm.length).split(/ +/);
            const id = mention.id
            if (amount === 1) {
                message.reply(`all pings to ${mention} sent`)
            }
            /*
            if (dm === `dm`) {
                mention.send(`<@` + id + `>` + mess)
                let amountremaining = amount - 1;
                return spam(message, amountremaining)
            }*/
            else {
                message.delete();
                let amountremaining = amount - 1;
                //console.log(mention)
                mention.send(`<@` + id + `>`)
                message.channel.send(`<@` + id + `>`)
                return spam(message, amountremaining)
            }

        }
    },
};