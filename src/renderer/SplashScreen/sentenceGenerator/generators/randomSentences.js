const nouns = require('../components/nouns.js');
const adjectives = require('../components/adjectives.js');
const adverbs = require('../components/adverbs.js');
const verbs = require('../components/verbs.js');
const global = require('../../../../js/global');


const generate = () => {
    let randomAdj = global.randomFromArray(adjectives);
    let randomAdverb = global.randomFromArray(adverbs);
    let randomNoun = global.randomFromArray(nouns);
    let randomVerb = global.randomFromArray(verbs);
    let sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomNoun}`;
    return sentence;
}
module.exports = { generate };