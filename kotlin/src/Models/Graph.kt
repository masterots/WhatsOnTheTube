package Models

class Graph {
    private var _nodes: MutableList<Node> = mutableListOf()

    fun addEdge(fromStation: String, toStation: String) {
        var first = getNodeByName(fromStation)
        var second = getNodeByName(toStation)

        if (first == null) {
            first = Node(fromStation)
            _nodes.add(first)
        }

        if (second == null) {
            second = Node(toStation)
            _nodes.add(second)
        }

        first.addEdge(second)
        second.addEdge(first)
    }

    fun getNodeByName(name: String?): Node? {
        if (!name.isNullOrEmpty()) {
            return _nodes.find { node -> node.name == name }
        }
        return null
    }
}
