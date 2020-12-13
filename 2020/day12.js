/*
* Main goal: Get 50 stars
* Today goal: Understand the ship navigation system
* How part 1: Get final coords of ship and multiply them
** split input by line to get array of instructions
** traverse the instructions array
** set currDirectionsStr to 'ESWN'
** set currentPos  = [0,0] row is for north and south, colum is for east and west
** get instruction and value
** Ask if change direction (L, R)
*** divide by 90
*** get number of times to rotate
*** rotate or rotate inverse initial direction the above number of times
** else set newDirection
*** if forward use currDir otherwise use the instruction
*** add or substract to row or colum
*/

const rotate = (string) => string.slice(1) + string[0];
const rotateInverse = (string) => string.slice(-1) + string.slice(0, 3);

const changeDirection = (directions, instruction, value) => {
  const numTimes = value / 90;
  const rotateFunction = instruction === 'R' ? rotate : rotateInverse;
  for (let t = 0; t < numTimes; t++) {
    directions = rotateFunction(directions);
  }
  return directions;
}

const getCoords = (instructions) => {
  let currDirections = 'ESWN';
  let position = [0, 0];
  for (const line of instructions) {
    const instruction = line[0];
    const value = parseInt(line.slice(1));

    if (instruction === 'L' || instruction === 'R') {
      currDirections = changeDirection(currDirections, instruction, value);
    } else {
      const newDir = instruction === 'F' ? currDirections[0] : instruction;
      switch (newDir) {
        case 'N':
          position[0] += value;
          break;
        case 'S':
          position[0] -= value;
          break;
        case 'E':
          position[1] += value;
          break;
        default:
          position[1] -= value;
          break;
      }
    }
  }
  // console.log(position);
  return Math.abs(position[0]) + Math.abs(position[1]);
}

const transformInput = (input) => input.split('\r\n');

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const instructions = transformInput(result);
    // Part 1
    const sum = getCoords(instructions);
    console.log({ sum });
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });