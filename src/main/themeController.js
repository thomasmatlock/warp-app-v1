// https://www.electronjs.org/docs/latest/api/system-preferences
// https://www.electronjs.org/docs/latest/api/native-theme
const { systemPreferences, nativeTheme } = require('electron')
const discoverSystemTheme = () => {
    // nativeTheme.themeSource = 'dark';
    // console.log(`System theme dark mode is ${nativeTheme.shouldUseDarkColors}`);
    // console.log(`System theme is '${nativeTheme.themeSource}'`); // light mode is 'system', dark mode is dark
    return nativeTheme.shouldUseDarkColors;
}
const setTheme = (theme) => {
    // console.log(nativeTheme.shouldUseDarkColors);
}
module.exports = { discoverSystemTheme }