class Grid {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.currentGrid = Array.from({ length: rows }, () => Array(cols).fill(false));
        this.nextGrid = Array.from({ length: rows }, () => Array(cols).fill(false));
    }

    getRows() {
        return this.rows;
    }

    getCols() {
        return this.cols;
    }

    getCurrentGrid() {
        return this.currentGrid;
    }

    display() {
        for (let r = 0; r < this.rows; r++) {
            let line = "";
            for (let c = 0; c < this.cols; c++) {
                line += this.currentGrid[r][c] ? '*' : '.';
                line += ' ';
            }
            console.log(line);
        }
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
        this.currentGrid = this.nextGrid.map(arr => [...arr]);
    }

    setCell(row, col, alive) {
        if (this.rows > 0 && row < this.rows && this.cols > 0 && col < this.cols) {
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

module.exports = Grid;
