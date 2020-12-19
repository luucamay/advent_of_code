/*
* Main goal: Get 50 statusbar
* Title: Report Repair
* Today goal: Fix your expense report
* How:
** Find two entries that sum 2020
** Multiply the two entries
*/

// key concepts: array.includes, for .. of, array.map, parseInt;
const partOne = (arrayNumbers) => {
  let numberA, numberB;
  // TODO use a set
  for (const currentNumber of arrayNumbers) {
    const numberToFind = 2020 - currentNumber;
    if (arrayNumbers.includes(numberToFind)) {
      numberA = currentNumber;
      numberB = numberToFind;
      break;
    }
  }
  const finalResult = numberA * numberB;
  return finalResult;
}

const partTwo = (numbersList) => {
  let A, B, C;
  for (const numA of numbersList) {
    for (const numB of numbersList) {
      const numC = 2020 - numA - numB;
      if (numbersList.includes(numC)) {
        A = numA;
        B = numB;
        C = numC;
        break;
      }
    }
  }
  return A*B*C;
}

const fs = require('fs');
const fsPromises = fs.promises;

// Open file Demo.txt in read mode
fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const arrayStrings = result.split('\r\n');
    const arrayNumbers = arrayStrings.map((element) => parseInt(element));
    console.log(partOne(arrayNumbers));
    console.log(partTwo(arrayNumbers));
  })
  .catch((error) => {
    console.log(error);
  });
