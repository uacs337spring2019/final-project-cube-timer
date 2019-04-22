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
	try {  
	    content = fs.readFileSync(file_name, 'utf8');
	} catch(e) {
	    console.log("Error reading file " + file_name + ':', e.stack);
	}
	return content;
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