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
      const newPos = updatePostion(newDir, value);
      position[0] += newPos[0];
      position[1] += newPos[1];
    }
  }
  // console.log(position);
  return Math.abs(position[0]) + Math.abs(position[1]);
}

const transformInput = (input) => input.split('\r\n');

const updatePostion = (direction, steps) => {
  const newPosition = [0, 0];
  switch (direction) {
    case 'N':
      newPosition[0] += steps;
      break;
    case 'S':
      newPosition[0] -= steps;
      break;
    case 'E':
      newPosition[1] += steps;
      break;
    default:
      newPosition[1] -= steps;
      break;
  }
  return newPosition;
}

// Part 2

const changeDirectionWaypoint = (currDirections, position, instruction, value) => {
  const numTimes = value / 90;
  let finalPosition = [0, 0];
  const rotateFunction = instruction === 'R' ? rotate : rotateInverse;
  for (let t = 0; t < numTimes; t++) {
    currDirections = rotateFunction(currDirections);
    // change first coordinate: define if it goes to row or column
    let newPostion1 = updatePostion(currDirections[0], position[0]);
    let newPosition2 = updatePostion(currDirections[1], position[1]);
    finalPosition[0] = newPostion1[0] + newPosition2[0];
    finalPosition[1] = newPostion1[1] + newPosition2[1];
  }
  return finalPosition;
}

const getCoordsWaypointShip = (instructions) => {
  let currDirections = 'NESW';
  // north/south at row, east/west at column
  let relPosWaypoint = [1, 10];
  let posShip = [0, 0];
  for (const line of instructions) {
    const instruction = line[0];
    const value = parseInt(line.slice(1));

    if (instruction === 'L' || instruction === 'R') {
      relPosWaypoint = changeDirectionWaypoint(currDirections, relPosWaypoint, instruction, value);
    } else {
      // updatePostions
      if (instruction !== 'F') {
        const newPos = updatePostion(instruction, value);
        relPosWaypoint[0] += newPos[0];
        relPosWaypoint[1] += newPos[1];
      } else {
        posShip[0] += relPosWaypoint[0] * value;
        posShip[1] += relPosWaypoint[1] * value;
      }
    }
  }
  return Math.abs(posShip[0]) + Math.abs(posShip[1]);
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const instructions = transformInput(result);
    // Part 1
    const sum = getCoords(instructions);
    console.log({ sum });
    // Part 2
    const sum2 = getCoordsWaypointShip(instructions);
    console.log({ sum2 });
  })
  .catch((error) => {
    console.log(error);
  });