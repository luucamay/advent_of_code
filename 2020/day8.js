/*
* Main goal: Get 50 statusbar
* Today goal: Repair game console of kid
* How part 1: Find value of accumulator befor the program repeats an instruction
** create array of instructions
** create array of execute
** for each instruction in array of instruction get: keyword, value(sign, number)
*/

const buildArrayInstructions = (string) => string.split('\r\n');

const findValueAccumulator = (instructionArr) => {
  let accumulator = 0;
  const size = instructionArr.length;
  const executed = new Array(size);
  let i = 0;
  while (true) {
    if (executed[i])
      return accumulator;
    executed[i] = 1;
    const [keyword, value] = instructionArr[i].split(' ');
    const sign = value[0];
    let number = parseInt(value.slice(1));

    switch (keyword) {
      case 'nop':
        i = i + 1;
        break;
      case 'acc':
        i = i + 1;
        if (sign === '+') accumulator = accumulator + number;
        else accumulator = accumulator - number;
        break;
      case 'jmp':
        if (sign === '+') i = i + number;
        else i = i - number;
        break;
    }

  }
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const instructions = buildArrayInstructions(result);
    // Part 1
    const accValue = findValueAccumulator(instructions);
    console.log({ accValue });
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });