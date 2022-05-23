const nouns = require('../components/nouns.js');
const adjectives = require('../components/adjectives.js');
const adverbs = require('../components/adverbs.js');
const phrases = require('../components/phrases.js');
const verbs = require('../components/verbs.js');
const global = require('../../../../js/global');
const getRandomPunctuation = () => {
    let punctuation = ['..', '?', '...', '', '..?'];
    return global.randomFromArray(punctuation);
}

const generate = () => {
    let odds = global.getRandomInt(5);
    let randomAdj = global.randomFromArray(adjectives);
    let randomAdverb = global.randomFromArray(adverbs);
    let randomNoun = global.randomFromArray(nouns);
    let randomVerb = global.randomFromArray(verbs);
    let randomPunctuation = getRandomPunctuation();
    let sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun}`;
    if (odds === 0) {
        sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun} (${global.randomFromArray(phrases).toLowerCase()}${randomPunctuation})`;
    }
    return sentence;
}
module.exports = { generate };