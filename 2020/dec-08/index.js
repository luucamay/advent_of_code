/*
* Main goal: Get 50 statusbar
* Title: Handheld Halting
* Today goal: Repair game console of kid
* How part 1: Find value of accumulator befor the program repeats an instruction
** create array of instructions
** create array of execute
** for each instruction in array of instruction get: keyword, value(sign, number)
*/

// const buildArrayInstructions = (string) => string.split('\r\n');
const buildArrayInstructions = (string) => {
  const instructions = string.split('\r\n');
  let instructionsObj = [];
  for (const instruction of instructions) {
    const [keyword, value] = instruction.split(' ');
    const sign = value[0];
    let number = parseInt(value.slice(1));
    instructionsObj.push({ keyword, sign, number });
  }
  return instructionsObj;
}

const findValueAccumulator = (instructionArr, part1 = false) => {
  let accumulator = 0;
  const size = instructionArr.length;
  const executed = new Array(size);
  let i = 0;
  while (true) {
    if (i >= size) return accumulator;
    if (executed[i] && part1) return accumulator;
    else if (executed[i] && !part1) return false;
    executed[i] = 1;
    const { keyword, sign, number } = instructionArr[i];
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

const flip = (val) => val === 'nop' ? 'jmp' : 'nop';

const findFinalValAcc = (instructions) => {
  let accumulator;
  const size = instructions.length;
  for (let i = 0; i < size; i++) {
    const key = instructions[i].keyword;
    if (key === 'nop' || key === 'jmp') {
      instructions[i].keyword = flip(key);
      accumulator = findValueAccumulator(instructions);

      if (accumulator)
        return accumulator;
      instructions[i].keyword = key;
    }
  }
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const instructions = buildArrayInstructions(result);
    // Part 1
    const accValue = findValueAccumulator(instructions, true);
    console.log({ accValue });
    // Part 2
    const accRealValue = findFinalValAcc(instructions);
    console.log({ accRealValue });
  })
  .catch((error) => {
    console.log(error);
  });