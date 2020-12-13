/*
* Main goal: Get 50 stars
* Today goal: Predict the best place to sit
* How part 1: Find how many seats are occupied
** split input by line to get array of lines
** change every L with a #, because there are 0 seats occupied
** traverse 1 by 1 all the lines
** for each char at each line check if you can change it
** until there is no changes in a complete travesre
*/

const changeSeat = (char, lineSeats, row, col, sizeRow, sizeCol) => {
  // only check in horizontal line
  // cound how many l's and #'s are
  let countOccupied = 0;
  const startCol = col - 1;
  const endCol = col + 1;
  const startRow = row - 1;
  const endRow = row + 1;
  let currRow = startRow >= 0 ? startRow : 0;
  // are there other 'L' around?
  while (currRow < sizeRow && currRow < endRow + 1) {
    let currCol = startCol >= 0 ? startCol : 0;
    while (currCol < sizeCol && currCol <= endCol) {
      // skip index equal to curr column
      if (currCol === col && currRow === row) {
        currCol += 1;
        continue;
      }

      let currChar = lineSeats[currRow][currCol];
      if (currChar === '#')
        countOccupied += 1;
      currCol += 1;
    }
    currRow += 1;
  }
  if (char === '.')
    return false;
  if (char === 'L') {
    if (countOccupied === 0) return true;
    return false;
  }
  if (char === '#') {
    if (countOccupied >= 4) return true;
    return false;
  }
}

const changeStatus = (status) => status === 'L' ? '#' : 'L';

const simulateChanges = (seats) => {
  const sizeRow = seats.length;
  const sizeCol = seats[0].length;
  let newInput = [];
  // when number of changes is 0 stop trying to change the seats;
  let numChanges = 1;
  while (numChanges > 0) {
    numChanges = 0;
    newInput = [];
    for (let row = 0; row < sizeRow; row++) {
      let newLine = '';
      for (let col = 0; col < sizeCol; col++) {
        const seat = seats[row][col];
        change = changeSeat(seat, seats, row, col, sizeRow, sizeCol);
        if (change) {
          numChanges += 1;
          newLine += changeStatus(seat);
        } else {
          newLine += seat;
        }
      }
      newInput.push(newLine);
    }
    seats = newInput;
  }
  return newInput;
}

const transformInput = (input) => input.split('\r\n');

const countOccupied = (seats) => {
  let totalOccupied = 0;
  for (const line of seats) {
    for (let pos = 0; pos <= line.length; pos++) {
      if (line[pos] === '#')
        totalOccupied += 1;
    }
  }
  return totalOccupied;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const seatList = transformInput(result);
    // Part 1
    const seatsSimulated = simulateChanges(seatList);
    const total = countOccupied(seatsSimulated);
    console.log({ total });
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });