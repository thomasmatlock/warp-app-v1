// this is started, taken from the electron course
const fs = require('fs');
const { shell } = require('electron');

// DURING SESSION
//  handles download, persisting to state storage, and updating UI
// Build UI controller, includes type (audio video), receives arrays of download items to push for front end
// Build something like electron udemy to add item to UI

// STORAGE
// exports.storage = JSON.parse(localStorage.getItem('readit-items')) || []; // loads this back into storage from localStorage // also JSON.parse converts strings back to array

// STARTUP
// Startup, Read files
// Startup, Update UI  with read files

// ELECTRON PROJECT
// Dom nodes
// Get readerJS content
// Track items in storage
// Listen for 'done' message from reader window
// Delete item
// Get selected item index
// Persist storage
// Set item as selected
// Move to newly selected item
// Open selected item in native browser
// Open selected item
// Add new item
// Add items from storage when app loads