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

const inRange = (val, range) => {
  const [min, max] = range;
  if (val >= min && val <= max)
    return true;
  return false;
}
const getPosibleFieldsForValue = (val, rulesSize, rules, listValidFields) => {
  if (!listValidFields) listValidFields = new Array(rulesSize).fill(1);
  // console.log({ listValidFields, val });
  for (let i = 0; i < rulesSize; i++) {
    if (listValidFields[i] === 0) continue;
    const { field, ranges } = rules[i];
    // console.log({ field, ranges });
    const [range1, range2] = ranges;
    if (!(inRange(val, range1) || inRange(val, range2)))
      listValidFields[i] = 0;
  }
  //console.log({ listValidFields });
  return listValidFields;
}

const orderFields = (ticketsVals, rules) => {
  const totalTickets = ticketsVals.length;
  const totalFields = rules.length;
  let posibleFields = new Array(totalFields);
  for (let row = 0; row < totalFields; row++) {
    posibleFields[row] = new Array(totalFields).fill(1);
  }
  const ignoreField = new Set();
  for (let i = 0; i < totalTickets; i++) {
    const currTicketVals = ticketsVals[i];
    const newPosibleFields = new Array(totalFields).fill(1);
    let validTicket = true;
    // if all values in current ticket are valid use it, otherwise discard them
    for (let j = 0; j < totalFields; j++) {
      const value = currTicketVals[j];
      const currValidFields = [...posibleFields[j]];
      //if (ignoreField.has(j)) continue;
      const newValidFields = getPosibleFieldsForValue(value, totalFields, rules, currValidFields);
      // console.log({ newValidFields });
      // count 1's on list and get final position
      let count = 0;
      let lastSeen = -1;
      for (let k = 0; k < totalFields; k++) {
        if (newValidFields[k] === 1) {
          count += 1;
          lastSeen = k;
        }
      }
      // if field is not valid for none of them skip all the ticket
      if (count === 0) {
        validTicket = false;
        break;
      } else {
        newPosibleFields[j] = newValidFields;
      }
      // console.log({ value, newValidFields });

      // if only 1 remove this posibility from other fields
      // and add to ignore this field?
      if (count === 1) {
        console.log('remove from others');
        // console.log({ lastSeen });
        //ignoreField.add(j);
        for (let z = 0; z < totalFields; z++) {
          //if (ignoreField.has(z)) continue;
          if (z !== j){
            console.log('cero', z);
            newPosibleFields[z][lastSeen] = 0;
          }
        }
      }
    }
    if (validTicket) {
      posibleFields = [...newPosibleFields];
      console.log({ newPosibleFields, posibleFields });
      console.log('----------');
    }
  }
  // console.log({ posibleFields });
  /* const sortedFields = mapFieldListToName(posibleFields, rules);
  console.log({ sortedFields });
  return sortedFields; */
}

const mapFieldListToName = (posibleFields, rules) => {
  // console.log({ rules, posibleFields });
  const orderOfFields = [];
  for (const list of posibleFields) {
    const postion = list.indexOf(1);
    const nameField = rules[postion].field;
    orderOfFields.push(nameField);
  }
  return orderOfFields;
}

const multiplyFields = (sortedFields, yourValues, fieldFilter) => {
  let mul = 1;
  for (let i = 0; i < sortedFields.length; i++) {
    const field = sortedFields[i];
    if (field.startsWith(fieldFilter)) {
      mul *= yourValues[i];
    }
  }
  console.log({ mul });
  return mul;
}
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
    // getSumInvalid(input);
    // Part 2
    //getPosibleFieldsForValue(3, 3, rules);
    const sortedFields = orderFields(values, rules);
    //multiplyFields(sortedFields, yourVals, 'departure');
  })
  .catch((error) => {
    console.log(error);
  });