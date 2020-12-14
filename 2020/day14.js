/*
* Main goal: Get 50 stars
* Today goal: Decode the docked data
* How part 1: Get the sum of all values written in memory
** get the masks and the writes to memory
** create the list of pairs with bit and bitIndex for mask
** replace 1's and 0's from the mask with clearBit and setBit
** start at the end of the list to only write if there is nothing written in memory
** sum all the numbers writenn in memory
* Consider:
** the memory is always a 36 bits size (2^35)
** set and unset the bits
** get list of pairs (0, bitIndex) or (1, bitIndex)
* Resource about bits => https://realpython.com/python-bitwise-operators/#bitmasks
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

const getSumAllValues = (keyVals) => {
  const memory = {};
  let mask;
  for (const line of keyVals) {
    let [key, value] = line;
    if (key === 'mask') {
      mask = value;
      console.log({ mask });
    } else {
      const address = key.slice(4, key.length - 1);
      value = BigInt(parseInt(value));
      const changeToCeros = BigInt(parseInt(mask.replace(/1/gi, '0').replace(/X/gi, '1'), 2));
      const changeToOnes = BigInt(parseInt(mask.replace(/X/gi, '0'), 2));
      // console.log({ value, changeToCeros, changeToOnes });
      memory[address] = value & changeToCeros | changeToOnes;
      console.log('new value: ',memory[address]);
    }
  }
  //console.log(memory);
  return sumValsMemory(memory);
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const input = transformInput(result);
    getSumAllValues(input);
    // Part 1
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });