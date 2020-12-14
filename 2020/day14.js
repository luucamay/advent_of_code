/*
* Main goal: Get 50 stars
* Today goal: Decode the docked data
* How part 1: Get the sum of all values written in memory
** get the masks and the writes to memory
** sum all the numbers writenn in memory
* Consider:
** the memory is always a 36 bits size (2^35) Use BigInt please!!!
* Resource about bits => https://realpython.com/python-bitwise-operators/#bitmasks
* Big Hint and easy to read python solution: https://www.reddit.com/r/adventofcode/comments/kcr1ct/2020_day_14_solutions/gfshjtl?utm_source=share&utm_medium=web2x&context=3
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
  console.log({ sum });
  return sum;
}

const writeMemory = (memory, mask, address, value) => {
  if (mask.includes('X')) {
    let i = mask.indexOf('X');
    writeMemory(memory, mask.slice(0, i) + '0' + mask.slice(i + 1), address, value);
    writeMemory(memory, mask.slice(0, i) + '1' + mask.slice(i + 1), address, value);
  } else {
    const newAddress = BigInt(parseInt(mask, 2)) | address;
    memory[newAddress] = value;
  }
}

const getSumAllValues = (keyVals) => {
  const memory = {};
  const memory2 = {}
  let mask;
  for (const line of keyVals) {
    let [key, value] = line;
    if (key === 'mask') {
      mask = value;
    } else {
      let address = BigInt(key.slice(4, key.length - 1));
      value = BigInt(value);
      const changeToCeros = BigInt(parseInt(mask.replace(/1/gi, '0').replace(/X/gi, '1'), 2));
      const changeToOnes = BigInt(parseInt(mask.replace(/X/gi, '0'), 2));
      memory[address] = value & changeToCeros | changeToOnes;
      //  part 2
      address = address & BigInt(parseInt(mask.replace(/0/gi, '1').replace(/X/gi, '0'), 2));
      writeMemory(memory2, mask, address, value);
    }
  }
  sumValsMemory(memory);
  sumValsMemory(memory2);
}

const { memory } = require('console');
const fs = require('fs');
const { parse } = require('path');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const input = transformInput(result);
    getSumAllValues(input);
  })
  .catch((error) => {
    console.log(error);
  });