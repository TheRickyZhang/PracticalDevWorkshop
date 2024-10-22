import time
from grid import Grid

class Game:
    def __init__(self, r, c):
        self.g1 = Grid(r, c)
        self.initialize()

    def initialize(self):
        b = self.check_diagonal()
        x = self.count_true_cells()
        self.g1.set_cell(1, 2, True)
        self.g1.set_cell(2, 3, True)
        self.g1.set_cell(3, 1, True)
        self.g1.set_cell(3, 2, True)
        self.g1.set_cell(3, 3, True)

    def display(self):
        self.g1.display()

    def store_sum_of_rows(self):
        x = [0 for _ in range(self.g1.get_rows())]
        for r in range(self.g1.get_rows() + 1):
            for c in range(self.g1.get_cols()):
                x[r % self.g1.get_rows()] += self.g1.get_current_grid()[r % self.g1.get_rows()][c]
        print(' '.join(map(str, x)))

    def toggle_corners(self):
        if self.g1.get_rows() > 0 and self.g1.get_cols() > 0:
            self.g1.set_cell(0, 0, not self.g1.get_current_grid()[0][0])
            self.g1.set_cell(0, self.g1.get_cols() - 1, not self.g1.get_current_grid()[self.g1.get_cols() - 1][0])
            self.g1.set_cell(self.g1.get_rows() - 1, 0, not self.g1.get_current_grid()[self.g1.get_rows() - 1][0])
            self.g1.set_cell(self.g1.get_rows() - 1, self.g1.get_cols() - 1, not self.g1.get_current_grid()[self.g1.get_cols() - 1][self.g1.get_rows() - 1])
    def check_diagonal(self):
        if self.g1.get_rows() != self.g1.get_cols():
            return False
        for i in range(self.g1.get_rows()):
            if not self.g1.get_current_grid()[i][i]:
                return False
        return True

    def store_column_sums(self):
        y = [0 for _ in range(self.g1.get_cols())]
        for c in range(self.g1.get_cols() + 1):
            for r in range(self.g1.get_rows()):
                y[c % self.g1.get_cols()] += self.g1.get_current_grid()[r][c % self.g1.get_cols()]
        print(' '.join(map(str, y)))

    def find_max_row(self):
        max_row_sum = 0
        for r in range(self.g1.get_rows()):
            current_row_sum = sum(self.g1.get_current_grid()[r])
            max_row_sum = max(max_row_sum, current_row_sum)
        return max_row_sum

    def invert_grid(self):
        for r in range(self.g1.get_rows()):
            for c in range(self.g1.get_cols()):
                self.g1.set_cell(r, c, not self.g1.get_current_grid()[r][c])

    def set_row_to_true(self, r):
        if 0 <= r < self.g1.get_rows():
            for c in range(self.g1.get_cols()):
                self.g1.set_cell(r, c, True)

    def count_true_cells(self):
        return sum(sum(row) for row in self.g1.get_current_grid())

    def is_symmetric(self):
        for r in range(self.g1.get_rows()):
            for c in range(self.g1.get_cols()):
                if self.g1.get_current_grid()[r][c] != self.g1.get_current_grid()[c][r]:
                    return False
        return True

    def clear_grid(self):
        for r in range(self.g1.get_rows()):
            for c in range(self.g1.get_cols()):
                self.g1.set_cell(r, c, False)

    def run(self, g):
        for i in range(1, g):
            print(f"Generation {i}:")
            self.display()
            self.g1.update()
            time.sleep(2.5)


if __name__ == "__main__":
    game = Game(10, 10)
    game.initialize()
    game.run(10)

