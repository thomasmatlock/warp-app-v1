// const { app, BrowserWindow } = require('electron');
const elementsAudio = {
    // Nav A
    nav_A: document.querySelector('.nav_A'),
    nav_A_button: document.querySelector('.nav_A-tab'),
    nav_A_buttonArr: document.querySelectorAll('.nav_A-tab'),
    // nav_A_active: document.getElementById('nav_A_audio'),
    nav_A_audio: document.getElementById('nav_A_audio'),
    nav_A_warpstagram: document.getElementById('nav_A_warpstagram'),
    // Nav B
    nav_B: document.querySelector('.nav_B'),
    nav_B_button: document.querySelector('.nav_B_button'),
    nav_B_buttonArr: document.querySelectorAll('.nav_B_button'),
    nav_B_audio: document.querySelector('.nav_B_audio'),
    nav_B__main: document.querySelector('.nav_B__main'),
    nav_B__minor: document.querySelector('.nav_B__minor'),

    // Nav B audio
    nav_B_button_audio_paste: document.querySelector(
        '.nav_B_button_audio_paste'
    ),
    nav_B_button_audio_modalBackground: document.querySelector(
        '.modalBackground'
    ),
    nav_B_button_audio_activate: document.querySelector(
        '.nav_B_button_audio_activate'
    ),
    nav_B_button_audio_preferences: document.querySelector(
        '.nav_B_button_audio_preferences'
    ),
    nav_B_button_audio_help: document.querySelector('.nav_B_button_audio_help'),
    // Modal
    modalBackground: document.querySelector('.modalBackground'),
    modalContainer: document.querySelector('.modalContainer'),

    // Download lists
    download__list: document.querySelector('.download__list'),
    download__list_audio: document.querySelector('.download__list_audio'), // audio list selected by class
    download__list_audio_ID: document.getElementById('download__list_audio_ID'), // // ID of audio list
    // Download list items
    dl__item_audio: document.getElementsByClassName('dl__item_audio'),
};
module.exports = elementsAudio;