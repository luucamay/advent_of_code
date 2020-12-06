/*
* Main goal: Get 50 statusbar
* Today goal: Count valid passwords
* How:
** Create a dictionary from passwords
** Get values from policy (min, max, char)
** Check if value of char is in range min-max
*/

const createDictionary = (password) => {
  const dictionary = {};
  for (const char of password) {
    // check if value exists
    if (dictionary[char]) {
      dictionary[char] += 1;
    } else {
      dictionary[char] = 1;
    }
  }
  return dictionary;
}

const getValuesFromPolicy = (policyStr) => {
  const arraySubstrs = policyStr.split(' ');
  const minmaxStr = arraySubstrs[0];
  const char = arraySubstrs[1];
  const arrayMinMax = minmaxStr.split('-');
  const min = arrayMinMax[0];
  const max = arrayMinMax[1];
  return { min, max, char }
}

const isValidPassword = (password, policy) => {
  const policyObj = getValuesFromPolicy(policy);
  // Instead of createDictionary check number of times char appears
  const newDictionary = createDictionary(password);
  const valueChar = newDictionary[policyObj.char];
  if(valueChar >= policyObj.min && valueChar <= policyObj.max){
    return true;
  }
  return false;
}

const countValidPasswords = (passwords) => {
  let totalValidPass = 0;
  for (const line of passwords){
    const [policy, password] = line.split(': ');
    if(isValidPassword(password, policy)){
      totalValidPass += 1;
    }
  }
  return totalValidPass;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const arrayStrings = result.split('\r\n');
    // PART 1
    console.log(countValidPasswords(arrayStrings));
    //console.log(partTwo(arrayNumbers));
  })
  .catch((error) => {
    console.log(error);
  });
