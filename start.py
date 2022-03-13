import pygame
import sys
import numpy


pygame.init()


WIDTH = 600
HEIGHT = 600

BG_COLOUR = (70, 150, 30)
BLACK = (0, 0, 0)
FIRST_COLOUR = (10, 10, 10)
SECOND_COLOUR = (50, 50, 50)

screen = pygame.display.set_mode((WIDTH, HEIGHT))
screen.fill(BG_COLOUR)

board = numpy.zeros((WIDTH, HEIGHT))
pos_array = [75, 225, 375, 525]

x = 450
y = 450

objects = [[3, 3]]


def draw_lines():
    pygame.draw.line(screen, BLACK, (0, 150), (600, 150), 10)
    pygame.draw.line(screen, BLACK, (0, 300), (600, 300), 10)
    pygame.draw.line(screen, BLACK, (0, 450), (600, 450), 10)
    pygame.draw.line(screen, BLACK, (150, 0), (150, 600), 10)
    pygame.draw.line(screen, BLACK, (300, 0), (300, 600), 10)
    pygame.draw.line(screen, BLACK, (450, 0), (450, 800), 10)


draw_lines()


def change_position(x1, y1):
    pygame.draw.circle(screen, FIRST_COLOUR, (pos_array[x1], pos_array[y1]), 50)


def okay_to_move(co):
    if co == -1 or co == 4:
        return False
    return True


def move(dir):
    screen.fill(BG_COLOUR)
    draw_lines()
    for object in objects:
        if dir == "UP":
            if okay_to_move(object[1]-1):
                object[1] -= 1
        elif dir == "DOWN":
            if okay_to_move(object[1] + 1):
                object[1] += 1
        elif dir == "LEFT":
            if okay_to_move(object[0] - 1):
                object[0] -= 1
        elif dir == "RIGHT":
            if okay_to_move(object[0] + 1):
                object[0] += 1
        else:
            print("Something went wrong")

        change_position(object[0], object[1])


while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                move("UP")
            elif event.key == pygame.K_DOWN:
                move("DOWN")
            elif event.key == pygame.K_LEFT:
                move("LEFT")
            elif event.key == pygame.K_RIGHT:
                move("RIGHT")





    pygame.display.update()


