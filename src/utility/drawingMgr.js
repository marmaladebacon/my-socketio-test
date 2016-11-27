
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
    YToXUnits(val){
        return val/this.canvas.height * this.canvas.width * this.canvas.width;
    }

    DrawRect(x, y, width, height, color){
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillRect(this.ToUnitsX(x), this.ToUnitsY(y),
            this.ToUnitsX(width), this.ToUnitsY(height));
            //this.YToXUnits(width), this.YToXUnits(height));
    }
    DrawText(x, y, width, color, text ){
        this.canvasContext.fillStyle = color;
        this.canvasContext.font = "32px serif";
        this.canvasContext.fillText(text, this.ToUnitsX(x), this.ToUnitsY(y), this.ToUnitsX(width));
    }

    DrawCircle(x, y, radius, color){
        this.canvasContext.fillStyle = color;
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.ToUnitsX(x), this.ToUnitsY(y), this.ToUnitsX(radius), 0, Math.PI*2, true);
        this.canvasContext.fill();
    }

    DrawLine(x1, y1, x2, y2, color){
        this.canvasContext.strokeStyle = color;
        this.canvasContext.beginPath();
        this.canvasContext.moveTo(this.ToUnitsX(x1), this.ToUnitsY(y1));
        this.canvasContext.lineTo(this.ToUnitsX(x2), this.ToUnitsY(y2));
        this.canvasContext.stroke();
                
    }

}