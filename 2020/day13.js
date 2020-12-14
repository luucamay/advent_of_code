/*
* Main goal: Get 50 stars
* Today goal: Find the earliest bus you can take
* How part 1:
** split input by line and by ' ,'
** get Closest Divisible Integer that is greater of your time (https://stackoverflow.com/questions/29453717/closest-divisible-integer)
** find the min number of those numbers
*/

const closestDivisibleInteger = (a, b) => (a + b) - (a % b);

const findEarliestBus = (timestamp, idBuses) => {
  const arriveCloseTimes = idBuses.map((busId) => {
    const time = closestDivisibleInteger(timestamp, busId);
    return { busId, time };
  });
  const reducer = (min, item) => item.time < min ? item.time : min;
  const closestTime = arriveCloseTimes.reduce(reducer, arriveCloseTimes[0].time);
  const bus = arriveCloseTimes.find(ele => ele.time === closestTime);
  // calculate final result
  const result = (bus.time - timestamp) * bus.busId;
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

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const [timestamp, buses] = transformInput(result);
    // Part 1
    const answer = findEarliestBus(timestamp, buses);
    console.log({ answer });
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });