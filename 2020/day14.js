/*
* Main goal: Get 50 stars
* Today goal: Decode the docked data
* How part 1: Get the sum of all values written in memory
** get the masks and the writes to memory
** sum all the numbers writenn in memory
* Consider:
** the memory is always a 36 bits size (2^35) Use BigInt please!!!
* Resource about bits => https://realpython.com/python-bitwise-operators/#bitmasks
* Using BigInt -> https://dev.to/aumayeung/using-javascript-bigint-to-represent-large-numbers-2icf
*/

const transformInput = (input) => {
  const lines = input.split('\r\n');
  const keyValues = lines.map((line) => line.split(' = '));
  return keyValues;
}

const sumValsMemory = (memory) => {
  let sum = BigInt(0);
  for (const val in memory) {
    sum += memory[val];
  }
  return sum;
}

const getSumAllValues = (keyVals) => {
  const memory = {};
  let mask;
  for (const line of keyVals) {
    let [key, value] = line;
    if (key === 'mask') {
      mask = value;
    } else {
      const address = key.slice(4, key.length - 1);
      value = BigInt(parseInt(value));
      const changeToCeros = BigInt(parseInt(mask.replace(/1/gi, '0').replace(/X/gi, '1'), 2));
      const changeToOnes = BigInt(parseInt(mask.replace(/X/gi, '0'), 2));
      memory[address] = value & changeToCeros | changeToOnes;
    }
  }
  return sumValsMemory(memory);
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const input = transformInput(result);
    // Part 1
    const sum = getSumAllValues(input);
    console.log({ sum });
    // Part 2

  })
  .catch((error) => {
    console.log(error);
  });