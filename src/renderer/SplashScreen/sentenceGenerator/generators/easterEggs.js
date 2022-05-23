let verbs = require('../components/verbs');
let nouns = require('../components/nouns');
let adjectives = require('../components/adjectives');
let adverbs = require('../components/adverbs');
let phrases = require('../components/phrases');
let global = require('../../../../js/global');
let totalPossibleSentences = global.numberWithCommas(verbs.length * nouns.length * adjectives.length * adverbs.length * phrases.length);
totalPossibleSentences = global.numberWithCommas(totalPossibleSentences);

let easterEggPredefined = [
    // https://veteran.com/military-alphabet/
    `${totalPossibleSentences} possible sentences`,
    // 'hello world',
    'workflows at warp speeds',
    'Whiskey Alpha Romeo Papa',
    'up up down down left right left right B A',
];
const getEasterEggPredefined = () => {
    let dice = global.getRandomInt(2);
    if (dice === 0) {
        let dice2 = global.getRandomInt(2)
        if (dice2 === 0) {
            return `${global.randomFromArray(verbs)} at warp speeds`
        } else if (dice2 === 1) {
            return `${global.randomFromArray(nouns)} at warp speeds`
        }
    } else if (dice === 1) {
        return `${global.randomFromArray(easterEggPredefined)}`
    }
}
const getRandomEasterEgg = () => {
    let dice = global.getRandomInt(2);
    if (dice === 0) {
        return `hello ${global.randomFromArray(adjectives)} ${global.randomFromArray(nouns)}`
    } else if (dice === 1) {
        // https://www.howtogeek.com/241598/whats-the-equivalent-of-ctrlaltdelete-on-a-mac/
        let insert = global.randomFromArray(nouns);
        insert = global.toTitleCase(insert);
        return `Ctrl Alt ${insert}`
    }
}
const generate = () => {
    let dice = global.getRandomInt(2);
    if (dice === 0) {
        // return global.randomFromArray(easterEggPredefined);
        return getEasterEggPredefined();
    } else if (dice === 1) {
        // return global.randomFromArray(easterEggRandom);
        return getRandomEasterEgg();
    }
};
module.exports = { generate };