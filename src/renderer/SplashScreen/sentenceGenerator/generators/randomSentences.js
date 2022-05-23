const nouns = require('../components/nouns.js');
const adjectives = require('../components/adjectives.js');
const adverbs = require('../components/adverbs.js');
const phrases = require('../components/phrases.js');
const interjections = require('../components/interjections.js');
const punctuation = require('../components/punctuation.js');
const verbs = require('../components/verbs.js');
const global = require('../../../../js/global');

const getRandomPunctuation = () => global.randomFromArray(punctuation);
const getRandomInterjection = () => global.randomFromArray(interjections);

const generate = () => {
    let odds = global.getRandomInt(1); // DEFAULT (set to 1 to test interjections)
    let randomAdj = global.randomFromArray(adjectives);
    let randomAdverb = global.randomFromArray(adverbs);
    let randomNoun = global.randomFromArray(nouns);
    let randomVerb = global.randomFromArray(verbs);
    let sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun}`;
    if (odds === 0) {
        let odds2 = global.getRandomInt(2); // DEFAULT TO 2
        if (odds2 === 0) sentence = `...${getRandomInterjection().toLowerCase()}, ${global.randomFromArray(phrases).toLowerCase()}...`;
        if (odds2 === 1) sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun} (${global.randomFromArray(phrases).toLowerCase()}${getRandomPunctuation()})`;
    }
    return sentence;
}
module.exports = { generate };