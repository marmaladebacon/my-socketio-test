import _ from 'lodash';
export default class Player{
    constructor(id, data){
        this.points = 0;
        this.id = id;
        this.radius = data.radius;
        this.playerName = data.playerName;
        this.posx = Math.random() * 0.8 + 0.1;
        this.posy = Math.random() * 0.8 + 0.1;
        this.velx = 0;
        this.vely = 0;
        this._intendedVelX = 0;
        this._intendedVelY = 0;
        this.maxSpeed = 0.005;
        this.accelaration = 0.005;
        this._playerEnergy = 50;
        this.maxPlayerEnergy = 100;

        this._playerCollisionDone = false;
        this._resetCollisionCountdown = 0;
        /*
        this.updateNomsLocations = false;
        this.updateAllPlayersLocation = false;
        this.updatePlayerClientData = false;
        */
    }

    set intendedVelX (x) {
        if(x >= 0){
            this._intendedVelX = x > 1 ? 1: x;
        }else{
            this._intendedVelX = x < -1 ? -1: x;
        }
    }
    set intendedVelY (y) {
        if(y >= 0){
            this._intendedVelY = y > 1 ? 1: y;
        }else{
            this._intendedVelY = y < -1 ? -1: y;
        }

    }

    get intendedVel(){ return {x:this._intendedVelX, y:this._intendedVelY};}
    get vel () { return {x:this.velx, y:this.vely};}
//    get playerEnergy(){ return this._playerEnergy;}

    updateVelocity(){
        this.velx = this.updateVel(this._intendedVelX, this.velx);
        this.vely = this.updateVel(this._intendedVelY, this.vely);
    }

    updatePosition(){
        this.posx += (this.velx * this.maxSpeed);
        this.posy += (this.vely * this.maxSpeed);
        if(this.posx < this.radius || this.posx > (1-this.radius)) { this.velx = -this.velx;}
        if(this.posy < this.radius || this.posy > (1-this.radius)) { this.vely = -this.vely;}
        if(this.posx < this.radius){ this.posx = this.radius;}
        if(this.posx > (1-this.radius)){ this.posx = 1 - this.radius;}
        if(this.poxy < this.radius){ this.posy = this.radius;}
        if(this.posy > (1-this.radius)){this.posy = 1 - this.radius;}
    }

    updateCollisionsWithPlayers(players){
        for(let i =0; i<players.length; i++){
            if(this.posx === players[i].posx && this.posy === players[i].posy){
                continue;
            }
            if(this._playerCollisionDone){
                continue;
            }
            let deltax = players[i].posx - this.posx;
            let deltay = players[i].posy - this.posy;
            let distsq = (deltax * deltax) + (deltay * deltay);
            if(distsq < ((this.radius * this.radius) + (players[i].radius * players[i].radius)) ){
                //collision happens;
                if(deltax < deltay){
                    this.vely  = -this.vely;
                    players[i].vely = -players[i].vely;                     
                }else{
                    this.velx = -this.velx;
                    players[i].velx = -players[i].velx;
                }
                
                players[i]._playerCollisionDone = true;
                players[i]._resetCollisionCountdown = 15;
                this._playerCollisionDone = true;
                this._resetCollisionCountdown = 15;
            }
        }
    }

    resetCollisions(){
        if(this._resetCollisionCountdown <=0){
            this._playerCollisionDone = false;
        }else{
            this._resetCollisionCountdown -= 1;
        }
    }

    updateEnergy(){
        if(this._playerEnergy>this.maxPlayerEnergy){
            this._playerEnergy = this.maxPlayerEnergy;
        }else{
            this._playerEnergy += 2;
        }
    }

    updateVel(intended, actual){

        if(intended >= 0 && (actual < intended) ){
            actual += this.accelaration;
            if(actual > intended){ actual = intended;}
            if(actual > 1){ actual = 1;}

        }else if(intended < 0 && (actual> intended) ){
            actual -= this.accelaration;
            if(actual < intended){ actual = intended;}
            if(actual < -1){ actual = -1;}
        }
        return actual;
    }

    updateNomCollisions(noms){
        let nomsToRemove = [];
        for(let i =0; i<noms.length; i++){
            let contactDist = noms[i].radius + this.radius;
            let contactDistSq = contactDist * contactDist;
            let nomsDiff = {
                x: noms[i].x - this.posx,
                y: noms[i].y - this.posy,
            }
            let nomsDiffSq = (nomsDiff.x * nomsDiff.x) + (nomsDiff.y * nomsDiff.y);
            if(contactDistSq > nomsDiffSq){
                nomsToRemove.push(noms[i]);
            }
        }

        _.forEach(nomsToRemove, (n)=>{
            let index = noms.indexOf(n);
            noms.splice(index, 1);
        });
    }
}