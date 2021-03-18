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

// LOOP THROUGH OBJECT PROPERTIES      console.log(id);
let objectToLoopThrough;
for (var key in objectToLoopThrough) {
    if (objectToLoopThrough.hasOwnProperty(key)) {
        // console.log(key + " is " + objectToLoopThrough[key]);
        objectToLoopThrough[key] = false;
    }
}

// console.log(Object.getOwnPropertyNames(obj)); // converts object to array