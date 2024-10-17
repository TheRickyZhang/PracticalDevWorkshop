#include "Game.h"

int main() {
    int rows = 10;
    int cols = 10;
    int generations = 20;

    Game game(rows, cols);
    game.run(generations);

    return 0;
}