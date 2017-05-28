﻿using System.Collections.Generic;
using System.Linq;

namespace tube.Models
{
    public class Node
    {
        public string Name { get; set; }
        public List<Node> Neighbors { get; set; }
        public bool Visited { get; set; }
        public int StopDistance { get; set; }

        public Node()
        {
            Neighbors = new List<Node>();
            Visited = false;
        }

        public void AddEdge(Node neighbor)
        {
            var existingNeighbor = Neighbors.FirstOrDefault(n => n.Name == neighbor.Name);
            if (existingNeighbor == null)
            {
                Neighbors.Add(neighbor);   
            }
        }
    }
}
