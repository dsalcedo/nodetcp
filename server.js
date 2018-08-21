const net = require('net');
const queclink = require('queclink-parser');
const request = require('request');
const dotenv = require("dotenv").config();
const host = dotenv.parsed.WEBHOOK;
const port = dotenv.parsed.PORT;

console.log("Server started");

const server = net.createServer(function(client) {

    client.setEncoding('utf-8');

    client.on('data', function (data) {
        let raw = new Buffer.from(data);
        // let parsed = queclink.parse(raw);
        request.post(host, { form: { ip: '1.1.1.1', content: raw } });
        client.write("200");
    });

    client.on('timeout', function () {
        client.write("504");
    });

    client.on('error', function (err) {
        client.write("409");
    });

});

server.listen(port, '0.0.0.0');
