const element = document.getElementById('status');
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
    // let repeatCount = 10;
    // for (let i = 1; i < 10; i++) {
    //     setTimeout(() => {
    //         document.getElementById('status').innerHTML = sentenceGenerator();
    //         // element.innerHTML = sentenceGenerator();
    //         // sentenceGenerator2();
    //     }, 500);
    // }
    let delay = 500;
    // console.log(`${pckg.version}`);
    // versionElement.innerHTML = `version ${pckg.version}`;
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
    'installing',
    'seeking',
    'collapsing',
    'establishing',
    'showing off',
    'pre-computing',
    'loading'
];
const sortThis = [
    "solar satellite",
    "Lunar network clusters...",
    "Settings being boarded",
    "Network Express line rails installed",
    "Connection establishedOnline network...",
    "Authenrication Online network...",
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
const directObjArr = [

    'engines',
    'enjoyment',
    'fatherboards',
    'motherboards',
    'workflows',
    'satisfaction',
    'recognition',
    'fame',
    'ambitiousness',
    'curiousity',
    'sense of humor',
    'settings',
    'the universe',
    'new sentences',
    'RAM',
    'processor cores',
    'capabilities'
];

const hardwareNounsArray = [
    'CPUs / Processors',
    'Motherboards',
    'Video Graphic Devices',
    'Computer Cases',
    'Power Supplies',
    'Memory (PC RAM)',
    'Storage',
    'Optical Drives',
    'PC Cooling'
]

const sentenceGenerator = () => {
    // let randomAdv = randomFromArray(advArr);
    // let randomNoun = randomFromArray(nounArr);
    let randomAdj = randomFromArray(adjectiveArr);
    let randomDirObj = randomFromArray(directObjArr);
    // let randomAppearance = randomFromArray(appearanceArr);
    // let randomArticle = randomFromArray(articleArr);
    let randomVerb = randomFromArray(verbArr);
    let sentence = `Warp is  ${randomVerb}  ${randomDirObj}...`;
    return sentence;
};
const sentenceGenerator2 = () => {
    // let randomAdv = randomFromArray(advArr);
    // let randomNoun = randomFromArray(nounArr);
    let randomAdj = randomFromArray(adjectiveArr);
    let randomDirObj = randomFromArray(directObjArr);
    // let randomAppearance = randomFromArray(appearanceArr);
    // let randomArticle = randomFromArray(articleArr);
    let randomVerb = randomFromArray(verbArr);
    let sentence = `Warp is  ${randomVerb}  ${randomDirObj}...`;
    element.innerHTML = sentence;
};