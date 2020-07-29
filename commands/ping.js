module.exports = {
	name: 'ping',
	description: 'Ping!',
	async execute(bot, message, args) {
     const msg = await message.channel.send('Pinging...');
      msg.edit(`Your latency is ${Math.floor(msg.createdAt - message.createdAt)}ms`);
    }
};