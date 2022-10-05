// const findIndexOfItem = (parentItemID, e, avType) => {
//     var g = parentItemID;
//     for (var i = 0, len = g.children.length; i < len; i++) {
//         // console.log(i);
//         (function(index) {
//             g.children[i].onclick = function() {
//                 // alert(index);
//                 // console.log(index);
//                 // indexSelected = index;
//                 itemIndex = index;

//                 // if (e.target.className === 'fas fa-cog')
//                 //     console.log(`you clicked the ${indexSelected} cog`);
//                 // if (
//                 //     e.target.className === 'far fa-folder-open' &&
//                 //     avType == 'video'
//                 // ) {
//                 //     console.log(`you clicked the ${indexSelected} folder`);
//                 //     // shell.showItemInFolder(fileController.dirVideoPath);
//                 //     shell.openPath(fileController.dirVideoPath);
//                 //     // shell.showItemInFolder(
//                 //     //     `C:\\Users\\Tommy\\Documents\\Warp Downloader\\Video\\Just Go With It Meet the wife HD CLIP.mp4`
//                 //     // );
//                 // }
//             };
//         })(i);
//     }
// };
////////////////////////////////////////////////////////////////////////////////////

// exports.downloadThumbnail = (url) => {
//     options = {
//         url: 'http://someurl.com/image2.jpg',
//         dest: '/path/to/dest/photo.jpg', // will be saved to /path/to/dest/photo.jpg
//     };

//     imageDownloader
//         .image(options)
//         .then(({ filename }) => {
//             console.log('Saved to', filename); // saved to /path/to/dest/photo.jpg
//         })
//         .catch((err) => console.error(err));
// };
////////////////////////////////////////////////////////////////////////////////////
// const findIndexOfItem = (parentItemID, e, avType) => {
//     let indexSelected;
//     var g = parentItemID;
//     for (var i = 0, len = g.children.length; i < len; i++) {
//         (function(index) {
//             g.children[i].onclick = function() {
//                 // alert(index);
//                 // console.log(index);
//                 // indexSelected = index;
//                 itemIndex = index;

//                 // if (e.target.className === 'fas fa-cog')
//                 //     console.log(`you clicked the ${indexSelected} cog`);
//                 // if (
//                 //     e.target.className === 'far fa-folder-open' &&
//                 //     avType == 'video'
//                 // ) {
//                 //     console.log(`you clicked the ${indexSelected} folder`);
//                 //     // shell.showItemInFolder(fileController.dirVideoPath);
//                 //     shell.openPath(fileController.dirVideoPath);
//                 //     // shell.showItemInFolder(
//                 //     //     `C:\\Users\\Tommy\\Documents\\Warp Downloader\\Video\\Just Go With It Meet the wife HD CLIP.mp4`
//                 //     // );
//                 // }
//             };
//         })(i);
//     }
// };

// const findItemInStorages = (avType, index) => {
//     console.log();
// }
////////////////////////////////////////////////////////////////////////////////////

// const findIndexOfItem = (parentItemID, e, avType) => {
//     let indexSelected;
//     var g = parentItemID;
//     for (var i = 0, len = g.children.length; i < len; i++) {
//         (function(index) {
//             g.children[i].onclick = function() {
//                 // alert(index);
//                 // console.log(index);
//                 // indexSelected = index;
//                 itemIndex = index;

//                 // if (e.target.className === 'fas fa-cog')
//                 //     console.log(`you clicked the ${indexSelected} cog`);
//                 // if (
//                 //     e.target.className === 'far fa-folder-open' &&
//                 //     avType == 'video'
//                 // ) {
//                 //     console.log(`you clicked the ${indexSelected} folder`);
//                 //     // shell.showItemInFolder(fileController.dirVideoPath);
//                 //     shell.openPath(fileController.dirVideoPath);
//                 //     // shell.showItemInFolder(
//                 //     //     `C:\\Users\\Tommy\\Documents\\Warp Downloader\\Video\\Just Go With It Meet the wife HD CLIP.mp4`
//                 //     // );
//                 // }
//             };
//         })(i);
//     }
// };

// const findItemInStorages = (avType, index) => {
//     console.log();
// }
////////////////////////////////////////////////////////////////////////////////////
// function GetIndex(sender) {
//     var aElements = sender.parentNode.parentNode.getElementsByTagName(
//         'a'
//     );
//     var aElementsLength = aElements.length;

//     var index;
//     for (var i = 0; i < aElementsLength; i++) {
//         if (aElements[i] == sender) {
//             //this condition is never true
//             index = i;
//             return index;
//         }
//     }
// }
////////////////////////// Download lists listeners///////////////////////////////////
// audio
// // SCENARIO 3
// else if (
//     e.target.parentNode.parentNode.parentNode.childNodes[0].id
//     .length === 36
// ) {
//     // console.log('scenario 3');
//     itemID = e.target.parentNode.parentNode.parentNode.childNodes[0].id;
// }
// // SCENARIO 4
// else if (
//     e.target.parentNode.parentNode.childNodes[0].id.length === 36
// ) {
//     // console.log('scenario 4');
//     itemID = e.target.parentNode.parentNode.childNodes[0].id;
// }
// video
// // SCENARIO 3
// else if (
//     e.target.parentNode.parentNode.parentNode.childNodes[0].id
//     .length === 36
// ) {
//     // console.log('scenario 3');
//     itemID = e.target.parentNode.parentNode.parentNode.childNodes[0].id;
// }
// // SCENARIO 4
// else if (
//     e.target.parentNode.parentNode.childNodes[0].id.length === 36
// ) {
//     // console.log('scenario 4');
//     itemID = e.target.parentNode.parentNode.childNodes[0].id;
// }