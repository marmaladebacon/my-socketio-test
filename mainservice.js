import express from 'express';
import bodyParser from 'body-parser';
import req from 'request';
import bluebird from 'bluebird';
import _ from 'lodash';
import requester from 'request';
import SocketIO from 'socket.io';
import Http from 'http';
import Player from './server/Player.js';
import Nom from './server/Nom.js';

export default class MainService{
    constructor(app, server){
        this.app = app;
        this.server = server;
        this.io = new SocketIO(this.server);
        this.ioMyNsp = this.io.of('/mynsp');
        this.setup(app);
        this.sockets = [];
        this.socket_viewers = [];
        //his.players = new Map(); //convert to array
        this.players = [];
        this.noms = [];

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
            console.log('user connected to all');
            //console.log(socket);
            socket.emit('identity', {id: socket.id, rooms: socket.rooms });
            this.sockets.push(socket);

            socket.on("join", (data)=>{
                socket.join(data.roomName);
                console.log('joining '+data.roomName);
                data.radius = 0.01;
                switch(data.roomName){
                    case 'viewers': this.socket_viewers.push(socket);break;
                    case 'players':
                        console.log('joining players');
                        this.players.push( new Player(socket.id, data));
                        this.setupPlayerSocket(socket);
                        break;
                }

            });

            socket.on('disconnect', ()=>{
                console.log('user disconnected from all');
                _.remove(this.socket_viewers, (n)=>{return n.id === socket.id;});
                _.remove(this.players, (n)=>{return n.id == socket.id;});
                _.remove(this.sockets, (n)=>{return n.id === socket.id;});
            });
        });
        /* Basic socket io connection
        this.io.on('connection', (socket) => {
            console.log('user connected ');
            socket.on('disconnect', ()=>{
                console.log('user disconnected');
            });
        });*/
        var boundloop = this.logicloop.bind(this);
        var boundStatsLoop = this.statsLoop.bind(this);
        var boundSpawnNoms = this.spawnNomsLoop.bind(this);
        //30 updates a second
        setInterval(boundloop, 1000/30);
        //log the connected numbers every 5 seconds
        setInterval(boundStatsLoop, 5000);
        //Spawn new noms every 1 second
        setInterval(boundSpawnNoms, 1000);
    }

    logicloop(){
        //update players
        for(let i=0; i<this.players.length; i++){
            this.players[i].updateVelocity();
            this.players[i].updatePosition();
            this.players[i].updateEnergy();
            this.players[i].updateNomCollisions(this.noms);
            this.players[i].updateCollisionsWithPlayers(this.players);
        }
        for(let i=0; i<this.players.length; i++){
            this.players[i].resetCollisions();
        }

        var data = {
            connectedViewers: this.socket_viewers.length,
            connectedPlayers: this.players.size,
            players: this.players,
            noms: this.noms,
        }
        this.io.to('viewers').emit('viewerUpdate', data);
    }

    spawnNomsLoop(){
        if(this.noms.length < 15){
            let x = Math.random() * 0.8 +0.1;
            let y = Math.random() * 0.8 +0.1;
            let newNom = new Nom(x,y,Math.random()*0.005+ 0.005);
            this.noms.push(newNom);
        }

    }

    statsLoop(){
        console.log('Viewers count:'+this.socket_viewers.length);
        console.log('Players count:' +this.players.length);
    }

    setupPlayerSocket(socket){
        socket.on('setvelocity', (data)=>{
            let energyCost = (data.x + data.y) / 2 * 90;
            let p = this.getPlayer(socket.id);
            if(energyCost <= p._playerEnergy){
                //do action only if there's enough energy;
                p.intendedVelX = data.x;
                p.intendedVelY = data.y;
                p._playerEnergy -= energyCost;
                //console.log('Player using energy ' + energyCost);
            }else{

            }
        });
        socket.on('updateNomsLocations', ()=>{
            let energyCost = 5;
            let p = this.getPlayer(socket.id);
            if(energyCost <= p._playerEnergy){
                //this.updateNomsLocations = true;
                p._playerEnergy -= energyCost;
                socket.emit('nomsLocationsData', this.noms);
            }

        });
        socket.on('updateAllPlayersLocation', ()=>{
            let energyCost = 5;
            let p = this.getPlayer(socket.id);
            if(energyCost <= p._playerEnergy){
                //this.updateAllPlayersLocation = true;
                p._playerEnergy -= energyCost;
                let storeTemp = _.filter(this.players, (n)=>{
                    return n.id !== socket.id;
                });
                let data = [];
                for(let i =0; i<storeTemp.length; i++){
                    data.push({
                        playerName: storeTemp[i].playerName,
                        x:storeTemp[i].posx,
                        y:storeTemp[i].posy,
                        radius:storeTemp[i].radius,
                        velocity_x: storeTemp[i].velx,
                        velocity_y: storeTemp[i].vely
                    });

                }
                socket.emit('playersLocationsData', {data});
            }
        });
        socket.on('updatePlayerClientData', ()=>{
            let energyCost = 5;
            let p = this.getPlayer(socket.id);
            if(energyCost <= p._playerEnergy){
                //this.updatePlayerClientData = true;
                p._playerEnergy -= energyCost;
                let pdata = {
                    posX: p.posx,
                    posY: p.posy,
                    velocityX:p.velx,
                    velocityY:p.vely,
                    radius:p.radius,
                    energyLevel: p._playerEnergy,
                }
                socket.emit('playerClientData', pdata);
            }
        });

    }

    getPlayer(id){
        var result = _.find(this.players, (n)=>{
            return n.id === id;
        });
        return result;
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
