const fs = require('fs');
const readline = require('readline');

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

exports.filterWordsFromVecFile = filterWordsFromVecFile;