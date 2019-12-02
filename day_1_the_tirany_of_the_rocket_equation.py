'''
The tirany of the rocket equation - Advent of Code
'''
def fuel_required_by_module(mass):
    return int(mass/float(3)) - 2

def total_fuel_required(arr_mass):
    total = 0
    for mass in arr_mass:
        total += fuel_required_by_module(mass)
    return total

arr_mass = []
with open("input.txt") as file:
    for line in file:
        t = int(line)
        print t
        arr_mass.append(t)
print total_fuel_required(arr_mass)


