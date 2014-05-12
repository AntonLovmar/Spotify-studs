var http = require('http');
var https = require('https');
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public_html'));

var httpServer = http.createServer(app);
httpServer.listen(8080);