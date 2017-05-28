﻿using System;
using System.IO;
using System.Linq;
using tube.Utils;
using tube.Models;

namespace tube
{
    class Program
    {
        static void Main(string[] args)
        {
            var file = Path.Combine("..", "data", "tube_data.csv");

            Graph web = new Graph();

            using (var streamreader = File.OpenText(file)) 
            {
                while (!streamreader.EndOfStream)
                {
                    var line = streamreader.ReadLine();
                    var data = line.Split(new[] { ',' });
                    var fromStation = data[1];
                    var toStation = data[2];

                    web.AddEdge(fromStation, toStation);
                }
            }

            Node station = null;
            while (station == null)
            {
                var stationName = GetStationFromUser();
                station = web.GetNodeByName(stationName);
            }

            int numberOfStops = 0;
            while (numberOfStops < 1)
            {
                Int32.TryParse(GetStopCountFromUser(), out numberOfStops);
            }

            var stations = NodeUtils.FindStationsByNumberOfStops(station, numberOfStops);

            stations.OrderBy(s => s.Name).ToList().ForEach(n => Console.WriteLine(n.Name));
        }

        static string GetStationFromUser()
        {
            Console.Write("Station name: ");
            return Console.ReadLine();
        }

        static string GetStopCountFromUser()
        {
            Console.Write("How many stops away: ");
            return Console.ReadLine();
        }
    }
}
