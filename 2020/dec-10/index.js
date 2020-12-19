/*
* Main goal: Get 50 stars
* Title: Adapter Array
* Today goal: Charge the battery of your device
* How part 1: Find the number of 1 jolt difference and the number of 3 jolts difference multiplied
** split input by line and convert to number
** sort array adapters
** start counter of 1's and 3's differences
** traverse the array and find differences
** multiply counters
* How part 2: How many different ways you can arrange your adapters?
** Traverse the list of adapters from right to left
** Find the most right to remove (diff of prev and next < 3)
** Save in a stack of waysToArrange?
** Find next most right to remove, add all the many ways already in the stack of waysToArrange
** still do not know how to find the total count (sum of subtotals)
* Part 2 was hard so here I will leave some links that helped me to understand better!
*** Additional short test cases: https://www.reddit.com/r/adventofcode/comments/kapbjb/year_2020_day_10_part_2_additional_examples_for/
*** A meme: https://www.reddit.com/r/adventofcode/comments/kamfm0/2020_day_10_always_overshadowed_by_his_little/
*** An easy python solution: https://www.reddit.com/r/adventofcode/comments/ka8z8x/2020_day_10_solutions/gfdfthy?utm_source=share&utm_medium=web2x&context=3

*/
const transformInput = (input) => input.split('\r\n').map((num) => parseInt(num));

const numberJoltDifferences = (rateAdapterList) => {
  rateAdapterList.sort((a, b) => a - b);
  // now rateAdapterList is sorted
  const diffs = [0, 0, 1];
  let prev = 0;
  for (const rate of rateAdapterList) {
    const diff = rate - prev;
    switch (diff) {
      case 1:
        diffs[0] += 1;
        break;
      case 3:
        diffs[2] += 1;
    }
    prev = rate;
  }
  return diffs[0] * diffs[2];
}

const numberWaysToArrange = (adpaters) => {
  //adpaters.push(0);
  adpaters.sort((a, b) => a - b);
  const size = adpaters.length;
  const last = adpaters[size - 1];
  const dp = new Array(last + 1).fill(0);
  dp[0] = 1;
  for (const r of adpaters) {
    //console.log(dp);
    if (r >= 3)
      dp[r] = dp[r - 1] + dp[r - 2] + dp[r - 3];
    if (r === 2)
      dp[r] = dp[r - 1] + dp[r - 2];
    if (r === 1)
      dp[r] = dp[r - 1];
    if (r === last)
      return dp[r];
  }
  return 0;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const numberList = transformInput(result);
    // Part 1
    const multipliedDiffs = numberJoltDifferences(numberList);
    console.log({ multipliedDiffs });
    // Part 2
    const waysArranged = numberWaysToArrange(numberList);
    console.log({ waysArranged });
  })
  .catch((error) => {
    console.log(error);
  });