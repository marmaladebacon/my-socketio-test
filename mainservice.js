import express from 'express';
import bodyParser from 'body-parser';
import req from 'request';
import bluebird from 'bluebird';
import _ from 'lodash';
import requester from 'request';
import SocketIO from 'socket.io';
import Http from 'http';

export default class MainService{
    constructor(app, server){
        this.app = app;
        this.server = server;
        this.io = new SocketIO(this.server);
        this.setup(app);
        this.sockets = [];

    }
    setup(app){
        //console.log(app);
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



        app.get('/api/news/articles', this.getNewsApi);
        this.io.on('connection', (socket) =>{
            console.log('user connected');
            this.sockets.push(socket);
            socket.on('disconnect', ()=>{
                console.log('user disconnected');
                _.remove(this.sockets, (n)=>{return n.id === socket.id;});
            });
        });
        var boundloop = this.logicloop.bind(this);
        setInterval(boundloop, 3000);
    }
    logicloop(){
        console.log('This is a message');
        this.getNews().on('response', (response)=>{
            //console.log(response);
            response.on('data', (data)=>{
                var json = JSON.parse(data);
                _.forEach(this.sockets, (n)=>{
                    n.emit('news',json);
                });
            })
        });

    }
    getNewsApi(req, res){
        req.pipe(this.getNews()).pipe(res);
    }
    getNews(){
        //dc99949b87364d869af1efdb428d038c
         var url = 'https://newsapi.org/v1/articles';
         var qs = {
             source: 'techcrunch',
             apiKey: 'dc99949b87364d869af1efdb428d038c'
         }
         console.log('url used:'+url);
         var r = requester.get({uri:url, qs:qs});
         return r;
    }
}

//app.use('/fonts', express.static(__dirname + '/dist/fonts/'));