/*
* Main goal: Get 50 stars
* Today goal: Find the earliest bus you can take
* How part 1:
** split input by line and by ' ,'
** get Closest Divisible Integer that is greater of your time (https://stackoverflow.com/questions/29453717/closest-divisible-integer)
** find the min number of those numbers
* How part 2:
** hint 1: Chinese Remainder Theorem
** hint 2: Python implementation some explanation (https://www.reddit.com/r/adventofcode/comments/kc4njx/2020_day_13_solutions/gfr2uh6?utm_source=share&utm_medium=web2x&context=3)
*/

const closestDivisibleInteger = (a, b) => (a + b) - (a % b);

const findEarliestBus = (timestamp, idBuses) => {
  const arriveCloseTimes = idBuses.map((id) => {
    const time = closestDivisibleInteger(timestamp, id);
    return { id, time };
  });
  const reducer = (min, item) => item.time < min ? item.time : min;
  const closestTime = arriveCloseTimes.reduce(reducer, arriveCloseTimes[0].time);
  const bus = arriveCloseTimes.find(ele => ele.time === closestTime);
  // calculate final result
  const result = (bus.time - timestamp) * bus.id;
  return result;
}

const transformInput = (input) => {
  let [yourtime, buses] = input.split('\r\n')
  yourtime = parseInt(yourtime);
  buses = buses.replace(/,x/gi, '');
  buses = buses.split(',');
  buses = buses.map((busId) => parseInt(busId));
  return [yourtime, buses];
}

const getPairList = (input) => {
  const [, list] = input.split('\r\n');
  const buses = list.split(',');
  const pairs = [];
  for (let i = 0; i < buses.length; i++) {
    if (buses[i] !== 'x') {
      const pair = [parseInt(buses[i]), i];
      pairs.push(pair);
    }
  }
  const sortedBuses = pairs.sort(function (a, b) {
    return b[0] - a[0];
  });
  return sortedBuses;
}

const getTimestamp = (buses) => {
  let t = 0;
  let step = 1;
  for (const input of buses) {
    let bus = input[0];
    let offset = input[1];
    while ((t + offset) % bus !== 0)
      t += step;
    step *= bus;
  }
  return t;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const [timestamp, buses] = transformInput(result);
    // Part 1
    const answer = findEarliestBus(timestamp, buses);
    console.log({ answer });
    // Part 2
    const busPairs = getPairList(result);
    const answer2 = getTimestamp(busPairs);
    console.log({ answer2 });
  })
  .catch((error) => {
    console.log(error);
  });