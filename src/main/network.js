   const isOnline = () => {
       // https://stackoverflow.com/questions/15270902/check-for-internet-connectivity-in-nodejs
       require('dns').resolve('www.google.com', function(err) {
           if (err) {
               console.log('App is OFFLINE');
               return true;
           } else {
               //    console.log('App is online');
           }

       });
   };

   exports.isOnline = isOnline;