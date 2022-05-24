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
    // chances = 1 is 100% chance of interjection sentence
    // chances = 2 is 50% chance of random sentence and 50% chance of interjection sentence 
    // chances = 4 or 5 is default. 5 sets 20% chance of interjection sentence
    let chances = 5; // DEFAULT 5,  look above for explanation
    let odds = global.getRandomInt(chances);
    let randomAdj = global.randomFromArray(adjectives);
    let randomAdverb = global.randomFromArray(adverbs);
    let randomNoun = global.randomFromArray(nouns);
    let randomVerb = global.randomFromArray(verbs);
    let sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun}`;
    if (odds === 0) {
        let odds2 = global.getRandomInt(2); // DEFAULT TO 2
        if (odds2 === 0) sentence = `...${getRandomInterjection().toLowerCase()}, ${global.randomFromArray(phrases).toLowerCase()}...`; // interjection sentence
        // if (odds2 === 1) sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun} (${global.randomFromArray(phrases).toLowerCase()}${getRandomPunctuation()})`; // random sentence
        if (odds2 === 1) sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun} (${getRandomInterjection().toLowerCase()}, ${global.randomFromArray(phrases).toLowerCase()}${getRandomPunctuation()})`; // random sentence with interjection
    }
    return sentence;
}
module.exports = { generate };