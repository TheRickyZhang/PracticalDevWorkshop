class Grid:
    def __init__(self, rows, cols):
        self.rows = rows
        self.cols = cols
        self.current_grid = [[False for _ in range(cols)] for _ in range(rows)]
        self.next_grid = [[False for _ in range(cols)] for _ in range(rows)]

    def get_rows(self):
        return self.rows

    def get_cols(self):
        return self.cols

    def get_current_grid(self):
        return self.current_grid

    def display(self):
        for r in range(self.rows):
            for c in range(self.cols):
                print('*' if self.current_grid[r][c] else '.', end=' ')
            print()

    def update(self):
        for r in range(self.rows):
            for c in range(self.cols):
                alive_neighbors = self.count_alive_neighbors(r, c)
                if self.current_grid[r][c]:
                    self.next_grid[r][c] = (alive_neighbors == 2 or alive_neighbors == 3)
                else:
                    self.next_grid[r][c] = (alive_neighbors == 3)

        self.current_grid = [row[:] for row in self.next_grid]

    def set_cell(self, row, col, alive):
        if self.rows > 0 and row < self.rows and self.cols > 0 and col < self.cols:
            self.current_grid[row][col] = alive

    def count_alive_neighbors(self, row, col):
        dirs = [-1, 0, 1]
        count = 0
        for dr in dirs:
            for dc in dirs:
                if dr == 0 and dc == 0:
                    continue
                r = row + dr
                c = col + dc
                if 0 <= r < self.rows and 0 <= c < self.cols and self.current_grid[r][c]:
                    count += 1
        return count
