import pygame
import random

pygame.init()

WIDTH = 600
HEIGHT = 600

colour_list = [(100, 0, 0), (100, 100, 100), (50, 200, 20)]
pos_array = [75, 225, 375, 525]


class GameObject(pygame.sprite.Sprite):
    def __init__(self):
        pygame.sprite.Sprite.__init__(self)
        width, height = 100, 100

        self.level = 1
        self.colour = colour_list[self.level-1]
        self.image = pygame.Surface([width, height])
        self.image.fill(self.colour)
        self.rect = self.image.get_rect()
        self.y = pos_array[random.randint(0, 3)]
        self.x = pos_array[random.randint(0, 3)]
        self.rect.center = (self.x, self.y)

    def move(self, dir):
        ny = self.y 
        nx = self.x
        if dir == "UP":
            ny -= 150
        elif dir == "DOWN":
            ny += 150
        elif dir == "RIGHT":
            nx += 150
        elif dir == "LEFT":
            nx -= 150
        else:
            print("Something went wrong")
        if ny > 0 and ny < 600 and nx > 0 and nx < 600:
            self.y, self.x = ny, nx
            self.rect.center = (self.x, self.y)
    
    def upgrade(self):
        if self.level < 3:
            self.level += 1
        self.colour = colour_list[self.level-1]
        self.image.fill(self.colour)
