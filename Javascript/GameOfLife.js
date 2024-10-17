class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.currentGrid = Array.from({ length: rows }, () => Array(cols).fill(false));
        this.nextGrid = Array.from({ length: rows }, () => Array(cols).fill(false));
    }

    display() {
        this.currentGrid.forEach(row => {
            console.log(row.map(cell => (cell ? '*' : '.')).join(' '));
        });
        console.log('\n');
    }

    update() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                let aliveNeighbors = this.countAliveNeighbors(r, c);
                if (this.currentGrid[c][r]) {
                    this.nextGrid[r][c] = (aliveNeighbors === 2 || aliveNeighbors === 3);
                } else {
                    this.nextGrid[r][c] = (aliveNeighbors === 3);
                }
            }
        }
        this.currentGrid = this.nextGrid.map(arr => arr.slice()); // Copy nextGrid to currentGrid
    }

    setCell(row, col, alive) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            this.currentGrid[row][col] = alive;
        }
    }

    countAliveNeighbors(row, col) {
        const dirs = [-1, 0, 1];
        let count = 0;
        for (let dr of dirs) {
            for (let dc of dirs) {
                let r = row + dr;
                let c = col + dc;
                if (r >= 0 && r < this.rows && c >= 0 && c < this.cols && this.currentGrid[r][c]) {
                    count++;
                }
            }
        }
        return count;
    }
}

class Game {
    constructor(rows, cols) {
        this.grid = new Grid(rows, cols);
        this.initialize();
    }

    initialize() {
        this.grid.setCell(1, 2, true);
        this.grid.setCell(2, 3, true);
        this.grid.setCell(3, 1, true);
        this.grid.setCell(3, 2, true);
        this.grid.setCell(3, 3, true);
    }

    display() {
        this.grid.display();
    }

    async run(generations) {
        for (let i = 1; i <= generations; i++) {
            console.log(`Generation ${i}:`);
            this.display();
            this.grid.update();
            await this.sleep(500);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const rows = 10;
const cols = 10;
const generations = 20;

const game = new Game(rows, cols);
game.run(generations);
