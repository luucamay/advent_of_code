/*
* Main goal: Get 50 stars
* Today goal: Find the 2020th number said
* How part 1:
** Loop for the input first (use a global index)
** Loop from current index until 2020
** Then consider the Last Number spoken
** if it is the first time (key not in object), save current postion
** else calculate difference position last number and value in object
** change position number said in the object
** really good advice (maps instead of objects): https://www.reddit.com/r/adventofcode/comments/kekmfh/2020_day_15_javascript_what_a_difference_the/?utm_source=share&utm_medium=web2x&context=3
*/

const get2020NumSpoken = (numbers) => {
  let index = 0;
  const size = numbers.length;
  const dictionary = new Map();
  while (index < size - 1) {
    const key = numbers[index];
    dictionary.set(key, index);
    index += 1;
  }
  let t0 = new Date();
  while (index < 30000000) {

    let t1 = new Date();
    if (t1 - t0 >= 10000) {
      console.log({ t1 });
      t0 = t1;
    }
    const lastNumber = numbers[index];
    if (!dictionary.has(lastNumber)) {
      numbers.push(0);
    } else {
      const timesApart = index - dictionary.get(lastNumber);
      numbers.push(timesApart)
    }
    dictionary.set(lastNumber, index);
    index += 1;
  }
  console.log('Final Number:', numbers[index - 1]);
}

let input = '1,2,16,19,18,0';
input = input.split(',').map((num) => parseInt(num));
get2020NumSpoken(input);