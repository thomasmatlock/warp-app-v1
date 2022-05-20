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
   let theme = 'dark';
   let backgroundColor = theme === 'light' ? '#ECECEC ' : '#0E0F0F';
   let textColor = theme === 'light' ? '#0E0F0F' : '#ECECEC';

   document.getElementById('body').style.background = backgroundColor;
   document.getElementById('version').style.color = textColor;
   document.getElementById('status').style.color = textColor;
   document.getElementById('legal').style.color = textColor;