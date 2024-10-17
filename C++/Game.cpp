#include "Game.h"

#include <thread>

Game::Game(int rows, int cols) : grid(rows, cols) {
    initialize();
}

void Game::initialize() {
    grid.setCell(1, 2, true);
    grid.setCell(2, 3, true);
    grid.setCell(3, 1, true);
    grid.setCell(3, 2, true);
    grid.setCell(3, 3, true);
}

void Game::display() const {
    grid.display();
}

void Game::run(int generations) {
    for (int i = 1; i < generations; ++i) {
        cout << "Generation " << i << ":\n";
        display();
        grid.update();
        this_thread::sleep_for(chrono::milliseconds(500));
    }
}