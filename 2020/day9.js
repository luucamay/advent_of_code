/*
* Main goal: Get 50 stars
* Today goal: Atack the weakness of XMAS encrypted data
* How part 1: Find the first not valid number
** split the input by line
** create a function that checks each number is valid
** validate a number by using the number and the offset
** check the number is a sum of 2 numbers from the preamble, and those 2 numbers are different
** if it is not a valid number return it!
*/

const transformInput = (input) => input.split('\r\n').map((num) => parseInt(num));

const findNotValidNumber = (numbers, preamble) => {
  for (let i = preamble; i < numbers.length; i++) {
    if (!valid(numbers[i], numbers, preamble, i))
      return numbers[i];
  }
  return 0;
}

const valid = (number, numbers, preamble, pos) => {
  let start = pos - preamble;
  const subarray = numbers.slice(start, pos);
  for (const numberA of subarray) {
    const numberB = number - numberA;
    if (numberA !== numberB && subarray.includes(numberB))
      return true;
  }
  return false;
}

// How I built this: https://www.geeksforgeeks.org/find-subarray-with-given-sum/
const subArraySum = (arr, sum) => {
  let n = arr.length;
  let currSum = arr[0];
  let start = 0;
  let end = 1;
  while (end < n) {
    while (currSum > sum && start < end - 1) {
      currSum = currSum - arr[start]
      start += 1
    }

    if (currSum == sum)
      return arr.slice(start, end);

    currSum = currSum + arr[end];
    end += 1;

  }
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const numberList = transformInput(result);
    // Part 1
    const notValidNumber = findNotValidNumber(numberList, 25);
    console.log({ notValidNumber });
    // Part 2
    const sumSet = subArraySum(numberList, notValidNumber);
    const min = Math.min(...sumSet);
    const max = Math.max(...sumSet);
    console.log(min + max);
  })
  .catch((error) => {
    console.log(error);
  });