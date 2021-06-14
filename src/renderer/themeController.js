let elements = require('./views/elements');
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
    let backgroundColors = document.getElementsByClassName("themeBackground");
    console.log(theme);
    if (theme === 'light') {
        loopThroughArray(backgroundColors, 'white');
    }
    if (theme === 'dark') {
        loopThroughArray(backgroundColors, '#1f2029');
    }
};


const loopThroughArray = (arr, color) => {
    console.log(color);
    for (let i = 0; i < arr.length; i++) {
        arr[i].style.background = color;
    }
};

module.exports = {
    setTheme: setTheme,
    discoverTheme: discoverTheme,
}