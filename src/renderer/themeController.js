let elements = require('./views/elements');
let themeColors = require('./themeColors');
const discoverTheme = (storage) => {
    // general_theme_dark
    // general_theme_light
    let prefs = storage.user.prefs
    let theme;
    for (var key in prefs) {
        if (prefs.hasOwnProperty(key)) {
            // console.log(key + ' is ' + prefs[key]);
            if (key.includes('theme') && prefs[key]) {

                if (key.includes('light')) theme = 'light';
                if (key.includes('dark')) theme = 'dark';
            }
        }
    }
    return theme;
};
// #353746
const setTheme = (storage) => {
    let theme = discoverTheme(storage);
    let content_container = document.getElementsByClassName("content_container");
    let content_slide = document.getElementsByClassName("content_slide");
    let download__list = document.getElementsByClassName("download__list");
    let nav_B__child = document.getElementsByClassName("nav_B__child");
    let background = document.getElementsByClassName("themeSecondary");
    let nav_B_buttonArr = document.getElementsByClassName("nav_B_button");
    let nav_B_icon = document.getElementsByClassName("nav_B_icon");
    let nav_B_text = document.getElementsByClassName("navBTextColor");

    setBackgroundColor(content_container, themeColors[theme].primary);
    setBackgroundColor(content_slide, themeColors[theme].primary);
    setBackgroundColor(download__list, themeColors[theme].primary);
    setBackgroundColor(nav_B__child, themeColors[theme].primary);
    setBackgroundColor(background, themeColors[theme].secondary);
    setBackgroundColor(nav_B_buttonArr, themeColors[theme].navBbackground);
    setColor(nav_B_icon, themeColors[theme].navBTextColor);
    setColor(nav_B_text, themeColors[theme].navBTextColor);
};


const setBackgroundColor = (arr, color) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.background = color;
    }
};
const setColor = (arr, color) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.color = color;
    }
};

module.exports = {
    setTheme: setTheme,
    discoverTheme: discoverTheme,
}