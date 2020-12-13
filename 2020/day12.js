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
  console.log(directions);
  return directions;
}

changeDirection('ESWN', 'L', 90)