'''
The tirany of the rocket equation - Advent of Code
'''
# Part 1
def get_fuel(mass):
    return int(mass/float(3)) - 2

def get_fuel_recursive(mass, calculated_sum=0):
    if mass <= 0:
        return calculated_sum
    n_fuel = get_fuel(mass)
    return get_fuel_recursive(n_fuel, calculated_sum + max(0, n_fuel))

iterative_sum = 0
recursive_sum = 0
with open("input.txt") as file:
    for line in file:
        mass = int(line)
        iterative_sum += get_fuel(mass)
        recursive_sum += get_fuel_recursive(mass)

print iterative_sum
print recursive_sum


