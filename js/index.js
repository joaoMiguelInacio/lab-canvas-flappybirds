window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  let screen1 = document.getElementById("screen1"),
      screen2 = document.getElementById("screen2"),
      screen3 = document.getElementById("screen3"),
      instructions = document.getElementById("instructions"),
      endGameText = document.getElementById("end-game-text"),
      canvas = document.getElementById("my-canvas"),
      ctx = canvas.getContext("2d"),
      obstaclesArray = [],
      frameCounter=0,
      currentLevel = 1,
      currentLevelCompletion = 0;

  function startGame() {
    screen2.classList.remove("hidden");
    screen1.classList.add("hidden");
    background = new Background(canvas, ctx, 1);
    player = new Player (canvas, ctx);
    obstacleTop = new ObstacleTop (canvas, ctx, 1);
    obstacleBottom = new ObstacleBottom (canvas, ctx, 1, 300);
    canvas.addEventListener('touchstart', fly);
    canvas.addEventListener("click", fly);
    updateCanvas();
  }

  function fly () {
    player.y -=20;
    gravity = 0.2;
  }


	function updateCanvas() {
    
    background.move();
		background.draw();

    player.draw();
    player.gravityIncreases();
    document.onkeydown =  (e) => {
      if (e.key === " ") {
          e.preventDefault();
          fly();
      }
    };

    ctx.font = '24px serif';
    ctx.fillStyle = 'red';
    ctx.fillText(`LEVEL ${currentLevel}`, 500, 20);
    ctx.fillText(`${currentLevelCompletion} %`, 500, 40);

    frameCounter ++;
    if (frameCounter % 20 === 0){
      currentLevelCompletion += 1;
    }
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
      currentLevel = 2;
      currentLevelCompletion = 0;
    }
    if (frameCounter % 150 === 0 && frameCounter > 2000 && frameCounter < 4000) {
      obstaclesArray.push(new ObstacleTop(canvas, ctx, 1.25, Math.floor(Math.random() * -140)));
      obstaclesArray.push(new ObstacleBottom(canvas, ctx, 1.25, obstaclesArray[obstaclesArray.length - 1].y + 230));
    }
    if (frameCounter === 4000){
      obstaclesArray = [];
      currentLevel = 3;
      currentLevelCompletion = 0;
    }
    if (frameCounter % 150 === 0 && frameCounter > 4000 && frameCounter < 6000) {
      obstaclesArray.push(new ObstacleTop(canvas, ctx, 1.5, Math.floor(Math.random() * -140)));
      obstaclesArray.push(new ObstacleBottom(canvas, ctx, 1.5, obstaclesArray[obstaclesArray.length - 1].y + 210));
    }
    if (frameCounter === 6000){
      endGameText.innerHTML = ("You won. Please refresh the page to play again");
      screen2.classList.add("hidden");
      screen3.classList.remove("hidden");
    }

    if (player.y + player.height > canvas.height && !screen2.classList.contains("hidden")){
      endGameText.innerHTML = ("You landed in someone's barbeque grill. Please refresh the page to play again");
      screen2.classList.add("hidden");
      screen3.classList.remove("hidden");
    }

    if (player.y < -player.height){
      endGameText.innerHTML = ("Your bird flew away. Please refresh the page to play again");
      screen2.classList.add("hidden");
      screen3.classList.remove("hidden");
    }

    obstaclesArray.forEach((obstacle) => {
      obstacle.draw();
      obstacle.move();
      const withinX = player.x + player.width > obstacle.x && player.x < obstacle.x + obstacle.width;
      const withinY = obstacle.y + obstacle.height > player.y && obstacle.y < player.y + player.height;
      collidedWithObstacle = withinX && withinY;
      if (collidedWithObstacle){
        screen2.classList.add("hidden");
        screen3.classList.remove("hidden");
      }

    });
    
    requestAnimationFrame(updateCanvas);
	  }


};
