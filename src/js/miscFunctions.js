// returns random item from array
exports.random = (arr) => {
    arr[Math.floor(Math.random() * Math.floor(arr.length - 1))];
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