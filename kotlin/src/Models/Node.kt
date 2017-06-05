package Models

class Node {
    var name: String
    var neighbors: MutableList<Node> = mutableListOf()

    constructor(name: String) {
        this.name = name
    }

    fun addEdge(neighbor: Node) {
        if (!neighbors.contains(neighbor)) {
            neighbors.add(neighbor)
        }
    }
}
