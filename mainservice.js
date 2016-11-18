var express = require('express');
var bodyParser = require('body-parser');
var req = require('request');
var bluebird = require('bluebird');
var _ = require('lodash');
var requester = require('request');

module.exports = function(app){
    return _.assign({},{
        setup: function(){
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(express.static(__dirname + '/dist/'));
            app.use('/bower_components', express.static(__dirname+'/bower_components'));
            app.get('/api/getexample', function(req, res){
                res.status(200).send({user:username});
            });
            app.post('/api/postexample', function(request, response){
                console.log('Received request');
                var beautifyOpts = {};
                var json = request.body;

                response.status(200).send({
                    mytest: json,
                    stringresult: 'String result test post'
                });
            });
        }
    });
}

//app.use('/fonts', express.static(__dirname + '/dist/fonts/'));