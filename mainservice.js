var express = require('express');
var bodyParser = require('body-parser');
var req = require('request');
var bluebird = require('bluebird');
var _ = require('lodash');

module.exports = function(app){
    return _.assign({},{
        setup: function(){
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(express.static(__dirname + '/dist/'));
            app.use(function(request, response, next) {
                next();
            });
        }
    });
}