
export default class DrawingMgr{
    constructor(document){
        this.canvas = document.getElementById('gameCanvas');
        this.canvasContext = this.canvas.getContext('2d');

    }
    ClearCanvas(){
        this.canvasContext.clearRect(0,0, this.canvas.width, this.canvas.height);
    }
    ToUnitsX(val){
        return this.canvas.width * val;
    }
    ToUnitsY(val){
        return this.canvas.height * val;
    }
    DrawRect(x, y, width, height, color){
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(this.ToUnitsX(x), this.ToUnitsY(y),
            this.ToUnitsX(width), this.ToUnitsY(height));
    }
    DrawText(x, y, width, color, text ){
        this.canvasContext.fillStyle = color;
        this.canvasContext.font = "48px serif";
        this.canvasContext.fillText(text, this.ToUnitsX(x), this.ToUnitsY(y), this.ToUnitsX(width));
    }

}