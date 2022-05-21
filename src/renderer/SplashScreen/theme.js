   let randomTheme = Math.round(Math.random());
   let themeStyle = randomTheme === 0 ? 'dark' : 'light'; // DEFAULT
   themeStyle = 'dark';
   themeStyle = 'light';
   const backgroundColor = themeStyle === 'light' ? '#ECECEC ' : '#000';
   const textColor = themeStyle === 'light' ? '#000' : '#fff';
   document.getElementById('body').style.background = backgroundColor;
   document.getElementById('version').style.color = textColor;
   document.getElementById('legal').style.color = textColor;

   // DARK THEME
   if (themeStyle === 'dark') document.getElementById('app-title3').classList.add('glowing');
   if (themeStyle === 'dark') document.getElementById('app-title2').classList.add('glitchDark');
   if (themeStyle === 'dark') document.getElementById('app-title').classList.remove('coloredGradientText');
   if (themeStyle === 'dark') document.getElementById('app-title2').classList.remove('coloredGradientText');
   if (themeStyle === 'dark') document.getElementById('app-title3').classList.remove('coloredGradientText');
   // LIGHT THEME
   //    if (themeStyle != 'dark') document.getElementById('app-title3').classList.remove('glitchDark');
   //    if (themeStyle != 'dark') document.getElementById('app-title2').classList.remove('glitchDark');
   //    if (themeStyle != 'dark') document.getElementById('app-title2').classList.add('glitchLight');
   //    if (themeStyle != 'dark') document.getElementById('app-title1').classList.remove('coloredGradientText');
   //    if (themeStyle != 'dark') document.getElementById('app-title2').classList.remove('coloredGradientText');
   //    if (themeStyle != 'dark') document.getElementById('app-title3').classList.remove('coloredGradientText');

   const theme = {
           style: themeStyle,
           backgroundColor: backgroundColor,
           textColor: textColor,
       }
       // module.exports = { theme, themeStyle, backgroundColor, textColor };

   module.exports = theme;