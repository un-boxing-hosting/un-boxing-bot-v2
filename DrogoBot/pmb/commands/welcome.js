module.exports = {
        name: 'welcome',
        description: 'welcome command',
        usage: '',
        async execute(message, args) {
    message.delete()
    message.channel.send("Welcome to the server! My name is DrogoBot and I am cool.")
        },
    };