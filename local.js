var express = require('express');
var app = express();
var mainService = require('./mainservice.js');

//var server = new mainService(app);
var s = new mainService(app);
s.setup();
//setting custom url
//var server = app.listen(8080,'127.0.0.1', function () {
var server = app.listen(8888,'mkopc.pc.factset.com', function () {
  var host = server.address().address;
  var port = server.address().port;
  baseUrl = 'http://'+host+':'+port;
  console.log('Example app listening at http://%s:%s', host, port);
});
