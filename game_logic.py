import numpy
import random

ROWS = 4
COLS = 4


matrix = numpy.zeros((ROWS, COLS))


def new_rand(board):

    free = []
    for i in range(ROWS):
        for j in range(COLS):
            if board[i][j] == 0:
                free.append([i, j])
    x = random.randint(0, len(free)-1)
    return free[x][0], free[x][1]


def compress(board):

    new_board = numpy.zeros((ROWS, COLS))
    for j in range(COLS):
        new_board[0][j] = board[0][j]

    for i in range(1, ROWS):
        for j in range(COLS):
            if new_board[i-1][j] == 0:
                new_board[i-1][j] = board[i][j]
            elif new_board[i-1][j] == board[i][j]:
                new_board[i-1][j] = 2 * board[i][j]
            else:
                new_board[i][j] = board[i][j]
    
    return new_board


matrix[0][2] = 4
matrix[1][2] = 4
print(matrix)
print(compress(matrix))
