/*
* Main goal: Get 50 statusbar
* Binary Boarding
* Today goal: Find the highest set ID on a boarding pass
* How part 1:
** open the input file
** convert input to array of line strings
** create a function to get ID from a borading pass
** find max of seat ID
* Goal part 2: Find your seat ID
* How part 2:
** create array of seat ids
** sort array of seat ids
** check if a number is missing! that is your seat!!!
*/

const transformInput = (string) => string.split('\r\n');

const getID = (boardingPassStr) => {
  // traverse the fisrt 7 chars from boardingpass string
  let start = 0;
  let end = 127;
  // TODO implement binary search function to call for row and col value
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
  //console.log({ row, col, id });
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

const findMissingSeatID = (boardingPassArray) => {
  const seatIDs = boardingPassArray.map((boardingPass) => getID(boardingPass));
  seatIDs.sort(function (a, b) {
    return a - b;
  });
  let previousID = seatIDs[0];
  for (let i = 1; i < seatIDs.length - 1; i++) {
    //console.log(previousID);
    if (previousID !== seatIDs[i] - 1)
      return seatIDs[i] - 1;
    previousID = seatIDs[i];
  }
  return 0;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const boardingPassList = transformInput(result);
    // Part 1
    const highestSeatID = getHighestSeatID(boardingPassList);
    console.log({ highestSeatID });
    // Part 2
    const missingID = findMissingSeatID(boardingPassList);
    console.log({missingID}); //99 it is not the answer :(
  })
  .catch((error) => {
    console.log(error);
  });
