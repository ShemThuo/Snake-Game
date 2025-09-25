var gameStart = null;
var gameSpeed = null;
var gameArea = null;
var gameAreaContext = null;
var gameWidth = 0;
var gameHeight = 0;
var cellWidth = 0;
var playScore = 0;

snake = null;
snakeFood = null;
snakeDirecction = null;
speedSize = 0;
time = null;

function initialize() {
    gameStart = document.getElementById("gameStart");
    gameSpeed = document.getElementById("gameSpeed");
    gameArea = document.getElementById("gameArea");
    gameAreaContext = gameArea.getContext("2d");
    gameAreaWidth = 400;
    gameAreaHeight = 400;
    cellWidth = 20;
    gameArea.width = gameAreaWidth;
    gameArea.height = gameAreaHeight;

    gameStart.onclick = function() {
        this.disabled = true;
    };
}
    function startGame() {
        playerScore = 0;
        snakeDirection = "right";
        speedSize = parseInt(gameSpeed.value);

        if (speedSize > 9) {
            speedSize = 9;
        }else if (speedSize < 0) {
            speedSize = 1;
       }
        snake = []
        snake.push({x: 0, y: cellWidth});
    }
createFood();
clearInterval(timer);
//timer = setInterval(create);
function createFood() {
    snakeFood = {
        x: Math.round((Math.random() * (gameAreaWidth - cellWidth)) / cellWidth),
        y: Math.round((Math.random() * (gameAreaHeight - cellWidth)) / cellWidth),
    }
}

function createGameArea() {

}

function Control() {

}

function writeScore() {

}

function createSquare() {

}

function changeDirection() {
    
}