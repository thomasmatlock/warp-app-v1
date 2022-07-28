let elements = require('./views/elements');
let themeColors = require('./themeColors');
const discoverTheme = (storage) => {
    // general_theme_dark
    // general_theme_light
    let prefs = storage.user.prefs;
    // console.log(prefs);
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
    let download__list_itemArr = document.getElementsByClassName("dl__item");
    let nav_B__child = document.getElementsByClassName("nav_B__child");
    let background = document.getElementsByClassName("themeSecondary");
    let nav_A_tabArr = document.getElementsByClassName("nav_A_tab");
    let nav_A_tab__active = document.getElementsByClassName("nav_A_tab__active");
    let nav_B_buttonArr = document.getElementsByClassName("nav_B_button");
    let nav_B_icon = document.getElementsByClassName("nav_B_icon");
    let nav_B_text = document.getElementsByClassName("navBTextColor");
    let dl__item__data__property_titleArr = document.getElementsByClassName("dl__item__data__property_title");
    let dl__item__data__propertyArr = document.getElementsByClassName("dl__item__data__property");



    setBackgroundColor(nav_A_tabArr, themeColors[theme].navBbackground);
    setColor(nav_A_tabArr, themeColors[theme].navBTextColor);
    setBackgroundImage(nav_A_tab__active, themeColors[theme].navAButton_active);

    setBackgroundColor(content_slide, themeColors[theme].primary);
    setBackgroundColor(background, themeColors[theme].secondary);

    setBackgroundColor(nav_B_buttonArr, themeColors[theme].navBbackground);
    setBackgroundColor(nav_B__child, themeColors[theme].primary);
    setColor(nav_B_icon, themeColors[theme].navBTextColor);
    setColor(nav_B_text, themeColors[theme].navBTextColor);

    setBackgroundColor(download__list, themeColors[theme].primary);
    setBackgroundColor(download__list_itemArr, themeColors[theme].downloadItemBackgroundColorAlt);

    setColor(dl__item__data__property_titleArr, themeColors[theme].navBTextColor);
    setColor(dl__item__data__propertyArr, themeColors[theme].downloadItemText_hover);
};


const setBackgroundColor = (arr, color) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.background = color;
    }
};
const setBackgroundImage = (arr, color) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.backgroundImage = color;
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