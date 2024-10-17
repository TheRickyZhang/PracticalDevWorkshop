#pragma once

#include <vector>

using namespace std;

class Grid {
public:
    Grid(int rows, int cols);
    void display() const;
    void setCell(int row, int col, bool alive);
    void update();

private:
    int rows, cols;
    std::vector<std::vector<bool>> currentGrid;
    std::vector<std::vector<bool>> nextGrid;

    [[nodiscard]] int countAliveNeighbors(int row, int col) const;
};
