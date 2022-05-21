   let randomTheme = Math.round(Math.random());
   const themeStyle = randomTheme === 0 ? 'dark' : 'light';
   //    let theme = 'dark';
   const backgroundColor = themeStyle === 'light' ? '#ECECEC ' : '#000';
   const textColor = themeStyle === 'light' ? '#000' : '#fff';
   document.getElementById('body').style.background = backgroundColor;
   document.getElementById('version').style.color = textColor;
   document.getElementById('legal').style.color = textColor;

   if (themeStyle === 'dark') document.getElementById('app-title').classList.add('glowing');
   if (themeStyle === 'dark') document.getElementById('app-title').classList.remove('coloredGradientText');

   const theme = {
           style: themeStyle,
           backgroundColor: backgroundColor,
           textColor: textColor,
       }
       // module.exports = { theme, themeStyle, backgroundColor, textColor };

   module.exports = theme;