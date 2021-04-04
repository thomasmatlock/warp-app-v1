// returns random item from array
exports.randomFromArray = (arr) => {
    randomItem = arr[Math.floor(Math.random() * Math.floor(arr.length - 1))];
    // console.log(randomItem);
    return randomItem;
};

// console.log(Object.getOwnPropertyNames(obj)); // converts object to array

exports.loopThroughArray = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i].title);
    }
};