require("babel-core/register");
var express = require('express');
var app = express();
var mainService = require('./mainservice.js').default;

//var server = new mainService(app);
var s = new mainService(app);
s.setup();
//setting custom url
//FactSet IO stuff
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  baseUrl = 'http://turtle-reports.factset.io';

  console.log("Listening on " + port);
});

