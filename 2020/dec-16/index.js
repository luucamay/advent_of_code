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
* How part 2: Get multiplication of your ticket fields that start with departure
** Determine the order of the fields
*** Inititalize an array of objects
**** each object has an array of all the fields start in 0 and a counter of posible fields.
**** 0 means a not possible field
**** 1 means a possible field
*** Traverse the list of the tickets
*** for each value on each ticket
**** if posible field check 1 at field position and increase counter
*** check if counter at end of each field is only 1
**** then set 0 to other objects list in that position (how to get that position -> indexof(1) )
*** if all counters are at 1 stop???
*** now you have a list of lists where each position of field, and the position of 1 on the list inside is the field
*** map the 1 in the list to a fild name
*** do not forget to remove invalid fields
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
    const [rules, yourVals, values] = input;
    // Part 1
    getSumInvalid(input);
  })
  .catch((error) => {
    console.log(error);
  });