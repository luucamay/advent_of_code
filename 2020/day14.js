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

const clearBit = (value, bitIndex) => value & ~(1 << bitIndex);
const setBit = (value, bitIndex) => value | (1 << bitIndex);

const createPairsMask = (mask) => {
  const pairs = [];
  let index = 0;
  for (let j = mask.length - 1; j >= 0; j--) {
    const char = mask[j];
    if (char !== 'X')
      pairs.push([parseInt(char), index])
    index++;
  }
  console.log({ pairs });
  return pairs;
}

const maskedVal = (val, bitList) => {
  for (const item of bitList) {
    const [bit, bitIndex] = item;
    if (bit === 0)
      val = clearBit(val, bitIndex);
    else
      val = setBit(val, bitIndex);
  }
  return val;
}

const transformInput = (input) => {
  const lines = input.split('\r\n');
  const keyValues = lines.map((line) => line.split(' = '));
  return keyValues;
}

const sumValsMemory = (memory) => {
  let sum = 0;
  for (const val in memory) {
    sum += memory[val];
  }
  console.log({ sum });
  return sum
}

const getSumAllValues = (keyVals) => {
  const size = keyVals.length;
  const memory = {};
  let i = 0;
  while (i < size) {
    const [mask, maskValue] = keyVals[i];
    const bitList = createPairsMask(maskValue);
    if (mask === 'mask') {
      let j = i + 1;
      let key = keyVals[j][0];
      while (j < keyVals.length && key !== 'mask') {
        const currVal = keyVals[j][1];
        key = keyVals[j][0];
        let mem = key.replace(/mem/gi, '');
        mem = mem.slice(1, mem.length - 1);

        const newVal = maskedVal(currVal, bitList);
        memory[mem] = newVal;

        j++;
      }
      i = j;
    }
    i++;
  }
  console.log(memory);
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