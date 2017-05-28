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

            var currentStationDistance = 0;
            q.Enqueue(start);
            start.Visited = true;

            while (q.Count > 0)
            {
                var top = q.Peek();
                currentStationDistance = top.StopDistance;
                q.Dequeue();

                if (currentStationDistance < numberOfStops)
                {
                    currentStationDistance++;
                    foreach (var node in top.Neighbors)
                    {
                        if (!node.Visited)
                        {
                            node.StopDistance = currentStationDistance;
                            q.Enqueue(node);
                        }
                        node.Visited = true;
                    }
                }
                else
                {
                    if (top.StopDistance == numberOfStops)
                    {
                        stations.Add(top);
                    }
                }
           }

            return stations;
        }
    }
}
