const fs = require('fs');
const readline = require('readline');

// const resource = 'tests/wiki.bg.test.vec';
// const resultFile = 'results/bgWordsFromVec.txt';
const resource = 'tests/wiki.mk.test.vec';
const resultFile = 'results/mkWordsFromVec.txt';

let words = [];

function readAndWriteLineByLine(file, words, generatedFile) {
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
    });

    return rl.on('line', (line) => {
        let lineAsArray = line.split(" ");
            if(lineAsArray[0].length > 0 ) {
                words.push(lineAsArray[0]);
        
                fs.appendFile(generatedFile, lineAsArray[0] + "\n", (err) => {
                    if (err) throw err;
                });
            }
    })
}

function filterWordsFromVecFile(resource, words, resultFile) {
    readAndWriteLineByLine(resource, words, resultFile )
    .on('close', () => {
        console.log("Result is ready in " + resultFile);
    });

}

filterWordsFromVecFile(resource, words, resultFile)