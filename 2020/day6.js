/*
* Main goal: Get 50 statusbar
* Today goal: Find the highest set ID on a boarding pass
* How part 1:
**
*/

const transformInput = (string) => string.split('\r\n\r\n');

const countQuestionsAnswered = (groupAnswers) => {
  const answeredQuestions = new Set()
  for (const char of groupAnswers) {
    if (char !== '\r' && char !== '\n')
      answeredQuestions.add(char);
  }
  return answeredQuestions;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const answers = transformInput(result);
    console.log(countQuestionsAnswered(answers[0]));

    //console.log(answers);
    // Part 1
    // Part 2
  })
  .catch((error) => {
    console.log(error);
  });
