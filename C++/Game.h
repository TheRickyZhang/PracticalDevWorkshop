#pragma once
#include <iostream>
#include "Grid.h"

using namespace std;

class Game {
public:
    Game(int r, int c);
    void run(int g);

private:
    Grid g1;

    void StoreSumOfRows();
    void ToggleCorners();
    bool CheckDiagonal() const;
    void StoreColumnSums();
    int FindMaxRow() const;
    void InvertGrid();
    void initialize();
    void display() const;
    void SetRowToTrue(int r);
    int CountTrueCells() const;
    bool IsSymmetric() const;
    void ClearGrid();
};