const levenshtein = require("js-levenshtein");

const { readLineByLine, writeFile } = require("../IOModule");

const bgWordsResource = "tests/bgWordsTest.txt";
const mkWordsRecource = "tests/mkWordsTest.txt";

const resultFile = "results/generatedDictFromVec.txt";

let resultWords = [];
const threshold = 0.62;

prepareWords = async () => {
  let bgWords = await readLineByLine(bgWordsResource);
  let mkWords = await readLineByLine(mkWordsRecource);

  bgWords.map(bgWord => {
    mkWords.map(mkWord => {
      preConditions(bgWord, mkWord);
    });
  });

  await writeFile(
    resultFile,
    // resultWords.map(pair => pair.word1 + " " + pair.word2).join("\n")
    resultWords.map(pair => pair.word1 + " " + pair.word2 + " " + pair.levenshtein + " " + pair.maxLen + " " + pair.distance).join("\n")
  );
};

preConditions = (word1, word2) => {
  const a = word1;
  const b = word2;

  var commonLetters = word1.split("").filter(letter => {
    return word2.indexOf(letter) > 0;
  });
  if (commonLetters.length > 0) {
    if (a.length > 4 && b.length > 4) {
      if (a.length >= b.length) {
        if (b.length * 2 > a.length) {
          runAl(a, b);
        }
      } else {
        if (a.length * 2 > b.length) {
          runAl(a, b);
        }
      }
    }
  }
};

function runAl(word1, word2) {
  const maxLen = Math.max(word1.length, word2.length);
  const MED = 1 - levenshtein(word1, word2) / maxLen;
  if (MED > threshold) {
    // resultWords.push({ word1: word1, word2: word2});
    resultWords.push({ word1: word1, word2: word2, levenshtein: levenshtein(word1, word2), maxLen: maxLen, distance: MED});
  }
}

prepareWords();
