"use strict";

//call the class name from html

var convert = document.querySelector(".convert");
var fromlocation = document.querySelector(".from");
var tolocation = document.querySelector(".to");
var destination = document.querySelector(".destination");
var destinationroute = document.getElementById("destination-route");
var shortestDistances;
var start;
var end;
var path;
var endDate;

//############################################################
//function for from location
fromlocation.addEventListener("change", (event) => {
  start = `${event.target.value}`;
});
//function for to location
tolocation.addEventListener("change", (event) => {
  end = `${event.target.value}`;
});

//################################################################
//dijikstra function for find out the rout distance
const graph = {
  thirunelveli: { madurai: 2 },
  madurai: { thirunelveli: 2, salem: 3, coimbatore: 3, trichy: 2 },
  trichy: { madurai: 2, chennai: 3 },
  salem: { madurai: 3, banglore: 2 },
  coimbatore: { madurai: 3, banglore: 3, chennai: 3 },
  chennai: { coimbatore: 3, banglore: 2, mumbai: 5 },
  banglore: { salem: 2, coimbatore: 3, mumbai: 3 },
  mumbai: { chennai: 5, banglore: 3 },
};
//to create the table method
const printTable = (table) => {
  return Object.keys(table)
    .map((vertex) => {
      var { vertex: from, distance } = table[vertex];
      return `${vertex}: ${distance} via ${from}`;
    })
    .join("\n");
};

const tracePath = (table, start, end) => {
  //empty array for object store
  var path = [];
  var next = end;

  //is for check the given input
  while (true) {
    path.unshift(next);
    if (next === start) {
      break;
    }
    next = table[next].vertex;
  }

  return path;
};

//give the  key value for arr & obj

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

//dijikstra function for find the destination in shortest path

const dijkstra = (graph, start, end) => {
  var map = formatGraph(graph);
  //empty array for value
  var visited = [];
  var unvisited = [start];
  var shortestDistances = { [start]: { vertex: start, distance: 0 } };

  var vertex;
  //while function for find the value from the vertex
  while ((vertex = unvisited.shift())) {
    console.log(neighbors);
    // Explore unvisited neighbors
    var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));
    console.log(neighbors);
    // Add neighbors to the unvisited list
    unvisited.push(...neighbors.map((n) => n.vertex));

    var distanceToVertex = shortestDistances[vertex].distance;
    //make a for loop to find the distance from to distance

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
  //here the process for get the time

  const path = tracePath(shortestDistances, start, end);

  var startDate = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .split(" ")
    .join("-");
  startDate = new Date(startDate.replace(/-/g, "/"));
  //create a empty string to pass the varialble
  var endDate = "",
    noOfDaysToAdd = shortestDistances[end].distance,
    count = 0;
  //while loop for calculate the date from the total distance
  while (count < noOfDaysToAdd) {
    endDate = new Date(startDate.setDate(startDate.getDate() + 1));
    //here the value of 0 is sunday and value 6 is saturday
    if (endDate.getDay() != 0 && endDate.getDay() != 6) {
      count++;
    }
  }

  var finaldate =
    "YOUR DESTINATION IN SHORTEST PATH :" +
    path.join(" -> ") +
    " " +
    shortestDistances[end].distance +
    " days " +
    "arraival at " +
    endDate.toLocaleDateString().slice(0, 10);

  destination.innerHTML = finaldate;
};

convert.addEventListener("click", (event) => {
  dijkstra(graph, start, end);
});
f;
