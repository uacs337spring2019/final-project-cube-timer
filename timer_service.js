/* node.js setup stuff */

const express = require("express");
const app = express();
var fs = require('fs');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(express.static('public'));

/* Service helper functions */

/**
 * Reads data asynchronously fromt he passed in file name. Code adapted from
 * gerrymandering_service.js from hw6.
 * 
 * @param {string} file_name filename of the requested file
 * @returns the contents of the file as a string
 */
function readFile(file_name) {
	let content;
    let solves = [];
	try {  
        content = fs.readFileSync(file_name, 'utf8');
	} catch(e) {
	    console.log("Error reading file " + file_name + ':', e.stack);
    }

    let lines = content.split('\n');
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        let tokens = lines[i].split(" ");
        if (tokens.length < 2) continue;
        let record = {};
        record['_time'] = {};
        record['_time']['_ms'] = tokens[0];

        let scramble = "";
        for (let j = 1; j < tokens.length; j++) {
            scramble += tokens[j] + " ";
        }
        record['_scramble'] = scramble.trim();
        solves.push(record);
        console.log(solves);
    }
    console.log(solves);
    console.log(JSON.stringify(solves));
	return JSON.stringify(solves);
}

/* Request handling */

console.log('service started');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    let username = req.query.username;

    res.send(readFile(username + ".txt"));
    console.log("sent data in file " + username + ".txt");
});

app.post('/', jsonParser, function(req, res) {
    let history = req.body.history;
    let username = req.body.username;

    for (let i = 0; i < history.length; i++) {
        let str = req.body.history[i]._time._ms + " " + req.body.history[i]._scramble + '\n';
        fs.appendFile(username + ".txt", str, function (err) {
            if (err) {
                res.send("Server encountered an error on saving your history");
                throw err;
            }
        });
    }
});

app.listen(process.env.PORT);