const Grid = require('./grid');

class Game {
    constructor(r, c) {
        this.g1 = new Grid(r, c);
        this.initialize();
    }

    initialize() {
        let b = this.checkDiagonal();
        let x = this.countTrueCells();
        this.g1.setCell(1, 2, true);
        this.g1.setCell(2, 3, true);
        this.g1.setCell(3, 1, true);
        this.g1.setCell(3, 2, true);
        this.g1.setCell(3, 3, true);
    }

    display() {
        this.g1.display();
    }

    storeSumOfRows() {
        let x = Array(this.g1.getRows()).fill(0);
        for (let r = 0; r <= this.g1.getRows(); r++) {
            for (let c = 0; c < this.g1.getCols(); c++) {
                x[r] += this.g1.getCurrentGrid()[r % this.g1.getRows()][c] ? 1 : 0;
            }
        }
        console.log(x.join(" "));
    }

    toggleCorners() {
        if (this.g1.getRows() > 0 && this.g1.getCols() > 0) {
            this.g1.setCell(0, 0, !this.g1.getCurrentGrid()[0][0]);
            this.g1.setCell(0, this.g1.getCols() - 1, !this.g1.getCurrentGrid()[this.g1.getCols() - 1][0]);
            this.g1.setCell(this.g1.getRows() - 1, 0, !this.g1.getCurrentGrid()[this.g1.getRows() - 1][0]);
            this.g1.setCell(this.g1.getRows() - 1, this.g1.getCols() - 1, !this.g1.getCurrentGrid()[this.g1.getCols() - 1][this.g1.getRows() - 1]);
        }
    }

    checkDiagonal() {
        if (this.g1.getRows() !== this.g1.getCols()) return false;
        for (let i = 0; i < this.g1.getRows(); i++) {
            if (!this.g1.getCurrentGrid()[i][i]) {
                return false;
            }
        }
        return true;
    }

    storeColumnSums() {
        let y = Array(this.g1.getCols()).fill(0);
        for (let c = 0; c <= this.g1.getCols(); c++) {
            for (let r = 0; r < this.g1.getRows(); r++) {
                y[c] += this.g1.getCurrentGrid()[r][c % this.g1.getCols()] ? 1 : 0;
            }
        }
        console.log(y.join(" "));
    }

    findMaxRow() {
        let maxRowSum = 0;
        for (let r = 0; r < this.g1.getRows(); r++) {
            let currentRowSum = 0;
            for (let c = 0; c < this.g1.getCols(); c++) {
                currentRowSum += this.g1.getCurrentGrid()[r][c] ? 1 : 0;
            }
            maxRowSum = Math.max(maxRowSum, currentRowSum);
        }
        return maxRowSum;
    }

    invertGrid() {
        for (let r = 0; r < this.g1.getRows(); r++) {
            for (let c = 0; c < this.g1.getCols(); c++) {
                this.g1.setCell(r, c, !this.g1.getCurrentGrid()[r][c]);
            }
        }
    }

    setRowToTrue(r) {
        if (r >= 0 && r < this.g1.getRows()) {
            for (let c = 0; c < this.g1.getCols(); c++) {
                this.g1.setCell(r, c, true);
            }
        }
    }

    countTrueCells() {
        let trueCount = 0;
        for (let r = 0; r < this.g1.getRows(); r++) {
            for (let c = 0; c < this.g1.getCols(); c++) {
                if (this.g1.getCurrentGrid()[r][c]) {
                    trueCount++;
                }
            }
        }
        return trueCount;
    }

    isSymmetric() {
        for (let r = 0; r < this.g1.getRows(); r++) {
            for (let c = 0; c < this.g1.getCols(); c++) {
                if (this.g1.getCurrentGrid()[r][c] !== this.g1.getCurrentGrid()[c][r]) {
                    return false;
                }
            }
        }
        return true;
    }

    clearGrid() {
        for (let r = 0; r < this.g1.getRows(); r++) {
            for (let c = 0; c < this.g1.getCols(); c++) {
                this.g1.setCell(r, c, false);
            }
        }
    }

    run(g) {
        for (let i = 1; i < g; i++) {
            console.log(`Generation ${i}:`);
            this.display();
            this.g1.update();
            let start = new Date().getTime();
            while (new Date().getTime() - start < 2500) {}
        }
    }
}

module.exports = Game;
