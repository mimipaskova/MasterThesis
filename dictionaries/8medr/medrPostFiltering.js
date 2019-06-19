const _ = require('lodash');
const levenshtein = require("js-levenshtein");

const { readLineByLine, writeFile } = require('../IOModule');

const split = line => {
    const [from, to] = line.split(/\s*\s{1,}\s*/);
    return { from, to };
}

const wordsResource = "results/generatedDict.txt";

const resultFile = 'results/filteredDict.txt';

filterWords = async ()=> {
    let allWords = await readLineByLine(wordsResource, split);
    
    allWords = allWords.filter(({from, to}) => from.length > 4 && to.length > 4);

    for (const pair of allWords) {
        pair.number = runAl(pair.from, pair.to)
    }

    allWords = _.sortBy(allWords, ({ number }) => -number);
    
    const bgVisited = new Set();
    const mkVisited = new Set();
    
    allWords = allWords.filter(({ from, to }) => {
        if (!bgVisited.has(from) && !mkVisited.has(to)) {
            bgVisited.add(from);
            mkVisited.add(to);
            return true;
        }
    });

    await writeFile(resultFile, allWords.map(word => word.from + ' ' + word.to + ' ' + word.number).join('\n'));
}

function runAl(word1, word2) {
    const maxLen = Math.max(word1.length, word2.length);
    
    return (1 - levenshtein(word1, word2) / maxLen);
}

filterWords()
