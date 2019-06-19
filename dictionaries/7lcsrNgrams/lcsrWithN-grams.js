const _ = require('lodash');
const longestCommonSubsequence = require('./LCSalgorithm');

const { readLineByLine, writeFile } = require('../IOModule');

const bgWordsResource = "tests/bgWords.txt";
const mkWordsRecource = "tests/mkWords.txt";

const resultNgramsFile = 'results/generatedDict.txt';

let resultWords = [];

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

prepareWord = async ()=> {
    let bgWords = await readLineByLine(bgWordsResource);
    let mkWords = await readLineByLine(mkWordsRecource);

    bgWords = bgWords.slice(0,100000);
    mkWords = mkWords.slice(0,100000);

    bgWords.map(bgWord => {
        mkWords.map(mkWord => {
            preConditions(bgWord, mkWord);
        })
    })

    await writeFile(resultNgramsFile, resultWords.map(word => word.word1 + ' ' + word.word2 + ' ' + word.word3).join('\n'));
}

// word1 = bgWord; word2 = mkWord
preConditions= (word1, word2)=> {

    const newMkWord = grams.reduce((w, gram) => {
        return w.split(gram[0]).join(gram[1]);
    }, word2);


    const a =  Array.from(word1);
    const b =  Array.from(word2);
    const newMkWordArr = Array.from(newMkWord);

    var commonLetters = word1.split("").filter(letter => {
        return newMkWord.indexOf(letter) > 0 
    })
    if (commonLetters.length > 0 ) {
        if(a.length > 4 && newMkWordArr.length > 4) {
            if(a.length >= newMkWordArr.length) {
                if((newMkWordArr.length*2) > a.length) {
                    runAl(a,b, newMkWordArr)
                }
            }
            else {
                if((a.length*2) > newMkWordArr.length) {
                    runAl(a,b, newMkWordArr)
                }
            }
        }
    } 
}


function runAl(word1, word2, newMkWord) {
    const maxLen = Math.max(word1.length, newMkWord.length);

    if(longestCommonSubsequence(word1, newMkWord).length / maxLen > 0.58) {
        resultWords.push({word1:word1.join(""), word2:word2.join(""), word3: newMkWord.join("")})
    }
}


prepareWord()
