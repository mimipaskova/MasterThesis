const _ = require('lodash');
const split = line => line.split(/\s*\s{1,}\s*/);
const { readLineByLine, writeFile } = require('../IOModule');

// const readBGENtest = "tests/bg-en.txt";
// const readENMKtest = "tests/en-mk.txt";
const readBGEN = "resources/bg-en.txt";
const readENMK = "resources/en-mk.txt";

const writeBGMK = "results/bg-mk.txt";
const writeBGMKtest = "results/bg-mk.test.txt";
const writeBGMKtrain = "results/bg-mk.train.txt";

const trainFirstLength = 5000;
const testLength = 1500;

function groupBy(from, by) {
    const map = new Map();
    for (const el of from) {
        const key = by(el);
        const prev = map.get(key);
        if (prev) {
            prev.push(el);
        } else {
            map.set(key, [el]);
        }
    }
    return map;
}

const serializePairs = (pairs) => {
    return pairs.map(pair => pair.join(' ')).join('\n');
}

async function main() {
    const bgToEn = groupBy(await readLineByLine(readBGEN, split), ([first]) => first);
    const enToMk = groupBy(await readLineByLine(readENMK, split), ([first]) => first);

    const pairs =  _.flatMap([...bgToEn], ([bg, pairs]) => {
        const mks =  _.flatMap(pairs, ([blah, en]) => (enToMk.get(en) || []).map(([enn, mk]) => mk));
        return _.uniq(mks).map(mk => [bg, mk]);
    });
    
    const trainFirst = _.take(pairs, trainFirstLength);
    const test = _.slice(pairs, trainFirstLength, trainFirstLength+testLength);
    const trainSecond = _.slice(pairs, trainFirstLength+testLength, pairs.length);
    const train = trainFirst.concat(trainSecond);
    
    // await writeFile('tests/bg-mk.txt', serializePairs(pairs));
    
    await writeFile(writeBGMK, serializePairs(pairs));
    await writeFile(writeBGMKtrain, serializePairs(train));
    await writeFile(writeBGMKtest, serializePairs(test));
    console.log('Files hava been saved!');
}

main();
