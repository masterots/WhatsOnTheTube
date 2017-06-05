const Queue = require('queuejs');

function Node(name) {
    this.name = name;
    this.neighbors = [];
}

Node.prototype.addEdge = function(neighbor) {
    if (!this.neighbors.includes(neighbor)) {
        this.neighbors.push(neighbor);
    }
};

Node.prototype.findStationsByNumberOfStops = function(numberOfStops) {
    const q = new Queue();
    const stations = [];
    const visited = new Map();
    
    let currentStationDistance = 0;
    q.enq(this);
    visited.set(this.name, currentStationDistance);

    while (q.size() > 0) {
        let top = q.peek();
        q.deq();

        currentStationDistance = visited.get(top.name) 
                                    ? visited.get(top.name) 
                                    : currentStationDistance;

        if (currentStationDistance < numberOfStops) {
            currentStationDistance++;
            top.neighbors.forEach(node => {
                if (!visited.has(node.name)) {
                    visited.set(node.name, currentStationDistance);
                    q.enq(node);
                }
            });
        }
        else {
            if (visited.get(top.name) == numberOfStops) {
                stations.push(top);
            }
        }
    }

    return stations;
};

module.exports = Node;
