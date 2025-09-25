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
    }
}
