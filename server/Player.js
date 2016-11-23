export default class Player{
    constructor(id, data){
        this.id = id;
        this.playerName = data.playerName;
        this.posx = Math.random() * 0.8 + 0.1;
        this.posy = Math.random() * 0.8 + 0.1;
    }
}