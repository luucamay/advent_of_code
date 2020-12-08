/*
* Main goal: Get 50 statusbar
* Today goal: Find the highest set ID on a boarding pass
* How:
** open the input file
** convert input to array of line strings
** create a function to get ID from a borading pass
** find max of seat ID
*/

const transformInput = (string) => string.split('\r\n');

const getID = (boardingPassStr) => {
  // traverse the fisrt 7 chars from boardingpass string
  let start = 0;
  let end = 127;
  for (let i = 0; i < 7; i++) {
    const currLetter = boardingPassStr[i];
    // discover new start or end
    // round down when F
    if (currLetter === 'F')
      end = Math.floor((start + end) / 2);
    else
      start = Math.floor((start + end) / 2) + 1;

  }
  const row = start;
  start = 0;
  end = 7;
  const tailStr = boardingPassStr.slice(-3);
  for (let i = 0; i < 3; i++) {
    const currLetter = tailStr[i];
    if (currLetter === 'L')
      end = Math.floor((start + end) / 2);
    else
      start = Math.floor((start + end) / 2) + 1;
  }
  const col = start;
  const id = row * 8 + col;
  return id;
}

const getHighestSeatID = (boardingPassArray) => {
  let max = -1;
  for (const boardingPass of boardingPassArray) {
    const id = getID(boardingPass);
    if (max < id)
      max = id;
  }
  return max;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const boardingPassList = transformInput(result);
    // Part 1
    const highestSeatID = getHighestSeatID(boardingPassList);
    console.log({highestSeatID});
    // Part 2

  })
  .catch((error) => {
    console.log(error);
  });
