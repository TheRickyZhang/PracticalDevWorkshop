#pragma once
#include <iostream>

#include "Grid.h"

using namespace std;

class Game {
public:
    Game(int rows, int cols);
    void run(int generations);

private:
    Grid grid;

    void initialize();
    void display() const;
};
