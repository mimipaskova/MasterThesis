const fs = require('fs');
const readline = require('readline');

function readLineByLine(file, transform = data => data) {
    const dict = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        dict.push(transform(line));
    });

    return new Promise((resolve, reject) => {
        rl.on('close', () => {
            resolve(dict);
        });
        rl.on('error', err => {
            reject(err);
        });
    });
}

exports.readLineByLine = readLineByLine;