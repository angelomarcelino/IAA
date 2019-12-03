from individual import Individual
from random import choice
from math import floor
from sys import argv
import matplotlib.pyplot as plt

def mapRange(currentRange, desiredRange, value):
    (a1, a2), (b1, b2) = currentRange, desiredRange
    return b1 + ((value - a1) * (b2 - b1) / (a2 - a1))


if __name__ == '__main__':
    try:
        crossoverType = argv[1]
        maxGeneration = int(argv[2])
        popSize = int(argv[3])
        mutationRate = float(argv[4])
    except:
        print(f"Arguments missing!\nUsage: {argv[0]} crossoverType maxGeneration popSize mutationRate")
        print("crossoverType: ELITE, HALF, HALF_ELITE")
        exit()


    population = [Individual(mutationRate) for _ in range(popSize)]

    generation = 0
    previousBest = population[0]
    fitnessPltX = []
    fitnessPltY = []
    while (generation < maxGeneration):

        # Encontarar o mehlor individuo
        minFitness = 1
        best = None
        for individual in population:
            if (individual.fitness() < minFitness):
                minFitness = individual.fitness()
                best = individual

        # Gerar a matting Pool
        mattingPool = []
        for individual in population:
            fitnessNormalized = mapRange(
                (-1, 1), (1, 0),
                individual.fitness()
            )

            for _ in range(floor(fitnessNormalized * 10)):
                mattingPool.append(individual)

        # Gera a nova populacao
        population = []
        for _ in range(popSize):
            # Seleciona os pais
            partner_1 = mattingPool[choice(range(0, len(mattingPool)))]
            partner_2 = mattingPool[choice(range(0, len(mattingPool)))]

            # Gera a prole
            child = partner_1.crossover(partner_2, crossoverType)
            child.mutate()

            population.append(child)

        if (previousBest.fitness() != best.fitness()):
            print(f'Generation: {generation:3}')
            print(f'\tBest: {best} Fitness: {best.fitness()}')
            fitnessPltX.append(generation)
            fitnessPltY.append(best.fitness())

        previousBest = best

        generation += 1

    plt.figure(figsize=(10,5))
    plt.xlabel('Generation')
    plt.ylabel('Fitness')
    plt.plot(fitnessPltX, fitnessPltY, 'or-')
    plt.grid(color='black', linestyle='dashed', linewidth=.5, markevery=.0001)
    fig = plt.gcf()
    #fig.savefig(f"{crossoverType}_{maxGeneration}_{popSize}_{mutationRate}.png", dpi=100)
    plt.show()
