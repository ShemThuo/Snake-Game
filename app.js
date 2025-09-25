class SnakeGame {
            constructor() {
                this.boardSize = window.innerWidth < 600 ? 15 : 20;
                this.board = document.getElementById('gameBoard');
                this.scoreElement = document.getElementById('scoreValue');
                this.startBtn = document.getElementById('startBtn');
                this.pauseBtn = document.getElementById('pauseBtn');
                this.gameOverMsg = document.getElementById('gameOverMsg');
                
                this.snake = [{x: Math.floor(this.boardSize/2), y: Math.floor(this.boardSize/2)}];
                this.food = this.generateFood();
                this.direction = 'RIGHT';
                this.score = 0;
                this.isPlaying = false;
                this.gameInterval = null;
                this.gameSpeed = 150;
                
                this.initializeBoard();
                this.bindEvents();
                this.updateDisplay();
            }
            
            initializeBoard() {
                this.board.innerHTML = '';
                this.board.style.gridTemplateColumns = `repeat(${this.boardSize}, 20px)`;
                this.board.style.gridTemplateRows = `repeat(${this.boardSize}, 20px)`;
                
                for (let i = 0; i < this.boardSize * this.boardSize; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.index = i;
                    this.board.appendChild(cell);
                }
            }
            
            bindEvents() {
                this.startBtn.addEventListener('click', () => this.startGame());
                this.pauseBtn.addEventListener('click', () => this.pauseGame());
                
                document.addEventListener('keydown', (e) => this.handleKeyPress(e));
            }
            
            generateFood() {
                let newFood;
                do {
                    newFood = {
                        x: Math.floor(Math.random() * this.boardSize),
                        y: Math.floor(Math.random() * this.boardSize)
                    };
                } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
                
                return newFood;
            }
            
            handleKeyPress(e) {
                if (!this.isPlaying) return;
                
                switch (e.key) {
                    case 'ArrowUp':
                        e.preventDefault();
                        if (this.direction !== 'DOWN') this.direction = 'UP';
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (this.direction !== 'UP') this.direction = 'DOWN';
                        break;
                    case 'ArrowLeft':
                        e.preventDefault();
                        if (this.direction !== 'RIGHT') this.direction = 'LEFT';
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        if (this.direction !== 'LEFT') this.direction = 'RIGHT';
                        break;
                }
            }
            
            startGame() {
                this.snake = [{x: Math.floor(this.boardSize/2), y: Math.floor(this.boardSize/2)}];
                this.food = this.generateFood();
                this.direction = 'RIGHT';
                this.score = 0;
                this.isPlaying = true;
                
                this.startBtn.style.display = 'none';
                this.pauseBtn.style.display = 'inline-block';
                this.gameOverMsg.style.display = 'none';
                
                this.gameInterval = setInterval(() => this.gameLoop(), this.gameSpeed);
                this.updateDisplay();
            }
            
            pauseGame() {
                this.isPlaying = false;
                clearInterval(this.gameInterval);
                
                this.startBtn.textContent = 'Resume';
                this.startBtn.style.display = 'inline-block';
                this.pauseBtn.style.display = 'none';
            }
            
            gameLoop() {
                if (!this.isPlaying) return;
                
                const head = {...this.snake[0]};
                
                switch (this.direction) {
                    case 'UP': head.y -= 1; break;
                    case 'DOWN': head.y += 1; break;
                    case 'LEFT': head.x -= 1; break;
                    case 'RIGHT': head.x += 1; break;
                }
                
                // Check wall collision
                if (head.x < 0 || head.x >= this.boardSize || 
                    head.y < 0 || head.y >= this.boardSize) {
                    this.gameOver();
                    return;
                }
                
                // Check self collision
                if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
                    this.gameOver();
                    return;
                }
                
                this.snake.unshift(head);
                
                // Check food collision
                if (head.x === this.food.x && head.y === this.food.y) {
                    this.score++;
                    this.food = this.generateFood();
                    
                    // Increase speed slightly
                    if (this.gameSpeed > 80) {
                        this.gameSpeed -= 2;
                        clearInterval(this.gameInterval);
                        this.gameInterval = setInterval(() => this.gameLoop(), this.gameSpeed);
                    }
                } else {
                    this.snake.pop();
                }
                
                this.updateDisplay();
            }
            
            gameOver() {
                this.isPlaying = false;
                clearInterval(this.gameInterval);
                
                this.startBtn.textContent = 'Play Again';
                this.startBtn.style.display = 'inline-block';
                this.pauseBtn.style.display = 'none';
                this.gameOverMsg.style.display = 'block';
            }
            
            updateDisplay() {
                // Clear board
                const cells = this.board.querySelectorAll('.cell');
                cells.forEach(cell => {
                    cell.className = 'cell';
                });
                
                // Draw snake
                this.snake.forEach(segment => {
                    const index = segment.y * this.boardSize + segment.x;
                    if (cells[index]) {
                        cells[index].classList.add('snake');
                    }
                });
                
                // Draw food
                const foodIndex = this.food.y * this.boardSize + this.food.x;
                if (cells[foodIndex]) {
                    cells[foodIndex].classList.add('food');
                }
                
                // Update score
                this.scoreElement.textContent = this.score;
            }
        }
        
        // Initialize game when page loads
        window.addEventListener('load', () => {
            new SnakeGame();
        });