const fs = require("fs");
const axios = require("axios");
const process = require("process");
const markov = require("./markov");

function generateFile(path) {
    try {
        var data = fs.readFileSync(path, 'utf8');
        let mm = new markov.MarkovMachine(data);
        console.log(mm.makeText());
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }
}

async function generateUrl(url) {
    try {
        let response = await axios.get(url);
        let mm = new markov.MarkovMachine(response.data);
        console.log(mm.makeText());
    } catch (err) {
        console.error(`Error reading ${url}: ${err}`);
        process.exit(1);
    }
}

let [method, path] = process.argv.slice(2);
console.log("process.argv.slice(2)", process.argv.slice(2));

if (method === "file") {
    generateFile(path);
} else if (method === "url") {
    generateUrl(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}