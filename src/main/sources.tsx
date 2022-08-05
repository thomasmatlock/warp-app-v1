const Store = require('electron-store');

export const sources = new Store();
sources.set('sources', [
  { name: 'facebook', url: 'https://www.facebook.com', active: false },
  { name: 'pinterest', url: 'https://www.pinterest.com', active: false },
  { name: 'soundcloud', url: 'https://www.soundcloud.com', active: false },
  { name: 'tiktok', url: 'https://www.tiktok.com', active: false },
  { name: 'twitter', url: 'https://www.twitter.com', active: false },
  { name: 'youtube', url: 'https://www.youtube.com', active: true },
]);
// export const clearActive = () => {
//   let arr = sources.get('sources');
//   arr.forEach((item) => {
//     item.active = false;
//   });
//   sources.set('sources', arr);
// };
// export  {sources, clearActive} ;
