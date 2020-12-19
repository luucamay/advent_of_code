/*
* Main goal: Get 50 statusbar
* Title: Toboggan Trajectory
* Today goal: Count trees found while folling down in the Toboggan
* How:
** Use a map line by line
** Get the lenght of the wide of the map (the same for each line)
** check if a currentPosition has a tree and then count
** goNext position (array of next postition)
** calibrate position (if is the bottom, stop going next) (if the end of the row reset to start position)
* KEY concepts:
** array.reduce, array of arrays, matrix, string.split
*/

// Count the trees found while following down in the toboggan
const countTrees = (map, positionToAdd) => {
  let totalTrees = 0;
  const heightSize = map.length;
  const widthSize = map[0].length;
  // while we do not arrive to the bottom keep running!
  let currRow = 0;
  let currCol = 0;
  while (currRow < heightSize - 1) {
    // review positions
    currRow = currRow + positionToAdd[0];
    currCol = currCol + positionToAdd[1];
    // Important: You use module to calcule how many spaces go to beggining
    if (currCol >= widthSize) currCol = currCol % widthSize;
    const elementFound = map[currRow][currCol];
    if (elementFound === '#') totalTrees = totalTrees + 1;
  }
  return totalTrees;
}

const getMap = (string) => {
  const map = [];
  const arrayStrings = string.split('\r\n');
  for (const line of arrayStrings) {
    const subArray = line.split('');
    map.push(subArray);
  }
  return map;
}
const countTreesAllSlopes = (map) => {
  const answers = []
  answers[0] = countTrees(map, [1, 1]);
  answers[1] = countTrees(map, [1, 3]);
  answers[2] = countTrees(map, [1, 5]);
  answers[3] = countTrees(map, [1, 7]);
  answers[4] = countTrees(map, [2, 1]);
  const reducer = (accumulator, currentValue) => accumulator * currentValue;
  const multiplication = answers.reduce(reducer);
  return multiplication;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    newMap = getMap(result);
    // Part 1
    console.log(countTrees(newMap, [1, 3]));
    // Part 2
    console.log(countTreesAllSlopes(newMap));
  })
  .catch((error) => {
    console.log(error);
  });
