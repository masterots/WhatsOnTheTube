import Extensions.findStationsByNumberOfStops
import Models.Graph
import Models.Node
import java.io.File

fun main(args: Array<String>) {
    var web: Graph = Graph()
    var csvData = File("../data/tube_data.csv").readText(charset = Charsets.UTF_8)
    var lines = csvData.split("\n")
    for (line in lines) {
        if (!line.isEmpty()) {
            var data = line.split(",")
            var fromStation = data[1]
            var toStation = data[2]
            web.addEdge(fromStation, toStation)
        }
    }

    var station: Node? = null
    while (station == null) {
        var stationName = getStationFromUser()
        station = web.getNodeByName(stationName)
    }

    var numberOfStops: Int = 0
    while (numberOfStops < 1) {
        var stopCount = getStopCountFromUser()
        try {
            numberOfStops = stopCount!!.toInt()
        }
        catch (e: Exception) {
            println("That wasn't a valid input, try again")
            numberOfStops = 0
        }
    }

    var stations = station.findStationsByNumberOfStops(numberOfStops)
    stations.sortBy { s -> s.name }
    for (s in stations) {
        println(s.name)
    }
}

fun getStationFromUser(): String? {
    print("Station name: ")
    return readLine()
}

fun getStopCountFromUser(): String? {
    print("How many stops away: ")
    return readLine()
}
