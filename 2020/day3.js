/*
* Main goal: Get 50 statusbar
* Today goal: Count trees found while folling down in the Toboggan
* How:
** Use a map line by line
** Get the lenght of the wide of the map (the same for each line)
** check if a currentPosition has a tree and then count
** goNext position (array of next postition)
** calibrate position (if is the bottom, stop going next) (if the end of the row reset to start position)
**
*/

// Count the trees found while following down in the toboggan
const countTrees = (map) => {
  let totalTrees = 0;
  const heightSize = map.length;
  const widthSize = map[0].length;
  let nextStep = 0;
  const positions = [
    [0, 1],
    [0, 1],
    [0, 1],
    [1, 0]
  ]
  // while we do not arrive to the bottom keep running!
  let currRow = 0;
  let currCol = 0;
  while (currRow < heightSize - 1) {
    const positionToAdd = positions[nextStep];
    // review positions
    currRow = currRow + positionToAdd[0];
    currCol = currCol + positionToAdd[1];
    if (currCol === widthSize) currCol = 0;
    nextStep = nextStep + 1;
    // Count tree only if this was the last step!
    if (nextStep > 3) {
      if (map[currRow][currCol] === '#') totalTrees = totalTrees + 1;
      nextStep = nextStep % 4; // or just reset it to 0
    }
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

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    // const otherString = '..##.......\r\n#...#...#..\r\n.#....#..#.\r\n..#.#...#.#\r\n.#...##..#.\r\n..#.##.....\r\n.#.#.#....#\r\n.#........#\r\n#.##...#...\r\n#...##....#\r\n.#..#...#.#';
    newMap = getMap(result);
    // Part 1
    console.log(countTrees(newMap));
    // Part 2
    // console.log(countValidPasswords(arrayStrings, isValidPassword2));
  })
  .catch((error) => {
    console.log(error);
  });