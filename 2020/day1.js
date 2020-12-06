/*
* Main goal: Get 50 statusbar
* Today goal: Fix your expense report
* How:
** Find two entries that sum 2020
** Multiply the two entries
*/

// key concepts: array.includes, for .. of, array.map, parseInt;
const partOne = (data) => {
  const arrayStrings = data.split('\r\n');
  const arrayNumbers = arrayStrings.map((element) => parseInt(element));
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

const fs = require('fs');
const fsPromises = fs.promises;

// Open file Demo.txt in read mode
fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    console.log(partOne(result));

  })
  .catch((error) => {
    console.log(error);
  });
