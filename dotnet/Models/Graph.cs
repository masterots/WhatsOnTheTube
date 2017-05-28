﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace tube.Models
{
    public class Graph
    {
        private List<Node> _nodes;

        public Graph()
        {
            _nodes = new List<Node>();
        }

        public void AddEdge(string fromStation, string toStation)
        {
            var first = GetNodeByName(fromStation);
            var second = GetNodeByName(toStation);

            if (first == null)
            {
                first = new Node { Name = fromStation };
                _nodes.Add(first);
            }

            if (second == null) 
            {
                second = new Node { Name = toStation };
                _nodes.Add(second);
            }

            first.AddEdge(second);
            second.AddEdge(first);
        }

        public Node GetNodeByName(string name)
        {
            return _nodes.FirstOrDefault(s => s.Name == name);
        }
    }
}
