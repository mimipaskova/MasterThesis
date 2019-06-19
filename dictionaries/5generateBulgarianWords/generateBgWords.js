const { readLineByLine, writeFile } = require('../IOModule');

const split = line => line.split(/\s*\s{1,}\s*/)[0];

const resourceVecFile = "tests/wiki.mk.test.vec";

const resultBGMK = "results/bg-mk.txt";

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

const serializePairs = (pairs) => {
    return pairs.map(pair => pair.join(' ')).join('\n');
}

const generateBgWords = async () => {
    const mkWords = await readLineByLine(resourceVecFile, split);
    const newDict = mkWords.map(word => {
        const newWord = grams.reduce((w, gram) => {
            return w.split(gram[0]).join(gram[1]);
        }, word);
        return [newWord, word];
    })
    .filter(([bgWord, mkWord]) => mkWord !== bgWord);

    await writeFile(resultBGMK, serializePairs(newDict));
    console.log('Files hava been saved!');
}

generateBgWords();