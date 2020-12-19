/*
* Main goal: Get 50 statusbar
* Passport Processing
* Today goal: Count valid passwords by improving the validator system
* How:
** read the input
** transform input into array of objects
** create a function to transform input(array of objects) into the total valid passports
** create a function to validate a passport!
*/

const isValidPassport = (passport) => {
  // check fields
  const fields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    'cid'
  ];
  if (fields[0] in passport &&
    fields[1] in passport &&
    fields[2] in passport &&
    fields[3] in passport &&
    fields[4] in passport &&
    fields[5] in passport &&
    fields[6] in passport)
    return true;
  return false;
}

const countValidPassports = (passportList, isValid) => {
  let totalValid = 0;
  for (passportObj of passportList) {
    if (isValid(passportObj))
      totalValid++;
  }
  return totalValid;
}

const transformInput = (inputText) => {
  const passportTextList = inputText.split('\r\n\r\n');
  const passportObjList = [];
  for (passportText of passportTextList) {
    const linesPassport = passportText.split('\r\n');
    const passport = {}
    for (line of linesPassport) {
      const propertiesStr = line.split(' ');
      propertiesStr.forEach((propertyStr) => {
        const [key, value] = propertyStr.split(':');
        passport[key] = value;
      })
    }
    passportObjList.push(passport);
  }
  return passportObjList;
}

// TODO create validation functions for each field!!!
// Use this function to validate: birth, issue and expiration
const validateYear = (yearField, min, max) => {
  if (yearField.length !== 4 || isNaN(yearField))
    return false;
  const year = parseInt(yearField);
  if (year >= min && year <= max)
    return true;
  return false;
}

const validateHeight = (heightField) => {
  if (heightField.length < 2)
    return false;
  const endStr = heightField.slice(-2);
  const height = heightField.slice(0, -2);
  const heightNumber = parseInt(height);

  if (endStr === 'cm' && heightNumber >= 150 && heightNumber <= 193)
    return true;
  if (endStr === 'in' && heightNumber >= 59 && heightNumber <= 76)
    return true;

  return false;
}

const validateHairColor = (hairColorField) => {
  const regexp = /#[0-9a-f]+$/;
  if (hairColorField.length === 7 && regexp.test(hairColorField))
    return true;
  return false;
}

const validateEyeColor = (eyeColor) => {
  const validValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  if (validValues.includes(eyeColor))
    return true;
  return false;
}

const validatePassportID = (passportID) => {
  if (passportID.length !== 9 || isNaN(passportID))
    return false;
  return true;
}

const isValidPassport2 = (passport) => {
  // check fields
  const fields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
    'cid'
  ];
  if (!(fields[0] in passport && validateYear(passport[fields[0]], 1920, 2002)))
    return false;
  if (!(fields[1] in passport && validateYear(passport[fields[1]], 2010, 2020)))
    return false;
  if (!(fields[2] in passport && validateYear(passport[fields[2]], 2020, 2030)))
    return false;
  if (!(fields[3] in passport && validateHeight(passport[fields[3]])))
    return false;
  if (!(fields[4] in passport && validateHairColor(passport[fields[4]])))
    return false;
  if (!(fields[5] in passport && validateEyeColor(passport[fields[5]])))
    return false;
  if (!(fields[6] in passport && validatePassportID(passport[fields[6]])))
    return false;
  return true;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const passportArray = transformInput(result);
    // Part 1
    const total = countValidPassports(passportArray, isValidPassport);
    console.log(total);
    // Part 2
    const total2 = countValidPassports(passportArray, isValidPassport2);
    console.log(total2);
  })
  .catch((error) => {
    console.log(error);
  });