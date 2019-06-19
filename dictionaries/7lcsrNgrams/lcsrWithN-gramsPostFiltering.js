// import longestCommonSubsequence from '../LCSalgorithm';
const _ = require('lodash');
const longestCommonSubsequence = require('./LCSalgorithm');

const { readLineByLine, writeFile } = require('../IOModule');

const split = line => {
    const [from, to] = line.split(/\s*\s{1,}\s*/);
    return { from, to };
}

const wordsResource = "results/generatedDict.txt";

const resultFile = 'results/filteredDict.txt';
// const resultFile = 'results/nGrams/filteredWords.txt';

const grams = [
    ["ќо",	"кьо"],
["ќу",	"кю"],
["ќа","кя"],
["ќ", "к"],
["љо","льо"],
["љу","лю"],
["ља","ля"],
["љ","л"],
["њо", "ньо"],
["њу", "ню"],
["ња", "ня"],
["њ", "н"],
["ѕ", "дз"],
["џ", "дж"],
["ју",	"ю"],
["ја",	"я"],
["ј",	"й"],
["’", "ъ"],
["шт",	"щ"],
]

filterWords = async ()=> {
    let allWords = await readLineByLine(wordsResource, split);

    for (const pair of allWords) {
        pair.changedWord = grams.reduce((w, gram) => {
            return w.split(gram[0]).join(gram[1]);
        }, pair.to);
    }

    allWords = allWords.filter(({from, changedWord}) => from.length > 4 && changedWord.length > 4);

    for (const pair of allWords) {
        pair.number = runAl(pair.from, pair.changedWord)
    }

    allWords = _.sortBy(allWords, ({ number }) => -number);

    const bgVisited = new Set();
    const mkVisited = new Set();
    
    allWords = allWords.filter(({ from, changedWord }) => {
        if (!bgVisited.has(from) && !mkVisited.has(changedWord)) {
            bgVisited.add(from);
            mkVisited.add(changedWord);
            return true;
        }
    });

    // await writeFile(resultFile, allWords.map(pair => pair.from + ' ' + pair.to).join('\n'));
    await writeFile(resultFile, allWords.map(pair => pair.from + ' ' + pair.to + ' ' + pair.number).join('\n'));
}

function runAl(word1, word2) {
    const maxLen = Math.max(word1.length, word2.length);

    return longestCommonSubsequence(word1, word2).length / maxLen;
}

filterWords()
