﻿using System.Collections.Generic;
using tube.Models;

namespace tube.Utils
{
    public static class NodeUtils
    {
        public static List<Node> FindStationsByNumberOfStops(this Node start, int numberOfStops)
        {
            Queue<Node> q = new Queue<Node>();
            List<Node> stations = new List<Node>();
            Dictionary<string, int> visited = new Dictionary<string, int>();

            var currentStationDistance = 0;
            q.Enqueue(start);
            visited.Add(start.Name, currentStationDistance);

            while (q.Count > 0)
            {
                var top = q.Peek();
                q.Dequeue();

                currentStationDistance = visited.ContainsKey(top.Name)
                                                ? visited[top.Name]
                                                : currentStationDistance;

                if (currentStationDistance < numberOfStops)
                {
                    currentStationDistance++;
                    foreach (var node in top.Neighbors)
                    {
                        if (!visited.ContainsKey(node.Name))
                        {
                            visited.Add(node.Name, currentStationDistance);
                            q.Enqueue(node);
                        }
                    }
                }
                else
                {
                    if (visited[top.Name] == numberOfStops)
                    {
                        stations.Add(top);
                    }
                }
           }

            return stations;
        }
    }
}
