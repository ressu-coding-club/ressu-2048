import numpy
import random

ROWS = 4
COLS = 4


matrix = numpy.zeros((ROWS, COLS))


def upside_down(board):
    new_board = numpy.zeros((ROWS, COLS))
    for i in range(ROWS):
        for j in range(COLS):
            new_board[i][j] = board[ROWS-i-1][j]
    return new_board


def transpose(board):
    new_board = numpy.zeros((ROWS, COLS))
    for i in range(ROWS):
        for j in range(COLS):
            new_board[i][j] = board[j][i]

    return new_board


def new_rand(board):

    # adds a 2 to an empty place

    free = []
    for i in range(ROWS):
        for j in range(COLS):
            if board[i][j] == 0:
                free.append([i, j])
    x = random.randint(0, len(free)-1)
    board[free[x][0]][free[x][1]] = 2
    return board


def compress(board):

    # this moves all up. Down, left and right are done by first altering
    # the original matrix

    new_board = numpy.zeros((ROWS, COLS))
    for j in range(COLS):
        new_board[0][j] = board[0][j]

    for i in range(1, ROWS):
        for j in range(COLS):
            x = i

            while x - 1 >= 0 and new_board[x-1][j] == 0:
                x -= 1

            if new_board[x-1][j] == board[i][j]:
                new_board[x-1][j] = 2 * board[i][j]
            else:
                new_board[x][j] = board[i][j]
    
    return new_board


def swipe_up(board):
    return compress(board)


def swipe_down(board):

    return upside_down(compress(upside_down(board)))


def swipe_left(board):

    return transpose(compress(transpose(board)))


def swipe_right(board):

    return transpose(upside_down(compress(upside_down(transpose(board)))))


def move(board, direction):

    # returns board after move to direction

    if direction == "UP":
        return swipe_up(board)
    elif direction == "DOWN":
        return swipe_down(board)
    elif direction == "RIGHT":
        return swipe_right(board)
    elif direction == "LEFT":
        return swipe_left(board)
    else:
        print("Something went wrong")
        return []


def able_to_move(board):

    # return False/0 if cannot move in any direction, else True/1

    hor = (swipe_right(board) != board) or (swipe_left(board) != board)
    ver = (swipe_up(board) != board) or (swipe_down(board) != board)
    return hor or ver


matrix[0][2] = 4
matrix[1][2] = 4
matrix[3][3] = 8
matrix = new_rand(matrix)
matrix = new_rand(matrix)
matrix = new_rand(matrix)

print(matrix)
print(swipe_left(matrix))
