<template>
    <div id="gameArea">
        <canvas id="gameCanvas" style="border: 1px solid green"></canvas>
        <div id="statsPanel"></div>
    </div>
</template>
<script>
import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import JqueryGrid from './jquery-gridstack.vue';
import $ from 'jquery';
import menuTilesList from './menu-tiles-list.vue';
import DrawingMgr from './../utility/drawingMgr.js';

module.exports = {
    name: 'simulation',
    components: {

    },
    data(){
        return {
            count: 0,
            players: [],
            noms: [],
        }
    },
    mounted(){
        console.log('Starting game render loop');
        window.addEventListener('resize', this.simResizeWindow, false);
        window.addEventListener('orientationchange', this.simResizeWindow, false);
        console.log(window);
        this.drawMgr = new DrawingMgr(window.document);
        let fps = 30;
        this.frameInterval = 1000/fps;
        this.simResizeWindow();
        setInterval(()=> {this.simRender();}, this.frameInterval);

        //let url = 'http://localhost:8888/mynsp'
        var socket = io();
        var name = 'viewers';
        socket.on('connect', ()=>{
            console.log('Connecting from browser client');
            socket.emit('join', {roomName: name});
        });
        socket.on('news', (data)=>{
            console.log(data);
        });
        socket.on('identity', (data)=>{
            console.log(data);
        });
        socket.on('viewerUpdate', (data)=>{
            //console.log(data);
            this.players = data.players;
            this.noms = data.noms;
        });
        console.log(socket);
    },
    methods:{
        simRender(){
            this.drawMgr.ClearCanvas();
            this.drawMgr.DrawRect(0.2,0.4, 0.35,0.1,'black');            
            this.simDrawBoard();
            this.simDrawCollectionPoints();
            console.log(this.players.length);
            this.simDrawNoms();
            this.simDrawPlayers();

        },
        simDrawBoard(){
            this.drawMgr.DrawRect(0,0, 1,1,'black');
        },
        simDrawPlayers(){
            for(let i =0; i<this.players.length; i++){
                this.simDrawPlayer(this.players[i]);
            }
        },
        simDrawNoms(){
            for(let i=0; i<this.noms.length; i++){
                this.simDrawNom(this.noms[i]);
            }
        },
        simDrawCollectionPoints(){
            let w = 0.15;
            this.drawMgr.DrawRect(0,0,w,w, 'lightseagreen');
            this.drawMgr.DrawRect(1-w,0,w,w, 'lightseagreen');
            this.drawMgr.DrawRect(0,1-w,w,w, 'lightseagreen');
            this.drawMgr.DrawRect(1-w,1-w,w,w, 'lightseagreen');
        },
        simDrawPlayer(playerModel){
            let valr = Math.floor( (1 -(playerModel._playerEnergy/playerModel.maxPlayerEnergy)) *254);
            let valgb = Math.floor( (playerModel._playerEnergy/playerModel.maxPlayerEnergy) *255); 
            console.log('P Energy:'+ playerModel._playerEnergy+', '+playerModel.maxPlayerEnergy);
            let pcolor = 'rgb('+ valr+','+valgb+','+valgb+')';
            //console.log('Drawing player: '+pcolor+', '+ playerModel.posx + ', '+playerModel.posy);
            this.drawMgr.DrawCircle(playerModel.posx, playerModel.posy, playerModel.radius,pcolor);
            this.drawMgr.DrawText(playerModel.posx-0.03, playerModel.posy+0.02, 0.8, 'green', playerModel.playerName);
            this.drawMgr.DrawLine(playerModel.posx, playerModel.posy, 
                playerModel.posx + playerModel._intendedVelX, 
                playerModel.posx + playerModel._intendedVelY, 'white');
        },
        simDrawNom(nomModel){
            this.drawMgr.DrawCircle(nomModel.x, nomModel.y, nomModel.radius, 'green');
        },

        simResizeWindow(){
            let gameArea = document.getElementById('gameArea');
            let widthToHeight = 4/3;
            let newWidth = window.innerWidth;
            let newHeight = window.innerHeight;
            let newWidthToHeight = newWidth/newHeight;

            if(newWidthToHeight > widthToHeight){
                newWidth = newHeight * widthToHeight;
                gameArea.style.height = newHeight + 'px';
                gameArea.style.width = newWidth + 'px';
            }else {
                newHeight = newWidth/widthToHeight;
                gameArea.style.width = newWidth + 'px';
                gameArea.style.height = newHeight + 'px';
            }
            gameArea.style.marginTop = (-newHeight / 100 * 45) + 'px';
            gameArea.style.marginLeft = (-newWidth / 2) + 'px';
            gameArea.style.fontSize = (newWidth/400)+'em';

            var gameCanvas = document.getElementById('gameCanvas');
            gameCanvas.width = newWidth;
            gameCanvas.height = newHeight;

        }
    }

}

</script>

<style>
#gameArea {
  position: absolute;
  left:     50%;
  top:      50%;
}
#gameCanvas {
  width: 85%;
  height: 85%;
}
#statsPanel {
  position: absolute;
  width: 100%;
  height: 8%;
  bottom: 0;
  opacity: 0.8;
}
</style>