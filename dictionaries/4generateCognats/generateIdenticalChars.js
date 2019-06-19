
const _ = require('lodash');
const { readLineByLine, writeFile } = require('../IOModule');

const bgWordsResource = "results/bgWordsFromVec.txt";
const mkWordsRecource = "results/mkWordsFromVec.txt";

const resultFile = 'results/bg-mk.cognates.txt';

function findRepeatingWords(firstArray, secondArray) {
    const keySet = new Set(secondArray);
    return firstArray.filter(word => keySet.has(word));
}

const generateIdenticalCharDictionaries = async () => {
    const bgWords = await readLineByLine(bgWordsResource);
    const mkWords = await readLineByLine(mkWordsRecource);

    let repeatingWords = findRepeatingWords(bgWords, mkWords);
    console.log(repeatingWords.length);

    await writeFile(resultFile, repeatingWords.map(word => word + ' ' + word).join('\n'));
        
}

generateIdenticalCharDictionaries();