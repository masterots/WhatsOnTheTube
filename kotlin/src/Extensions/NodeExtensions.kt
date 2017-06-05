package Extensions

import Models.Node
import java.util.*
import kotlin.collections.HashMap

fun Node.findStationsByNumberOfStops(numberOfStops: Int): MutableList<Node> {
    var q: Queue<Node> = LinkedList<Node>()
    var stations: MutableList<Node> = mutableListOf()
    var visited: HashMap<String, Int> = hashMapOf()

    var currentStationDistance = 0
    q.add(this)
    visited[this.name] = currentStationDistance

    while (q.count() > 0) {
        var top = q.peek()
        q.remove()

        currentStationDistance = visited.get(top.name) ?: currentStationDistance

        if (currentStationDistance < numberOfStops) {
            currentStationDistance++
            top.neighbors.forEach { node ->
                if (!visited.containsKey(node.name)) {
                    q.add(node)
                    visited[node.name] = currentStationDistance
                }
            }
        } else {
            if (visited[top.name] == numberOfStops) {
                stations.add(top)
            }
        }
    }

    return stations
}
