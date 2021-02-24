// returns random item from array
exports.randomFromArray = (arr) => {
    randomItem = arr[Math.floor(Math.random() * Math.floor(arr.length - 1))];
    // console.log(randomItem);
    return randomItem;
};
// Returns object length
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};