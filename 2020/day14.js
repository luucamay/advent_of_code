/*
* Main goal: Get 50 stars
* Today goal: Decode the docked data
* How part 1: Get the sum of all values written in memory
** get the masks and the writes to memory
** convert each value to be saved to binary
** replace 1's and 0's from the mask
** convert the binary number to decimal againd
** start at the end of the list to only write if there is nothing written in memory
** sum all the numbers writenn in memory
* Consider:
** the memory is always a 36 bits size (2^35)
** set and unset the bits
** get list of pairs (0, bitIndex) or (1, bitIndex)

*/

const clearBit = (value, bitIndex) => value & ~(1 << bitIndex);
const setBit = (value, bitIndex) => value | (1 << bitIndex)
