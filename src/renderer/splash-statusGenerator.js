// const pckg = require('../../package.json');
// import pckg from '../../package.json';
// import pckg from "module-name";
// import pckg from "module-name";




window.addEventListener(
    'load',
    function() {
        // element.innerHTML = sentenceGenerator();
        //    element.innerHTML = 'hello';
        init();
        //    element.innerHTML = `Warp is ${randomFromArray(verbArr)}...`;
    },
    false
);

const init = () => {
    let repeatCount = 10;
    // for (let i = 1; i < repeatCount; i++) {
    //     setTimeout(() => {
    //         element.innerHTML = sentenceGenerator();
    //     }, 500);
    // }
    let delay = 500;
    let delay = Math.random();

    console.log(`${pckg.version}`);
    versionElement.innerHTML = `version ${pckg.version}`;
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
};

const randomFromArray = function(arr) {
    randomItem = arr[Math.floor(Math.random() * Math.floor(arr.length - 1))];
    return randomItem;
};


const sortThis = [
    "solar satellite",
    "Lunar network clusters...",
    "Settings being boarded",
    "Network Express line rails installed",
    "Downloads being  ",
    "Checking network...",
    "Connection establishedOnline network...",
    "Authenrication Online network...",
    'Tommyship preparing ',
    'RAM speed faster than GOAT speed',
    'doing a mic check for jokes later',
    'mailing a letter to the server in hope of updates',
    ' flying pigeon',
    'adding 4 increasing chances of peer recognition',
    'coming up with new sentences to read next time',

];
const adjectiveArr = [
    'eager',
    'speshow',
    'ambitious',
    'impatient',
    'earnest',
    'yearning',
    'helpful',
    'distracted',
    'gung ho',
    'rarin to go',
    'self-starting',
    'zealous',
    'lackadaisical',
    'snoring',
    'snoozing',
    'sleepy',
    'tired',
    'drowsy',
    'procrastinating',
    'slow-moving',
    'unenergetic',
    'unindustrious',
    'enthusiastic',
    'lively',
    'bright',
    'energetic',
    'frisky',
    'industrious',
    'perky',
];

const verbArr = [
    'refining',
    'checking',
    'preparing',
    'waking up',
    'warming up',
    'spooling up',
    'downloading',
    'optimizing',
    'preparing',
    'shoveling coal into the',
    'expanding',
    'boosting',
    'installing',
    'automating',
    'adjusting',
    'analyzing',
    'assembling',
    'building',
    'bundling',
    // 'seeking',
    // 'collapsing',
    'showing off',
    'pre-computing',
    'loading'
];
const adjArr = [
    'additional'
]
const directObjArr = [
    'engines',
    'admiration',
    'anticipation',
    'enjoyment',
    'fatherboards',
    'workflows',
    'satisfaction',
    'recognition',
    'fame',
    'ambitiousness',
    'sense of humor',
    'settings',
    'charisma',
    'the universe',
    'new sentences',
    'RAM',
    'capabilities'
];

const sentenceGenerator = () => {
    let randomAdj = randomFromArray(adjArr);
    let randomDirObj = randomFromArray(directObjArr);
    let randomVerb = randomFromArray(verbArr);
    let sentence = `Warp is  ${randomVerb} ${randomAdj}  ${randomDirObj}...`;
    return sentence;
};