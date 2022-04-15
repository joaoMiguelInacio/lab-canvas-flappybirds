class Background {
	constructor(canvas, ctx, moveSpeed) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = null;
		this.moveSpeed = moveSpeed;
		this.y = 0;
		this.x = this.canvas.width;
		this.init();
	}

	init() {
		this.image = new Image();
		this.image.src = "/images/bg.png";
	}

	draw () {
		if (this.image) {
			this.ctx.drawImage(
			this.image,
			this.x,
			this.y,
			this.canvas.width,
			this.canvas.height
			);
		this.ctx.drawImage(
				this.image,
				this.x - this.canvas.width,
				this.y,
				this.canvas.width,
				this.canvas.height
				);
		}
	}

	move() {
		this.x -= this.moveSpeed;
		if (this.x === 0) {
			this.x = this.canvas.width;
		}
	}
};