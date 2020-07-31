var TeamSpeak = require("node-teamspeak-api")
var tsClient = new TeamSpeak('localhost', 25639);
tsClient.on('clientlist', function(err, resp) {
    console.log(resp.data)
});

tsClient.api.login({
    client_login_name: "test1",
    client_login_password: "zRj2flIm"
}, function(err, resp, req) {

    tsClient.api.use({
        sid: 1
    }, function(err, resp, req) {

        tsClient.api.clientlist(); // Don't set a callback and use tsClient.on function
    });
});