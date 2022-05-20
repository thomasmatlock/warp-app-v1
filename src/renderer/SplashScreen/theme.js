   // 16 shades of gray
   // #0E0F0F
   // #202020
   // #313131
   // #434243
   // #545254
   // #656465
   // #757575
   // #868786
   // #979798
   // #A8A7A8
   // #B8BAB8
   // #CACACA
   // #DBDCDB
   // #ECECEC
   // #ffffff
   // #2A2A2A
   // #3B3B3B
   let randomTheme = Math.round(Math.random());
   let theme = randomTheme === 0 ? 'dark' : 'light';
   //    let theme = 'dark';
   let backgroundColor = theme === 'light' ? '#ECECEC ' : '#000';
   let textColor = theme === 'light' ? '#000' : '#fff';

   document.getElementById('body').style.background = backgroundColor;
   document.getElementById('version').style.color = textColor;
   document.getElementById('status1').style.color = textColor;
   document.getElementById('status2').style.color = textColor;
   document.getElementById('status3').style.color = textColor;
   document.getElementById('legal').style.color = textColor;

   if (theme === 'dark') document.getElementById('app-title').classList.add('glowing');
   if (theme === 'dark') document.getElementById('app-title').classList.remove('coloredGradientText');