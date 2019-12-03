import random
from math import sin, pi, sqrt, exp

MIN = -10
MAX = 10
MUTATION_RATE = 0.01

class Individual:

    def __init__(self, mutationRate = MUTATION_RATE):
        self.mutationRate = mutationRate

        self.chromosome = [
            random.uniform(MIN, MAX),
            random.uniform(MIN, MAX)
        ]

    def __repr__(self):
        return f"({self.chromosome[0]:3}, {self.chromosome[1]:3})"

    def fitness(self):
        x = self.chromosome[0]
        y = self.chromosome[1]
        
        t = sqrt((x**2 / pi) + (y**2 / pi))
        try: 
            return sin(t) / t
        except:
            return 1
        #return 0.5*x*exp(-(x**2)/15.0-(y**2)/15.0)

    def crossover(self, partner, crossoverType):
        child = Individual(self.mutationRate)

        # Clonar o de maior fitness
        if (crossoverType == "ELITE"):
            if (self.fitness() < partner.fitness()):
                child.chromosome = self.chromosome
            else:
                child.chromosome = partner.chromosome
        # Heranca aleatoria
        elif (crossoverType == "HALF"):
            if (random.random() < 0.5):
                child.chromosome[0] = self.chromosome[0]
            else:
                child.chromosome[0] = partner.chromosome[0]
            
            if (random.random() < 0.5):
                child.chromosome[1] = self.chromosome[1]
            else:
                child.chromosome[1] = partner.chromosome[1]
        # Garantir que o de melhor fitness ao menos um cromossomo
        elif (crossoverType == "HALF_ELITE"):
            cont = 0
            if (self.fitness() < partner.fitness()):
                if(random.random() < 0.5):
                    child.chromosome[0] = self.chromosome[0]
                    cont += 1
                else:
                    child.chromosome[1] = self.chromosome[1]
            else:
                if(random.random() < 0.5):
                    child.chromosome[0] = partner.chromosome[0]
                    cont += 1
                else:
                    child.chromosome[1] = partner.chromosome[1]
            
            if (random.random() < 0.5):
                child.chromosome[cont] = self.chromosome[cont]
            else:
                child.chromosome[cont] = partner.chromosome[cont]

        return child

    def mutate(self):
        if (random.random() < self.mutationRate):     
            self.chromosome = [
                random.uniform(MIN, MAX),
                random.uniform(MIN, MAX)
            ]
        

