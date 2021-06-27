const fs = require('fs');
let input = fs.readFileSync('./input.txt', 'utf-8');
const lines = input.split('\r\n');

const getFuel = (mass) => parseInt(mass / 3) - 2;

let iterativeSum = 0;
lines.forEach((line) => {
  const mass = Number(line);
  iterativeSum += getFuel(mass)
})

console.log(iterative_sum);
