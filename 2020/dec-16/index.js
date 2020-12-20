/*
* Main goal: Get 50 stars
* Title: Ticket Translation
* Today goal: You need to understand your ticket
* How part 1: Get scanning error rate (sum of all invalid values)
** Process the input:
*** Get list of rules, each rule has ranges, each range has a min and a max value (it is a list of lists of duples)
*** String of numbers of your ticket -> Array of numbers
*** List of list of numbers on other tickets
** Find invalid values
*** if a number is valid through all the rules skip
*** else add the number to a list of invalid numbers
*/

const isValid = (number, ranges) => {
  for (const line of ranges) {
    for (const range of line) {
      const [min, max] = range;
      if (number >= min && number <= max)
        return true;
    }
  }
  return false;
}

const findInvalidValues = (ticketsVals, ranges) => {
  const invalidValues = [];
  for (const valuesTicket of ticketsVals) {
    for (const val of valuesTicket) {
      if (!isValid(val, ranges))
        invalidValues.push(val);
    }
  }
  return invalidValues;
}

const getSumInvalid = (input) => {
  const [rules, , values] = input;
  // get ranges
  const ranges = rules.map(rule => rule.ranges);
  const invalidVals = findInvalidValues(values, ranges);
  const reducer = (accumulator, currentVal) => accumulator + currentVal;
  const sum = invalidVals.reduce(reducer);
  console.log({ sum });
  return sum;
}

const processInput = (input) => {
  let [rules, yourTicketNums, nearbyTicketNums] = input.split('\r\n\r\n');
  // process rules
  rules = rules.split('\r\n');
  const ruleList = [];
  for (const rule of rules) {
    let [field, ranges] = rule.split(': ');
    // process ranges
    ranges = ranges.split(' or ');
    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i].split('-').map(num => parseInt(num));
      ranges[i] = range;
    }
    ruleList.push({ field, ranges });
  }
  // get your ticket nums
  yourTicketNums = yourTicketNums.split('\r\n')[1].split(',');
  yourTicketNums = yourTicketNums.map(num => parseInt(num));
  // get values of other tickets
  nearbyTicketNums = nearbyTicketNums.split('\r\n');
  nearbyTicketNums.shift();
  let valuesOtherTickets = [];
  for (const ticketVals of nearbyTicketNums) {
    let values = ticketVals.split(',');
    values = values.map(val => parseInt(val));
    valuesOtherTickets.push(values);
  }
  return [ruleList, yourTicketNums, valuesOtherTickets];
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const input = processInput(result);
    getSumInvalid(input);
  })
  .catch((error) => {
    console.log(error);
  });