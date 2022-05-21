   let randomTheme = Math.round(Math.random());
   const themeStyle = randomTheme === 0 ? 'dark' : 'light';
   //    let theme = 'dark';
   const backgroundColor = themeStyle === 'light' ? '#ECECEC ' : '#000';
   const textColor = themeStyle === 'light' ? '#000' : '#fff';
   // const theme = {
   //     //  randomTheme: Math.round(Math.random()),
   //     style: randomTheme === 0 ? 'dark' : 'light',
   //     backgroundColor: this.style === 'light' ? '#ECECEC ' : '#000',
   //     textColor: this.style === 'light' ? '#000' : '#fff',
   // }
   document.getElementById('body').style.background = backgroundColor;
   document.getElementById('version').style.color = textColor;
   document.getElementById('legal').style.color = textColor;

   if (themeStyle === 'dark') document.getElementById('app-title').classList.add('glowing');
   if (themeStyle === 'dark') document.getElementById('app-title').classList.remove('coloredGradientText');

   module.exports = { themeStyle, backgroundColor, textColor };

   // module.exports = theme;