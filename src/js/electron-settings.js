// const electron = require('electron');
// const settings = require('electron-settings');

// console.log('File used for Persisting Data - ' + settings.file());

// var sample = document.getElementById('sample');
// var submit = document.getElementById('submit');

// settings.get('key.data').then((value) => {
//     console.log('Persisted Value - ' + value);
// });

// settings.has('key1.data').then((bool) => {
//     console.log('Checking if key1.data Exists - ' + bool);
// });

// submit.addEventListener('click', () => {
//     console.log('Sample Text Entered - ' + sample.value);
//     console.log('Persisting Data in electron-settings');

//     settings.set('key', {
//         data: sample.value,
//     });
// });