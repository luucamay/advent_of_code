/*
* Main goal: Get 50 statusbar
* Title: Handy Haversacks
* Today goal: Count how many bags can contain a shiny gold bag
* How part 1:
** create array of dependencies in a matrix
** find parents/ review columns+
*** start at column of node to find parents, add to queue, gold (g) q= [g]
*** add to queue q = [b, c]
*** check column of next element in queue and add not visited nodes
*** until q is empty count everythin that is added to queue
*** maybe visited is the one who in reality has al  the parents
* How part 2: Count how many bags fit inside a shiny gold bag
** create array of dependencies in a matrix
** find children and add weights
*** start at row for shyny gold
*** add to queue the node
*** while there is nodes at queue keep checking if there are nodes there
*** if you find a node add the value to queue and add to total multiplied by currParentNodeWeigh
*** use parentweight to add
*** remove from queue and the current first node
*/
const buildAdjacencyMatrix = (rulesList, nodes, totalNodes) => {
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
  return adjMatrix;
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

// findTotalBags is a function that counts all the nodes that are parents to one node
const findTotalBags = (adjacencyMatrix, nodes, totalNodes) => {
  // start current node with the node that is at shinygold
  let currNode = nodes['shiny gold'];
  const visited = new Set();
  const queue = [];
  queue.push(currNode);
  while (queue.length > 0) {
    currNode = queue.shift();

    if (visited.has(currNode))
      continue;
    for (let i = 0; i < totalNodes; i++) {
      const weight = adjacencyMatrix[i][currNode];
      if (weight)
        queue.push(i);
    }
    visited.add(currNode);
  }
  // console.log(visited);
  return visited.size - 1;
}

const countBagsInsideBag = (bag, adjacencyMatrix, nodes, totalNodes) => {
  let totalBags = 0;
  let currNode = nodes[bag];
  const queue = [];
  const weights = [];
  weights.push(1);
  queue.push(currNode);
  while (queue.length > 0) {
    currNode = queue.shift();
    currWeight = weights.shift();
    for (let node = 0; node < totalNodes; node++) {
      const weight = adjacencyMatrix[currNode][node];
      if (weight) {
        const totalWeight = weight * currWeight
        totalBags = totalBags + totalWeight;
        queue.push(node);
        weights.push(totalWeight);
      }
    }
  }
  return totalBags;
}

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises.readFile('input.txt', 'utf-8')
  .then((result) => {
    const rulesList = result.split('\r\n');
    const [nodes, totalNodes] = getNodeList(rulesList);
    const graphMatrix = buildAdjacencyMatrix(rulesList, nodes, totalNodes);
    // console.table(graphMatrix);
    // Part 1
    const totalBags = findTotalBags(graphMatrix, nodes, totalNodes);
    console.log({ totalBags });
    // Part 2
    const totalBagsInside = countBagsInsideBag('shiny gold', graphMatrix, nodes, totalNodes);
    console.log({ totalBagsInside });
  })
  .catch((error) => {
    console.log(error);
  });