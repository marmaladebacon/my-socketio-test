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
        this.maxSpeed = 0.03;
        this.accelaration = 0.02;
        this._playerEnergy = 50;
        this.maxPlayerEnergy = 100;
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

    set playerEnergy(val){
        if(val < 0){ val = 0;}
        this._playerEnergy = val;
    }
    get intendedVel(){ return {x:this._intendedVelX, y:this._intendedVelY};}
    get vel () { return {x:this.velx, y:this.vely};}
    get playerEnergy(){ return this._playerEnergy;}

    UpdateVelocity(){
        this.velx = this.updateVel(this._intendedVelX, this.velx);
        this.vely = this.updateVel(this._intendedVelY, this.vely);
    }

    UpdatePosition(){
        this.posx += (this.velx * this.maxSpeed);
        this.posy += (this.vely * this.maxSpeed);
        if(this.posx <= 0 || this.posx >= 1) { this.velx = -this.velx;}
        if(this.posy <= 0 || this.posy >= 1) { this.vely = -this.vely;}
        if(this.posx < 0){ this.posx = this.radius;}
        if(this.posx > 1){ this.posx = 1 - this.radius;}
        if(this.poxy < 0){ this.posy = this.radius;}
        if(this.posy > 1){this.posy = 1 - this.radius;}
    }

    UpdateEnergy(){
        if(this._playerEnergy>this.maxPlayerEnergy){
            this._playerEnergy = this.maxPlayerEnergy;
        }else{
            this._playerEnergy += 1;
        }
    }

    updateVel(intended, actual){
        if(intended >= 0 && (actual < intended) ){
            actual += this.accelaration;
            if(actual > 1){ actual = 1;}

        }
        if(intended < 0 && (actual> intended) ){
            actual -= this.accelaration;
            if(actual < -1){ actual = -1;}

        }
        return actual;
    }
}