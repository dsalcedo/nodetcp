const net = require('net');
const request = require('request');
const dotenv = require("dotenv").config();
const host = dotenv.parsed.WEBHOOK;
const port = dotenv.parsed.PORT;

console.log("Server started");

const server = net.createServer(function(client) {
	
  let clientIp = client.remoteAddress;

    client.setEncoding('utf-8');
    client.setTimeout(6000);

    client.on('data', function (data) {
        let temp = data.toString();
        console.log(temp);
            request.post(host, {form:{ip:clientIp, content: temp}});
            client.write(200);
            client.end();
    });

    client.on('timeout', function () {
        client.write(504);
    });

    client.on('error', function (err) {
        client.write(409);
    });

});

server.listen(port, '0.0.0.0');