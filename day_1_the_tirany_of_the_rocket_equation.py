'''
The tirany of the rocket equation - Advent of Code
'''
# Part 1
def fuel_required_by_module(mass):
    return int(mass/float(3)) - 2

total = 0
with open("input.txt") as file:
    for line in file:
        mass = int(line)
        total += fuel_required_by_module(mass)
print total


