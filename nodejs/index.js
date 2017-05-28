const csv = require('csv');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Graph = require('./Models/Graph.js');

function readFileAsync(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

function parseCsvAsync(csvData) {
    return new Promise((resolve, reject) => {
        csv.parse(csvData, (err, contents) => {
            if (err) {
                reject(err);
            } else {
                resolve(contents);
            }
        });
    });
}

function getStationNameAsync() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('Station Name: ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}


function getStopCountAsync() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('How many stops? ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function startApp() {
    const graph = new Graph();
    let csvData;
    let parsedCsv;

    let startingStation;
    let stopCount = 0;

    try {
        csvData = await readFileAsync(path.resolve('..', 'data', 'tube_data.csv'));
    } catch (e) {
        console.log('Error reading file:', e);
        process.exit(1);
    }

    try {
        parsedCsv = await parseCsvAsync(csvData);
    } catch (e) {
        console.log('Error parsing csv data:', e);
        process.exit(1);
    }


    for (let i = 0; i < parsedCsv.length; i++) {
        graph.addEdge(parsedCsv[i][1], parsedCsv[i][2]);
    }

    while (!startingStation) {
        const stationName = await getStationNameAsync();
        startingStation = graph.getNodeByName(stationName);
    }

    while (stopCount < 1) {
        const userInput = parseInt(await getStopCountAsync(), 10);
        if (!isNaN(userInput)) {
            stopCount = userInput;
        }
    }

    const stations = startingStation.findStationsByNumberOfStops(stopCount);

    stations.forEach(s => console.log(s.name));
}

startApp();
