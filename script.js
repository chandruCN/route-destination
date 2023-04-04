"use strict";

var convert = document.querySelector(".convert");
var fromlocation = document.querySelector(".from");
var tolocation = document.querySelector(".to");
var shortestDistances;
var start;
var end;

//############################################################

fromlocation.addEventListener("change", (event) => {
  start = `${event.target.value}`;
});

tolocation.addEventListener("change", (event) => {
  end = `${event.target.value}`;
});

//################################################################

const graph = {
  thirunelveli: { madurai: 2 },
  madurai: { thirunelveli: 2, salem: 3, coimbatore: 3, trichy: 2 },
  trichy: { madurai: 2, chennai: 3 },
  salem: { madurai: 3, banglore: 3 },
  coimbatore: { madurai: 3, banglore: 3, chennai: 3 },
  chennai: { coimbatore: 3, banglore: 2, mumbai: 5 },
  banglore: { salem: 2, coimbatore: 3, mumbai: 3 },
  mumbai: { chennai: 5, banglore: 3 },
};

const printTable = (table) => {
  return Object.keys(table)
    .map((vertex) => {
      var { vertex: from, distance } = table[vertex];
      return `${vertex}: ${distance} via ${from}`;
    })
    .join("\n");
};

const tracePath = (table, start, end) => {
  var path = [];
  var next = end;
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = table[next].vertex;
  }

  return path;
};

const formatGraph = (g) => {
  const tmp = {};
  Object.keys(g).forEach((k) => {
    const obj = g[k];
    const arr = [];
    Object.keys(obj).forEach((v) => arr.push({ vertex: v, distance: obj[v] }));
    tmp[k] = arr;
  });
  return tmp;
};

const dijkstra = (graph, start, end) => {
  var map = formatGraph(graph);

  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, distance: 0 } };

  var vertex;
  while ((vertex = unvisited.shift())) {
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var distanceToVertex = shortestDistances[vertex].distance;

    for (let { vertex: to, distance } of neighbors) {
      var currdistanceToNeighbor =
        shortestDistances[to] && shortestDistances[to].distance;
      var newdistanceToNeighbor = distanceToVertex + distance;
      if (
        currdistanceToNeighbor == undefined ||
        newdistanceToNeighbor < currdistanceToNeighbor
      ) {
        // Update the table
        shortestDistances[to] = { vertex, distance: newdistanceToNeighbor };
      }
    }

    visited.push(vertex);
  }

  // convert.addEventListener("click", dijkstra);

  const path = tracePath(shortestDistances, start, end);

  console.log(
    "Shortest path is: ",
    path.join(" -> "),

    shortestDistances[end].distance
  );
};
dijkstra(graph, "madurai", "banglore");

// var someDate = new Date();
// var numberOfDaysToAdd = shortestDistances;
// var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
// console.log(new Date(result));
var someDate = new Date();
var numberOfDaysToAdd = distance;
var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
console.log(new Date(result));
