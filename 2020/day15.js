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
*/

const get2020NumSpoken = (numbers) => {
  let index = 0;
  const size = numbers.length;
  const dictionary = {};
  while (index < size - 1) {
    const key = numbers[index];
    dictionary[key] = index;
    index += 1;
  }
  while (index < 2020) {
    const lastNumber = numbers[index];
    if (!dictionary.hasOwnProperty(lastNumber)) {
      numbers.push(0);
    } else {
      const timesApart = index - dictionary[lastNumber];
      numbers.push(timesApart)
    }
    dictionary[lastNumber] = index;
    index += 1;
  }
  console.log('Final Number:', numbers[index - 1]);
}

let input = '1,2,16,19,18,0';
input = input.split(',').map((num) => parseInt(num));
get2020NumSpoken(input);