const { filterWordsFromVecFile} = require('./filterWordsFromVec');

const resource = 'tests/wiki.bg.test.vec';
const resultFile = 'tests/bgWords.txt';

let words = [];

const resourceMk = 'tests/wiki.mk.test.vec';
const resultFileMk = 'tests/mkWords.txt';

let wordsMk = [];

filterWordsFromVecFile(resource, words, resultFile)

filterWordsFromVecFile(resourceMk, wordsMk, resultFileMk)