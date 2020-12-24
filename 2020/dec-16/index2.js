/*
* PART 2 of day 16
* Main goal: Get 50 stars
* Title: Ticket Translation
* Today goal: You need to understand your ticket
* how to part 2:
** Python code that helped me:
*** https://topaz.github.io/paste/#XQAAAQAECQAAAAAAAAAzHIoib6pXbueH4X9F244lVRDcOZab5q1+VXY/ex42qR7D+RLbGF1Jf3B3zEE2bAIjuia+A3JWN4OQvg43kqGjX8x7RfKI+GepPW0xZdrtuYx3XwHEHm7ovcPklWKhHbCd6I1/m2hsalDx5w4VIRuCuha6nphx/9gNvm+P89jEKPqMVgvJgHzW9rEjk7J5Y7e8ZXXWRGEX0bXJAsFM5BefcVZiEBwsCo9YX0XaeOk8dALcymacfe2AfzvXBa5ncs1wOemdh7I8rgG6/N0eveDZpFc9/tSAIvjZamUmyi3Uns/QwMIrMql0/KwX5hn997e2NKkjwiNg3ECiggpIgAMKglCd5GsBwcyxbbSCxNIMbmaRddJf/t5YMfmdhN1u26/2OsZmQ/WRQB3x5O+S0PBAeyolPn5DOBYyAvsrPc7WneqBuyQLRDTJbD0AjNoZSjZG7IOpvjLDm+LOv13EVx3YpbrA4Jdvaw9U/oiKx/iOFHTrULN5BXnc1Qoj2O9vIjYL7F9uTxs5rvz7J5vB8XcuHcJJ+NEnrFDuxDn5kKMiKrln7E1JtzdS6YLRQfZI/Vo1cvG7EV1ALPUTyrWEX7jVe3iQaGloOZt4bpJDjMkmpgBvXC4pXvhMA+lKOmotXA8HkcCye6T3qg81tYeNiWmGQ6RmnYooqlJE1VMJGVXWulochN4tbIeGn957TP5nCnhOWZjSCXOjABP50A9RFmRCk3834pcSTqpHmGYXzCzEpAvkZOOEjW7X0Y8wDEstVCgWQOTnmCk+/bANqSsywGO7tC8+nVTmMwNUYCQEnrzw89ij+NGxFiDwpW9Pg1fjXIdFpRH5pJ/tQOviDeWySaA7d/h2FrGpPc0ZcfWRzHKxBXUKQWgtTjKwYcdk9aFAOnnR7lIxNtVbv2ymMeaCMIrWWxerK72700Qh19+2/j8AeELBr7KDpqJifRu3yKAYpuJra+0uBjmgXVSGQr64wg23Xn5GlJeSsroshAzzV5TSnqGxJkJ0vVfCEsx0x7pBpJDKKWUNpR/pgWJvzXlmWuZJtRuDJhucy5E+Of9sLWpq7BE1kj2HDriPpiR7Bg+fCeH4WmUtY3th36cMJkdN9h6TZXSu/534gwp8cuwsODvsbx1eftwU1nzgzuwqnetnpSspckjWvpIJ08aQEtRtR327jT67J18b9sR4FdSglnIy6Zx5N140oZbAPnRp1PEu4IxaGgWsRhLFUKF4qPOdizbnxF8P1Aek2Yh8DB2pG77L/7+iFzA=
*** https://topaz.github.io/paste/#XQAAAQAVBQAAAAAAAAAFG0sTyiplbRoS09NAJBCyXkVnl3UpJBk8NBBtH3N2UmJsxU/ErC9MDY8l8oSxWa386lclmy2Q185CzqcgmImTU6Tu7wy7b8xQ5JAoJIO8zNNKF3O1e0YA1T6cLDoEYTUylkeG+FpFeeDRSNWr3WWlKteYCxCB5I8yS8E4bV2XQ4bd08gfcU6ho/BBCh/16DwKqu7tefDjn43RxoX3IKnWiSAK+s0qM2XfGHwXhDs12mS2+2rZAtMpl8VIjppe7j5KiO+25M0NUnVaYxHrxU8LUYzGR6W5BLMUHh8Wv1dqoGlQLz72QxUE7Q4fSFtu3hykzXGNxBy6so27mNVHhLIZpHXL4oos+O8en11WiM1a/0VYlw85cUECMpTYeqlu7YGVeaoeJVeT2anEaNAcrUq1Jyj9La1GFXrqaEFjf8S6qqtV6x0JZ3f7y4pCkdzpgp+iIiqVdJbJDMqLBAqLrbJ49jV6m0Hs3LZin4YEviaK101+AGH7EZoijEXUCPndaBie2M663UMkkoB7+ByM7vv6GINzOsI5FJHCDTPsCiAfE4lzjqDArJY40KiK3W6fYAYb7FZSdH4mec15oHvtzMa1SJvyqgJPaQFWhu5fTD1zEcDz537XSAap82nD7s9oP7h7kk/gIKckQ3tNjzC1RreznvyM/2PfInaulmCjiyOoLhW20Z2/O0FWbI/m0AKtvXinzAYsG4RjY1jUKlImdxuiAIUAgVBTIuScd7cumGcB9opyKtNeKTFlSIPZ6X0vPySVuPQirf9IDf8A
*/

const processInput = (input) => {
  const [section1, section2, section3] = input.split('\r\n\r\n');
  // rules
  let rules = section1.split('\r\n');
  for (const [index, rule] of rules.entries()) {
    let [field, ranges] = rule.split(': ');
    ranges = ranges.split(/ or |-/g);
    ranges = ranges.map(val => parseInt(val));
    rules[index] = { field, ranges };
  }
  // my ticket
  let myTicket = section2.split('\r\n')[1];
  myTicket = myTicket.split(',').map(num => parseInt(num));
  // nearby tickets
  let tickets = section3.split('\r\n')
  tickets.shift();
  const nearbyTickets = [];
  for (const ticket of tickets) {
    let ticketVals = ticket.split(',');
    ticketVals = ticketVals.map(val => parseInt(val));
    nearbyTickets.push(ticketVals);
  }
  // console.log(rules, myTicket, nearbyTickets);
  return [rules, myTicket, nearbyTickets];
}

const part2 = (input) => {
  // remove invalid tickets
  let [rules, myTicket, nearbyTickets] = input;
  const totalFields = rules.length;
  const validTickets = nearbyTickets.filter(ticket => isValidTicket(ticket, rules));
  // pick a column posible for only one field
  let product = 1;
  const columns = new Set(Array(totalFields).keys());
  // columns: Set { 0, 1, 2 }
  // create matriz full of 1's
  const posibleFields = new Array(totalFields);
  for (let p = 0; p < totalFields; p++) {
    posibleFields[p] = new Array(totalFields).fill(1);
  }

  // aqui comienza la magia negra
  // Get the PRODUCT
  for (let x = 0; x < totalFields; x++) {
    for (const [rulePos, rule] of rules.entries()) {
      const { field, ranges } = rule;
      const candidatesCurrRule = [];
      // en espcecial esta parte
      for (const col of columns) {
        let validCol = true;
        for (const ticket of validTickets) {
          if (!isValidNum(ticket[col], ranges)) {
            validCol = false;
          }
        }
        if (validCol) {
          candidatesCurrRule.push(col);
          console.log({ col, field });
        }
      }
      if (candidatesCurrRule.length === 1) {
        const candidateCol = candidatesCurrRule[0];
        // remove column from columns
        columns.delete(candidateCol);
        // remove currentRule from rule List
        rules = [...rules.slice(0, rulePos), ...rules.slice(rulePos + 1)];
        if (field.startsWith('departure')) {
          product *= myTicket[candidateCol];
        }
        // stop because now the columns available are reduced
        break;
      }
    }
  }
  console.log({ product });
}

const isValidTicket = (ticket, rules) => {
  // check each value in ticket to match at least one rule
  for (const val of ticket) {
    let valid = false;
    for (const rule of rules) {
      if (isValidNum(val, rule.ranges))
        valid = true;
    }
    if (!valid) return false;
  }
  return true;
}

const isValidNum = (val, ranges) => {
  const [min1, max1, min2, max2] = ranges;
  if ((val >= min1 && val <= max1) || (val >= min2 && val <= max2))
    return true;
  return false;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const input = processInput(result);
    part2(input);
  })
  .catch((error) => {
    console.log(error);
  });

