const Queue = require('queuejs');

function Node(name) {
    this.name = name;
    this.neighbors = [];
    this.visited = false;
    this.stopDistance = 0;
}

Node.prototype.addEdge = function(neighbor) {
    if (!this.neighbors.includes(neighbor)) {
        this.neighbors.push(neighbor);
    }
};

Node.prototype.findStationsByNumberOfStops = function(numberOfStops) {
    const q = new Queue();
    const stations = [];
    
    let currentStationDistance = 0;
    q.enq(this);
    this.visited = true;

    while (q.size() > 0) {
        let top = q.peek();
        currentStationDistance = top.stopDistance;
        q.deq();

        if (currentStationDistance < numberOfStops) {
            currentStationDistance++;
            top.neighbors.forEach(node => {
                if (!node.visited) {
                    node.stopDistance = currentStationDistance;
                    q.enq(node);
                }
                node.visited = true;
            });
        }
        else {
            if (top.stopDistance == numberOfStops) {
                stations.push(top);
            }
        }
    }

    return stations;
};

module.exports = Node;
