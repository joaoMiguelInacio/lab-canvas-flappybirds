# Bonus LAB | Canvas Flappy Bird

Play my version of the game [here](https://joaomiguelinacio.github.io/lab-canvas-flappybirds)

# Introduction

I must start by saying that I have always hated this game because I have never been able to play it for more than 30 seconds without losing.

However, without classes, it has been a very long week and as such, I decided to take on the Bonus Lab: Canvas Flappy Bird.

You can find the origal IronHack repository [here](https://github.com/ironhack-labs/lab-canvas-flappybirds).

# Approach

## Background :cityscape:

As suggested I started by creating the Background class.

I wish I hadn't because the biggest challenge in making the game was getting the image to loop infinitly.

I guess that makes it the biggest learning achievement as well :mechanical_arm:

## Player :baby_chick:	

When attempting to play the game before, I have called this bird many names never knowing he was called Faby. :sweat_smile:

Anyhow, it was easy to get Faby to be drawn and to move up but not as easy to define the gravity and how it would affect.

I opted for a slightly different approach than the one suggested as you can see in the following snippet:

```
    //as defined in the player.js file

    gravityIncreases(){
        for (let gravity = 0.2; gravity <= 0.25; gravity += 0.01){
            this.y += gravity;
          }
    }

    //as defined in the index.js file

    player.gravityIncreases();
    document.onkeydown =  (e) => {
      if (e.key === " ") {
          e.preventDefault();
          player.y -=20;
          gravity = 0.2;
      }
    };
```

## Obstacles :stop_sign:

I opted to creat 2 different classes, one for the top and other for the bottom obstacle.

Coming up with a way to position the bottom obstacle in relation to the top was a nice exercise.

And from there it was easy to come up with ways to personalise the game with different levels.

On the following snippet of the updateCanvas function, you will be able to see how I position the first pair of obstacles and all the following on Level 1.

```
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
```

As levels go up, the distance between the obstacles is reduced and the speed they move towards the player is increased.

On Level 2 the obstacleSpeed is 1.25 and distance between obstacles is reduced to 80px.
On Level 3 the obstacleSpeed is 1.5 and distance between obstacles is reduced to 60px.

## GameOver :collision:

Now that we covered how the game is won, please have a at the following snippet to see how the game can be lost.

```
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
    })
```

## Backlog :older_woman:

Because I need to convince my grandmother that I am not always playing games when I am at the computer, I will not be doing the following at this time:

* Add an anoying 8-bit song;
* Center logo and start button in screen 1;
* Center Canvas in screen 2;
* Create a screen 3 for when the game is lost;
* Create a re-start button for screen 3;
* Code refactoring;
