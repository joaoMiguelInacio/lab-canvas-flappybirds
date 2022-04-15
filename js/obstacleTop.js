class ObstacleTop { 
    constructor (canvas, ctx, obstaclesSpeed, y) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.image = null;
        this.obstaclesSpeed = obstaclesSpeed;
        this.width = 30;
        this.height = 150;
        this.y = y;
        this.x = canvas.width;
        this.init();
    }

    init(){
        this.image = new Image();
        this.image.src = "./images/obstacle_top.png";
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

    move(){
        this.ctx.drawImage(
        this.image, 
        this.x -= this.obstaclesSpeed, 
        this.y,
        this.width, 
        this.height);
    }
}