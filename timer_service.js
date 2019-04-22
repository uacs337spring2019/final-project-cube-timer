/* node.js setup stuff */

const express = require("express");
const app = express();
var fs = require('fs');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.use(express.static('public'));

// message log filename
const logFile = "messages.txt";

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
	try {  
	    content = fs.readFileSync(file_name, 'utf8');
	} catch(e) {
	    console.log("Error reading file " + file_name + ':', e.stack);
	}
	return content;
}


/**
 * Reads the messeages stored in the log file and returns it as a JSON string.
 */
function getMessageLogJSON() {
    let contents = readFile(logFile);
    let lines = contents.split('\n');

    let messages = [];
    // iterate through lines.length-1 because last line is just a newline
    for (let i = 0; i < lines.length - 1; i++) {
        let line = lines[i];
        let tokens = line.split(':::');
        let messageEntry = {}
        messageEntry['name'] = tokens[0];
        messageEntry['message'] = tokens[1];
        messages.push(messageEntry);
    }

    return JSON.stringify(messages);
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

    let name = req.query.username;

    res.send(readFile(name + ".txt"));
});

app.post('/', jsonParser, function(req, res) {
    let username = req.body.username;
    let history = req.body.history;

    fs.appendFile(username + ".txt", history, function (err) {
        if (err) {
            res.send("Server encountered an error on saving your history");
            throw err;
        }
        console.log('Saved!');
        res.send("Successfully saved history");
    });
});

app.listen(3000);