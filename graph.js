/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for (let neighbor of vertex.adjacent){
      neighbor.adjacent.delete(vertex);
      vertex.adjacent.delete(neighbor);
    }

  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set([start]);
    const values = []

    while (toVisitStack.length > 0) {
      let currNode = toVisitStack.pop();

      values.push(currNode.value);
      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return values;
   }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitQueue = [start];
    let seen = new Set([start]);
    const values = []

    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();

      values.push(currNode.value);
      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
        }
      }
    }
    return values;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    let toVisitQueue = [start];
    let seen = new Set([]);

    let nodesAtLevel = 1;
    let nodesAtNextLevel = 0;
    let depthCount = 0;

    while (toVisitQueue.length > 0) {
      let currNode = toVisitQueue.shift();
      if (currNode === end) return depthCount;

      for (let neighbor of currNode.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitQueue.push(neighbor);
          seen.add(neighbor);
          nodesAtNextLevel++;
        }
      }
      nodesAtLevel--;
      if (nodesAtLevel === 0) {
        depthCount++;
        nodesAtLevel = nodesAtNextLevel;
        nodesAtNextLevel = 0;
      }
    }
   }
}

module.exports = { Graph, Node };
