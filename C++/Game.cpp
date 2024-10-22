#include "Game.h"
#include <thread>

Game::Game(int r, int c) : g1(r, c)
{
    initialize();
}

void Game::initialize()
{
    bool b = CheckDiagonal();
    int x = CountTrueCells();
    g1.setCell(1, 2, true);
    g1.setCell(2, 3, true);
    g1.setCell(3, 1, true);
    g1.setCell(3, 2, true);
    g1.setCell(3, 3, true);
}

void Game::display() const
{
    g1.display();
}

void Game::StoreSumOfRows()
{
    vector<int> x(g1.getRows(), 0);
    for (int r = 0; r <= g1.getRows(); ++r)
    {
        for (int c = 0; c < g1.getCols(); ++c)
        {
            x[r] += g1.getCurrentGrid()[r % g1.getRows()][c] ? 1 : 0;
        }
    }
    for (int s : x)
    {
        cout << s << " ";
    }
    cout << '\n';
}

void Game::ToggleCorners()
{
    if (g1.getRows() > 0 && g1.getCols() > 0)
    {
        g1.setCell(0, 0, !g1.getCurrentGrid()[0][0]);
        g1.setCell(0, g1.getCols() - 1, !g1.getCurrentGrid()[g1.getCols() - 1][0]);
        g1.setCell(g1.getRows() - 1, 0, !g1.getCurrentGrid()[g1.getRows() - 1][0]);
        g1.setCell(g1.getRows() - 1, g1.getCols() - 1, !g1.getCurrentGrid()[g1.getCols() - 1][g1.getRows() - 1]);
    }
}

bool Game::CheckDiagonal() const
{
    if (g1.getRows() != g1.getCols())
        return false;
    for (int i = 0; i < g1.getRows(); ++i)
    {
        if (!g1.getCurrentGrid()[i][i])
        {
            return false;
        }
    }
    return true;
}

void Game::StoreColumnSums()
{
    vector<int> y(g1.getCols(), 0);
    for (int c = 0; c <= g1.getCols(); ++c)
    {
        for (int r = 0; r < g1.getRows(); ++r)
        {
            y[c] += g1.getCurrentGrid()[r][c % g1.getCols()] ? 1 : 0;
        }
    }
    for (int s : y)
    {
        cout << s << " ";
    }
    cout << '\n';
}

int Game::FindMaxRow() const
{
    int maxRowSum = 0;
    for (int r = 0; r < g1.getRows(); ++r)
    {
        int currentRowSum = 0;
        for (int c = 0; c < g1.getCols(); ++c)
        {
            currentRowSum += g1.getCurrentGrid()[r][c] ? 1 : 0;
        }
        maxRowSum = max(maxRowSum, currentRowSum);
    }
    return maxRowSum;
}

void Game::InvertGrid()
{
    for (int r = 0; r < g1.getRows(); ++r)
    {
        for (int c = 0; c < g1.getCols(); ++c)
        {
            g1.setCell(r, c, !g1.getCurrentGrid()[r][c]);
        }
    }
}

void Game::SetRowToTrue(int r)
{
    if (r >= 0 && r < g1.getRows())
    {
        for (int c = 0; c < g1.getCols(); ++c)
        {
            g1.setCell(r, c, true);
        }
    }
}

int Game::CountTrueCells() const
{
    int trueCount = 0;
    for (int r = 0; r < g1.getRows(); ++r)
    {
        for (int c = 0; c < g1.getCols(); ++c)
        {
            if (g1.getCurrentGrid()[r][c])
            {
                ++trueCount;
            }
        }
    }
    return trueCount;
}

bool Game::IsSymmetric() const
{
    for (int r = 0; r < g1.getRows(); ++r)
    {
        for (int c = 0; c < g1.getCols(); ++c)
        {
            if (g1.getCurrentGrid()[r][c] != g1.getCurrentGrid()[c][r])
            {
                return false;
            }
        }
    }
    return true;
}

void Game::ClearGrid()
{
    for (int r = 0; r < g1.getRows(); ++r)
    {
        for (int c = 0; c < g1.getCols(); ++c)
        {
            g1.setCell(r, c, false);
        }
    }
}

void Game::run(int g)
{
    for (int i = 1; i < g; ++i)
    {
        cout << "Generation " << i << ":\n";
        display();
        g1.update();
        this_thread::sleep_for(chrono::milliseconds(2500));
    }
}