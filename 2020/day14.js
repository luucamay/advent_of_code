/*
* Main goal: Get 50 stars
* Today goal: Decode the docked data
* How part 1: Get the sum of all values written in memory
** get the masks and the writes to memory
** convert each value to be saved to binary
** create the list of pairs with bit and bitIndex for mask
** replace 1's and 0's from the mask with clearBit and setBit
** start at the end of the list to only write if there is nothing written in memory
** sum all the numbers writenn in memory
* Consider:
** the memory is always a 36 bits size (2^35)
** set and unset the bits
** get list of pairs (0, bitIndex) or (1, bitIndex)

*/

const clearBit = (value, bitIndex) => value & ~(1 << bitIndex);
const setBit = (value, bitIndex) => value | (1 << bitIndex)

const createPairsMask = (mask) => {
  const pairs = [];
  let index = 0;
  for (let j = mask.length - 1; j >= 0; j--) {
    const char = mask[j];
    if (char !== 'X')
      pairs.push([parseInt(char), index])
    index++;
  }
  console.log(pairs);
  return pairs;
}

createPairsMask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X');