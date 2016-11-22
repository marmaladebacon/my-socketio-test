require("babel-core/register");
var express = require('express');
var app = express();
var server = require('http').Server(app);
var mainService = require('./mainservice.js').default;
server.listen({
  host: '127.0.0.1',
  port: 8888
}, function () {
  var host = server.address().address;
  var port = server.address().port;
  baseUrl = 'http://'+host+':'+port;
  console.log('Example app listening at http://%s:%s', host, port);
});
var s = new mainService(app, server);


