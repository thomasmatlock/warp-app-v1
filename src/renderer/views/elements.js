// const { app, BrowserWindow } = require('electron');
const elements = {
    // Nav A
    nav_A: document.querySelector('.nav_A'),
    nav_A_button: document.querySelector('.nav_A-tab'),
    nav_A_buttonArr: document.querySelectorAll('.nav_A-tab'),
    nav_A_active: document.getElementById('nav_A_audio'),
    nav_A_audio: document.getElementById('nav_A_audio'),
    nav_A_video: document.getElementById('nav_A_video'),
    nav_A_warpstagram: document.getElementById('nav_A_warpstagram'),
    // Nav B
    nav_B: document.querySelector('.nav_B'),
    nav_B_button: document.querySelector('.nav_B_button'),
    nav_B_buttonArr: document.querySelectorAll('.nav_B_button'),
    nav_B_audio: document.querySelector('.nav_B_audio'),
    nav_B_video: document.querySelector('.nav_B_video'),
    nav_B__main: document.querySelector('.nav_B__main'),
    nav_B__minor: document.querySelector('.nav_B__minor'),
    nav_B_button_audio_paste: document.querySelector(
        '.nav_B_button_audio_paste'
    ),
    nav_B_button_audio_paste: document.querySelector(
        '.nav_B_button_audio_paste'
    ),
    nav_B_button_video_paste: document.querySelector(
        '.nav_B_button_video_paste'
    ),
    videoSmartMode: document.querySelector(
        '.nav_B_button-slide-video-SmartMode'
    ),

    // Download lists
    download__list: document.querySelector('.download__list'),
    download__list_audio: document.querySelector('.download__list_audio'),
    download__list_video: document.querySelector('.download__list_video'),
};
module.exports = elements;