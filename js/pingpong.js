var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;

let lives = 3;

//point de départ du cercle
var x = canvas.width / 2;
var y = canvas.height - 30;

var dx = 2;
var dy = -2;

//variable pour l'ajout du pagaie
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var rightPressed = false;
var leftPressed = false;

//Variable du brique
var brickRowCount = 6;
var brickColumnCount = 4;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//variable du score
var score = 0;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

//configuration de deux écouteur d'événement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//controle du clavier
function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//Détection de collision entre les briques et la balle
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
              }
            }
         }
      }
   }
}

// Une fonction pour dessiner la balle
function drawBall() {
    ctx.beginPath();
    //déssine la balle
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#DD985C";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    //déssinera la palette sur l'écran
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#DD985C";
    ctx.fill();
    ctx.closePath();
}

//fonction pour déssiner les briques
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#DD985C";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore() {
  ctx.font = "19px Arial";
  ctx.fillStyle = "#0131B4";
  ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
  ctx.font = "19px Arial";
  ctx.fillStyle = "#0131B4";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function draw() {
    //Efface les traces laisser par le cercle 
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //appel des fonctions
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
     
    //Si la position en y de la balle est supérieure à la hauteur du canvas 
      // on inverse encore la vitesse de la balle.
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    //game over et détection de la collision entre la balle et la raquette
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        }
        else {
            lives--;
           if (!lives) {
                alert("GAME OVER");
                document.location.reload();
                clearInterval(interval); // Le navigateur doit arreter le jeux
          } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2
             }
         }
     }
    //les variables pour stocker les informations sur les touches enfoncées
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    //Point d'origine de la balle
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();