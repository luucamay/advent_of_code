const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf-8');
const lines = input.split('\r\n');

const getFuel = (mass) => Math.floor(mass / 3) - 2;

const getFuelRecursive = (mass, calculatedSum = 0) => {
  if (mass <= 0)
    return calculatedSum
  const nFuel = getFuel(mass)
  return getFuelRecursive(nFuel, calculatedSum + Math.max(0, nFuel))
}

let iterativeSum = 0;
let recursiveSum = 0
lines.forEach((line) => {
  const mass = Number(line);
  iterativeSum += getFuel(mass);
  recursiveSum += getFuelRecursive(mass)
})



console.log(recursiveSum);
