   let randomTheme = Math.round(Math.random());
   const theme = randomTheme === 0 ? 'dark' : 'light';
   //    let theme = 'dark';
   const backgroundColor = theme === 'light' ? '#ECECEC ' : '#000';
   const textColor = theme === 'light' ? '#000' : '#fff';

   document.getElementById('body').style.background = backgroundColor;
   document.getElementById('version').style.color = textColor;
   document.getElementById('status1').style.color = textColor;
   document.getElementById('status2').style.color = textColor;
   document.getElementById('status3').style.color = textColor;
   document.getElementById('legal').style.color = textColor;

   if (theme === 'dark') document.getElementById('app-title').classList.add('glowing');
   if (theme === 'dark') document.getElementById('app-title').classList.remove('coloredGradientText');

   module.exports = { theme, backgroundColor, textColor };