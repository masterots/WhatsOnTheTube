package Models

class Node(val name: String, val neighbors: MutableList<Node> = mutableListOf()) {
    fun addEdge(neighbor: Node) {
        if (!neighbors.contains(neighbor)) {
            neighbors.add(neighbor)
        }
    }
}
