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
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    gameAreaContext.fillStyle = "#FFFFFF";
    gameAreaContext.fillRect(0, 0, gameAreaWidth, gameAreaHeight);
    gameAreaContext.strokeStyle = "#CCCCCC";
    gameAreaContext.strokeRect(0, 0, gameAreaWidth, gameAreaHeight);

    if (snakeDirection == "right") {
        snakeX++;
    }else if (snakeDirection == "left") {
        snakeX--;
    }else if (snakeDirection == "up") {
        snakeY--;
    }else if (snakeDirection == "down") {
        snakeY++;
    }
    if(
        snakeX == -1 ||
        snakeX == gameAreaWidth / cellWidth ||
        snakeY == -1 ||
        snakeY == gameAreaHeight / cellWidth ||
        Control(snakeX, snakeY, snake)
    ){
        writeScore();
        clearInterval(timer);
        gameStart.disabled = false;
        return;
    }
    if (snakeX == snakeFood.x && snakeY == snakeFood.y) {
        var newHead = {x: snakeX, y: snakeY};
        playerScore += speedSize;
        createFood();
    }else {
        var newHead = snake.pop();
        newHead.x = snakeX;
        newHead.y = snakeY;
    }
    snake.unshift(newHead);
    for (var i = 0; i < snake.length; i++) {
        createSquare(snake[i].x, snake[i].y, "#000000");
    }
    createSquare(snakeFood.x, snakeFood.y, "#FF0000");
}

function Control(x, y, array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].x == x && array[i].y == y) {
            return true;
        }
    }
    return false;
}

function writeScore() {
    gameAreaContext.font = "50px Sans-serif";
    gameAreaContext.fillStyle = "#FFF333";
    gameAreaContext.fillText(
        "Score: " + playerScore,
        gameAreaWidth / 2-100,
        gameAreaHeight / 2
    );
}

function createSquare(x, y) {
    gameAreaContext.fillStyle = "#000000";
    gameAreaContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
}

function changeDirection(e) {
    var keys = e.which;
    if (keys == "40" && snakeDirection != "up") {
        snakeDirection = "down";
    } else if (keys == "39" && snakeDirection != "left") {
        snakeDirection = "right";
    } else if (keys == "38" && snakeDirection != "down") {
        snakeDirection = "up";
    }else if (keys == "37" && snakeDirection != "right") {
        snakeDirection = "left";
    }
}