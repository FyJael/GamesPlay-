let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));
let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue('bottom'));
let groundHeight = parseInt(window.getComputedStyle(ground ).getPropertyValue('height'));
let isJumping = false;
let upTime;
let downTime;
let displayScore = document.getElementById('score');
let score = 0; 

function jump(){
    if(isJumping) return;
    upTime = setInterval(() => {
        if(characterBottom >= groundHeight + 170){
            clearInterval(upTime);
            downTime = setInterval(() => {
                if (characterBottom <= groundHeight + 20){
                    clearInterval(downTime);
                    isJumping = false;
                }
                characterBottom -= 15;
                character.style.bottom = characterBottom + 'px';
            }, 40);
        }
        characterBottom += 20;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
    }, 20);
}
function showScore(){
    score++;
    displayScore.innerText = score;
}

setInterval(showScore, 100);

function generateObstacle(){
    let obstacles = document.querySelector('.obstacles');
    let obstacle = document.createElement('div');
    obstacle.setAttribute('class', 'obstacle');
    obstacles.appendChild(obstacle);
    let randomTimeout = Math.floor(Math.random() * 1000) + 1000;
    
    let obstacleRight = -50;
    let obstacleBottom = 100;
    let obstacleWidth = 15;
    let obstacleHeight =Math.floor(Math.random() * 20) + 40;
    obstacle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 355)}, 
    ${Math.floor(Math.random() * 355)}, ${Math.floor(Math.random() * 355)})`;

    function moveObstacle(){
        obstacleRight += 7;
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';
        if(characterRight >= obstacleRight - characterWidth && characterRight <= obstacleRight + obstacleWidth &&
            characterBottom <= obstacleBottom + obstacleHeight){
                alert('Game over! Your score is: '+ score)
                clearInterval(obstacleInterval);
                clearTimeout(obstacleTimeout);
                location.reload();  
            }
    }
    let obstacleInterval = setInterval(moveObstacle, 30);
    let obstacleTimeout = setTimeout(generateObstacle, randomTimeout);
}

generateObstacle();
function control(e){
    if(e.key == 'ArrowUp' || e.key == ' '){
        jump();
    }
} 

document.addEventListener('keydown', control)