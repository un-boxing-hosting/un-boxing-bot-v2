module.exports = {
    name: 'hello',
    description: "this is a help command!",
    execute(message, args) {

        message.channel.send('Hello I am MTM im a discord bot of course but why dose that matter im here to help you to get help or list of commands do %help');
        console.log('hello')


    }

}