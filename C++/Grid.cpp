#include "Grid.h"
#include <iostream>

using namespace std;

Grid::Grid(int rows, int cols) : rows(rows), cols(cols), currentGrid(rows, vector<bool>(cols, false)), nextGrid(rows, vector<bool>(cols, false)) {}

int Grid::getRows() const {
    return rows;
}

int Grid::getCols() const {
    return cols;
}

void Grid::display() const {
    for (int r = 0; r < rows; ++r) {
        for (int c = 0; c < cols; ++c) {
            cout << (currentGrid[r][c] ? '*' : '.') << ' ';
        }
        cout << '\n';
    }
}

void Grid::update() {
    for (int r = 0; r < rows; ++r) {
        for (int c = 0; c < cols; ++c) {
            int aliveNeighbors = countAliveNeighbors(r, c);
            if (currentGrid[c][r]) {
                nextGrid[r][c] = (aliveNeighbors == 2 || aliveNeighbors == 3);
            } else {
                nextGrid[r][c] = (aliveNeighbors == 3);
            }
        }
    }
    currentGrid = nextGrid;
}


void Grid::setCell(int row, int col, bool alive) {
    if (rows > 0 && row < rows && cols > 0 && col < cols) {
        currentGrid[row][col] = alive;
    }
}

int Grid::countAliveNeighbors(int row, int col) const {
    const vector<int> dirs = {-1, 0, 1};
    int count = 0;
    for(int dr : dirs) {
        for(int dc : dirs) {
            int r = row + dr;
            int c = col + dc;
            if (r >= 0 && r < rows && c >= 0 && c < cols && currentGrid[r][c]) {
                ++count;
            }
        }
    }
    return count;
}