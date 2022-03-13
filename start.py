import pygame
import sys
import numpy
from help_classes import GameObject
import time


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
# //150 translates other direction:
pos_array = [75, 225, 375, 525]


clock = pygame.time.Clock()

fps = 60

rectangles = pygame.sprite.Group()
for _ in range(2):
    rectangles.add(GameObject())


def draw_lines():
    pygame.draw.line(screen, BLACK, (0, 150), (600, 150), 10)
    pygame.draw.line(screen, BLACK, (0, 300), (600, 300), 10)
    pygame.draw.line(screen, BLACK, (0, 450), (600, 450), 10)
    pygame.draw.line(screen, BLACK, (150, 0), (150, 600), 10)
    pygame.draw.line(screen, BLACK, (300, 0), (300, 600), 10)
    pygame.draw.line(screen, BLACK, (450, 0), (450, 800), 10)


draw_lines()


while True:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            sys.exit()
        if event.type == pygame.KEYDOWN:
            dir = "NULL"
            if event.key == pygame.K_UP:
                dir = "UP"
            elif event.key == pygame.K_DOWN:
                dir = "DOWN"
            elif event.key == pygame.K_LEFT:
                dir = "LEFT"
            elif event.key == pygame.K_RIGHT:
                dir = "RIGHT"
            for obj in rectangles:
                obj.move(dir)

    screen.fill(BG_COLOUR)
    draw_lines()
    rectangles.draw(screen)
    pygame.display.update()
    clock.tick(fps)



    pygame.display.update()


