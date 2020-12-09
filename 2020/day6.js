/*
* Main goal: Get 50 statusbar
* Today goal: Find the highest set ID on a boarding pass
* How part 1:
** Count number of questions answered by group
** Add the number of questions answered by group
** Divide the input by blank line
* How part 2:
** DTraverse first line and check the rest of the list
*/

const transformInput = (string) => string.split('\r\n\r\n');

const countQuestionsAnswered = (groupAnswers) => {
  const answeredQuestions = new Set()
  for (const char of groupAnswers) {
    if (char !== '\r' && char !== '\n')
      answeredQuestions.add(char);
  }
  return answeredQuestions.size;
}

const totalQuestionsAnswered = (answerList) => {
  let total = 0;
  for (const groupAnswers of answerList) {
    const count = countQuestionsAnswered(groupAnswers);
    total += count;
  }
  return total;
}

// Part 2
const countQuestionsAnsweredByEveryone = (answersOfGroup) => {
  // Each line has the answer of each person
  const answerLines = answersOfGroup.split('\r\n');
  const firstLine = answerLines[0];
  let countAnswers = 0;
  for (const answer of firstLine) {
    let everyoneAnswered = true;
    for (let i = 1; i < answerLines.length; i++) {
      const line = answerLines[i];
      if (!(line.includes(answer))) {
        everyoneAnswered = false;
        continue;
      }
    }
    if (everyoneAnswered)
      countAnswers++;
  }
  return countAnswers;
}

const totalQuestionsAnsweredByEveryone = (answerList) => {
  let total = 0;
  for (const groupAnswers of answerList) {
    const count = countQuestionsAnsweredByEveryone(groupAnswers);
    total += count;
  }
  return total;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const groupAnswers = transformInput(result);
    // Part 1
    console.log(totalQuestionsAnswered(groupAnswers));
    // Part 2
    console.log(totalQuestionsAnsweredByEveryone(groupAnswers));
  })
  .catch((error) => {
    console.log(error);
  });
