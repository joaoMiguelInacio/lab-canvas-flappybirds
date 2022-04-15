window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  let screen1 = document.getElementById("screen1"),
      screen2 = document.getElementById("screen2"),
      canvas = document.getElementById("my-canvas"),
      ctx = canvas.getContext("2d"),
      obstaclesArray = [],
      frameCounter=0;

  function startGame() {
    screen2.classList.remove("hidden");
    screen1.classList.add("hidden");
    background = new Background(canvas, ctx, 1);
    player = new Player (canvas, ctx);
    obstacleTop = new ObstacleTop (canvas, ctx, 1);
    obstacleBottom = new ObstacleBottom (canvas, ctx, 1, 300);
    updateCanvas();
  }

	function updateCanvas() {
    
    frameCounter ++;
    if (frameCounter === 150){
      obstaclesArray.push(new ObstacleTop(canvas, ctx, 1, -100));
      obstaclesArray.push(new ObstacleBottom(canvas, ctx, 1, 150));
    }
    if (frameCounter > 150 && frameCounter % 150 === 0 && frameCounter < 2000){
      obstaclesArray.push(new ObstacleTop(canvas, ctx, 1, Math.floor(Math.random() * -140)));
      obstaclesArray.push(new ObstacleBottom(canvas, ctx, 1, obstaclesArray[obstaclesArray.length - 1].y + 250 ));
    }
    if (frameCounter === 2000){
      obstaclesArray = [];
      window.alert("LEVEL UP");
    }
    if (frameCounter % 150 === 0 && frameCounter > 2000 && frameCounter < 4000) {
      obstaclesArray.push(new ObstacleTop(canvas, ctx, 1.25, Math.floor(Math.random() * -140)));
      obstaclesArray.push(new ObstacleBottom(canvas, ctx, 1.25, obstaclesArray[obstaclesArray.length - 1].y + 230));
    }
    if (frameCounter === 4000){
      obstaclesArray = [];
      window.alert("LEVEL UP");
    }
    if (frameCounter % 150 === 0 && frameCounter > 4000 && frameCounter < 6000) {
      obstaclesArray.push(new ObstacleTop(canvas, ctx, 1.5, Math.floor(Math.random() * -140)));
      obstaclesArray.push(new ObstacleBottom(canvas, ctx, 1.5, obstaclesArray[obstaclesArray.length - 1].y + 210));
    }
    if (frameCounter === 6000){
      window.alert("You won. Please refresh the page to play again");
    }


    background.move();
		background.draw();
    
    player.draw();
    player.gravityIncreases();
    document.onkeydown =  (e) => {
      if (e.key === " ") {
          e.preventDefault();
          player.y -=20;
          gravity = 0.2;
      }
    };

    if (player.y + player.height > canvas.height){
      window.alert("You have been eaten by a snake. Please refresh the page to play again");
    }

    if (player.y < -player.height){
      window.alert("Your bird flew away. Please refresh the page to play again");
    }

    obstaclesArray.forEach((obstacle) => {
      obstacle.draw();
      obstacle.move();
      const withinX = player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width;
      const withinY = obstacle.y + obstacle.height > player.y && obstacle.y < player.y + player.height;
      collidedWithObstacle = withinX && withinY;
      if (collidedWithObstacle){
        window.alert("You crashed. Please refresh the page to play again");
      }

    });
    
		requestAnimationFrame(updateCanvas);
	  }


};
