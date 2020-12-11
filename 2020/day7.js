/*
* Main goal: Get 50 statusbar
* Today goal: Count how many bags can contain a
* How part 1:
** create array of dependencies in a matrix
** find parents/ review columns+
*** start at column of node to find parents, add to queue, gold (g) q= [g]
*** add to queue q = [b, c]
*** check column of next element in queue and add not visited nodes
*** until q is empty count everythin that is added to queue
*** maybe visited is the one who in reality has al  the parents
*/
const buildAdjacencyMatrix = (string) => {
  const rulesList = string.split('\r\n');
  const [nodes, totalNodes] = getNodeList(rulesList);
  const adjMatrix = [];
  for (const rule of rulesList) {
    const emptyArr = new Array(totalNodes).fill(0);
    adjMatrix.push(emptyArr);
    let [node, children] = rule.split(' bags contain ');
    const row = nodes[node];

    if (children[0] === 'n' && children[1] === 'o')
      continue;
    children = children.split(', ');

    for (const child of children) {
      const childNode = child.split(' ');
      const weight = childNode[0];
      const nodeName = childNode[1] + ' ' + childNode[2];
      const col = nodes[nodeName];
      adjMatrix[row][col] = parseInt(weight);
    }
  }
  console.table(adjMatrix);
}

const getNodeList = (rules) => {
  const nodes = [];
  let i;
  for (i = 0; i < rules.length; i++) {
    let nodeName = rules[i].split(' bags contain ')[0];
    nodes[nodeName] = i;
  }

  return [nodes, i];
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const graphMatrix = buildAdjacencyMatrix(result);
    // Part 1
    // Part 2

  })
  .catch((error) => {
    console.log(error);
  });