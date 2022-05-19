const verbsArr = require('./verbs.js');
const directObjArr = require('./nouns.js');
const adjectiveDescriptiveArr = require('./adjectiveDescriptiveArr.js');
const qualifier = require('./qualifier.js');
const adverbs = require('./adverbs.js');
const element = document.getElementById('status');
window.addEventListener(
    'load',
    function() {
        init();
    },
    false
);

const init = () => {
    let delay = 2000;
    element.innerHTML = sentenceGenerator();
    setTimeout(() => {
        element.innerHTML = sentenceGenerator();
        setTimeout(() => {
            element.innerHTML = sentenceGenerator();
            setTimeout(() => {
                element.innerHTML = sentenceGenerator();
                setTimeout(() => {
                    element.innerHTML = sentenceGenerator();
                    setTimeout(() => {
                        element.innerHTML = sentenceGenerator();
                        setTimeout(() => {
                            element.innerHTML = sentenceGenerator();
                            setTimeout(() => {
                                element.innerHTML = sentenceGenerator();
                                setTimeout(() => {
                                    element.innerHTML = sentenceGenerator();
                                    setTimeout(() => {
                                        element.innerHTML = sentenceGenerator();
                                        setTimeout(() => {
                                            element.innerHTML = sentenceGenerator();
                                            setTimeout(() => {
                                                element.innerHTML = sentenceGenerator();
                                                setTimeout(() => {
                                                    element.innerHTML = sentenceGenerator();
                                                    setTimeout(() => {
                                                        element.innerHTML = sentenceGenerator();
                                                        setTimeout(() => {
                                                            element.innerHTML = sentenceGenerator();
                                                        }, delay);
                                                    }, delay);
                                                }, delay);
                                            }, delay);
                                        }, delay);
                                    }, delay);
                                }, delay);
                            }, delay);
                        }, delay);
                    }, delay);
                }, delay);
            }, delay);
        }, delay);
    }, delay);
};

const randomFromArray = function(arr) {
    randomItem = arr[Math.floor(Math.random() * Math.floor(arr.length - 1))];
    return randomItem;
};




const sentenceGenerator = () => {
    let randomAdj = randomFromArray(adjectiveDescriptiveArr);
    let randomAdverb = randomFromArray(adverbs);
    let randomQualifier = randomFromArray(qualifier);
    let randomDirObj = randomFromArray(directObjArr);
    let randomVerb = randomFromArray(verbsArr);
    // let sentence = `${randomVerb} ${randomQualifier} ${randomAdverb} ${randomAdj}  ${randomDirObj}`;
    let sentence = `${randomVerb} ${randomAdverb} ${randomAdj}  ${randomDirObj}`;
    return sentence;
};