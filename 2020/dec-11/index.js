/*
* Main goal: Get 50 stars
* Title: Seating System
* Today goal: Predict the best place to sit
* How part 1: Find how many seats are occupied
** split input by line to get array of lines
** change every L with a #, because there are 0 seats occupied
** traverse 1 by 1 all the lines
** for each char at each line check if you can change it
** until there is no changes in a complete travesre
*/

const checkValid = (seats, row, col) => {
  if (row < 0 || col < 0) return false;
  if (row >= seats.length) return false;
  if (col >= seats[0].length) return false;
  return true;
}

const isOccupied = (seats, row, col, rowdiff, coldiff, part1) => {
  row += rowdiff;
  col += coldiff;
  if (!checkValid(seats, row, col)) return false;
  while (seats[row][col] === '.' && !part1) {
    row += rowdiff;
    col += coldiff;
    if (!checkValid(seats, row, col)) return false;
  }
  if (seats[row][col] === '#')
    return true;
  return false;
}

const countOccupied = (seats, row, col) => {
  let count = 0;
  const moves = [0, 1, -1];
  for (const i of moves) {
    for (const j of moves) {
      if (i !== 0 || j !== 0)
        if (isOccupied(seats, row, col, i, j, true))
          count += 1;
    }
  }
  return count;
}

const simulateChanges = (seats) => {
  seats = seats.map((line) => line.replace(/L/g, '#'));
  let newSeats = [];
  const sizeRow = seats.length;
  const sizeCol = seats[0].length;
  // when number of changes is 0 stop trying to change the seats;
  let numChanges = 1;
  let total = 0;
  while (numChanges > 0) {
    total += 1;
    numChanges = 0;
    newSeats = [];
    for (let row = 0; row < sizeRow; row++) {
      let newLine = '';
      for (let col = 0; col < sizeCol; col++) {
        const seat = seats[row][col];
        if (seat !== '.') {
          const occupied = countOccupied(seats, row, col);
          // console.log({occupied, row, col, seat});
          if (seat === 'L' && occupied === 0) {
            newLine += '#';
            numChanges += 1;
          } // change next condition to occupied >= 5 for part 2
          else if (seat === '#' && occupied >= 4) {
            newLine += 'L';
            numChanges += 1;
          } else newLine += seat;
        } else newLine += seat;
      }
      newSeats.push(newLine);
    }
    seats = newSeats;
  }
  return newSeats;
}

const transformInput = (input) => input.split('\r\n');

const countOccupiedFinal = (seats) => {
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
    // Part 2
    const seatsSimulated = simulateChanges(seatList);
    const total = countOccupiedFinal(seatsSimulated);
    console.log({ total });
  })
  .catch((error) => {
    console.log(error);
  });