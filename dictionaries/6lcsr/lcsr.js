const _ = require('lodash');
const longestCommonSubsequence = require('./LCSalgorithm');

const { readLineByLine, writeFile } = require('../IOModule');

const bgWordsResource = "tests/bgWords.txt";
const mkWordsRecource = "tests/mkWords.txt";

const resultFile = 'results/generatedDict.txt';
let resultWords = [];

prepareWord = async ()=> {
    let bgWords = await readLineByLine(bgWordsResource);
    let mkWords = await readLineByLine(mkWordsRecource);

    bgWords.map(bgWord => {
        mkWords.map(mkWord => {
            preConditions(bgWord, mkWord);
        })
    })

    await writeFile(resultFile, resultWords.map(word => word.word1 + ' ' + word.word2).join('\n'));
}

preConditions= (word1, word2)=> {
    const a =  Array.from(word1);
    const b =  Array.from(word2);

    var commonLetters = word1.split("").filter(letter => {
        return word2.indexOf(letter) > 0 
    })
    if (commonLetters.length > 0 ) {
        if(a.length > 4 && b.length > 4) {
            if(a.length >= b.length) {
                if((b.length*2) > a.length) {
                    runAl(a,b)
                }
            }
            else {
                if((a.length*2) > b.length) {
                    runAl(a,b)
                }
            }
        }
    } 
}


function runAl(word1, word2) {
    const maxLen = Math.max(word1.length, word2.length);

    if(longestCommonSubsequence(word1, word2).length / maxLen > 0.70) {
        resultWords.push({word1:word1.join(""), word2:word2.join("")})
    }
}

prepareWord()
