const Node = require('./Node.js');

function Graph() {
    this.nodes = [];
}

Graph.prototype.addEdge = function(fromStation, toStation) {
    let first = this.getNodeByName(fromStation);
    let second = this.getNodeByName(toStation);

    if (!first) {
        first = new Node(fromStation);
        this.nodes.push(first);
    }

    if (!second) {
        second = new Node(toStation);
        this.nodes.push(second);
    }

    first.addEdge(second);
    second.addEdge(first);
};

Graph.prototype.getNodeByName = function(name) {
    return this.nodes.find(n => n.name === name);
};

Graph.prototype.printNodes = function() {
    for (let i = 0; i < this.nodes.length; i++) {
        console.log(this.nodes[i].name + ':');
        console.log(this.nodes[i].neighbors);
    }
};

module.exports = Graph;
