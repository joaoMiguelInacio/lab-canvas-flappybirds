class Player { 
    constructor (canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = null;
        this.width = 20;
        this.height = 20;
        this.x = (10);
        this.y = ((this.canvas.height - this.height) / 2);
        this.init();
    }

    init(){
        this.image = new Image();
        this.image.src = "/images/flappy.png";
    }

    draw(){
        if(this.image){
            this.ctx.drawImage(
                this.image, 
                this.x,
                this.y, 
                this.width, 
                this.height);
        }
    }

    gravityIncreases(){
        for (let gravity = 0.2; gravity <= 0.25; gravity += 0.01){
            this.y += gravity;
          }
    }
}