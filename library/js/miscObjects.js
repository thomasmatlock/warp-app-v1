// Returns object length
Object.size = function(obj) {
    var size = 0,
        key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
// LOOP THROUGH OBJECT PROPERTIES      (key/value pairs)
let objectToLoopThrough;
for (var key in objectToLoopThrough) {
    if (objectToLoopThrough.hasOwnProperty(key)) {
        console.log(key + ' is ' + objectToLoopThrough[key]);
        // objectToLoopThrough[key] = false;
    }
}

//  display all properties of an object
Object.getOwnPropertyNames(obj);

// logObjectProperties
// const logObjectProperties = (obj) => {
//     console.log(obj);
//     for (var key in obj) {
//         // console.log(obj[key]);
//         console.log(obj.key);
//         // console.log(key);
//         // console.log(obj.hasOwnProperty[key]);
//         if (obj.hasOwnProperty(key)) {
//             // console.log(key + ' is ' + obj[key]);
//             // obj[key] = false;
//         }
//     }
// };