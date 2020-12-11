/*
* Main goal: Get 50 stars
* Today goal: Charge the battery of your device
* How part 1: Find the number of 1 jolt difference and the number of 3 jolts difference multiplied
** split input by line and convert to number
** sort array adapters
** start counter of 1's and 3's differences
** traverse the array and find differences
** multiply counters
*/
const transformInput = (input) => input.split('\r\n').map((num) => parseInt(num));

const numberJoltDifferences = (rateAdapterList) => {
  rateAdapterList.sort((a, b) => a - b);
  // now rateAdapterList is sorted
  const diffs = [0, 0, 1];
  let prev = 0;
  for (const rate of rateAdapterList) {
    const diff = rate - prev;
    switch (diff) {
      case 1:
        diffs[0] += 1;
        break;
      case 3:
        diffs[2] += 1;
    }
    prev = rate;
  }
  return diffs[0] * diffs[2];
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const numberList = transformInput(result);
    // Part 1
    const multipliedDiffs = numberJoltDifferences(numberList);
    console.log({ multipliedDiffs });
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });