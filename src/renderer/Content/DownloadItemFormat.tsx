import iconSourceFacebook from '../ActionBar/assets/facebook.svg';
import iconSourceInstagram from '../ActionBar/assets/instagram.svg';
import iconSourcePinterest from '../ActionBar/assets/pinterest.svg';
import iconSourceSoundcloud from '../ActionBar/assets/soundcloud.svg';
import iconSourceSnapchat from '../ActionBar/assets/snapchat.svg';
import iconSourceTiktok from '../ActionBar/assets/tiktok.svg';
import iconSourceTwitch from '../ActionBar/assets/twitch.svg';
import iconSourceTwitter from '../ActionBar/assets/twitter.svg';
import iconSourceVimeo from '../ActionBar/assets/vimeo.svg';
import iconSourceYoutube from '../ActionBar/assets/youtube.svg';
function capitalizeFirstLetter(string) {
  if (string != undefined) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
function findSourceIcon(source) {
  // console.log(source);
  if (source.toLowerCase().includes('facebook')) {
    return iconSourceFacebook;
  }
  if (source.toLowerCase().includes('instagram')) {
    return iconSourceInstagram;
  }
  if (source.toLowerCase().includes('pinterest')) {
    return iconSourcePinterest;
  }
  if (source.toLowerCase().includes('soundcloud')) {
    return iconSourceSoundcloud;
  }
  if (source.toLowerCase().includes('snapchat')) {
    return iconSourceSnapchat;
  }
  if (source.toLowerCase().includes('tiktok')) {
    return iconSourceTiktok;
  }
  if (source.toLowerCase().includes('twitch')) {
    return iconSourceTwitch;
  }
  if (source.toLowerCase().includes('twitter')) {
    return iconSourceTwitter;
  }
  if (source.toLowerCase().includes('vimeo')) {
    return iconSourceVimeo;
  }
  if (source.toLowerCase().includes('youtube')) {
    return iconSourceYoutube;
  }
}
// DATE STRING FORMATTING
function convertDayToWeekday(date) {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return `${weekday[date.getDay()]}`;
}
function convertMonthToMonthName(date) {
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  // console.log(date.getMonth());

  //   itemMonth = `${month[date.getMonth()]}`;
  return `${month[date.getMonth()]}`;
}
function convertDateToDate(date) {
  //   itemDate = `${date.getDate()}`;
  return `${date.getDate()}`;
}
function formatDate(date) {
  // console.log(date);
  let itemMonth;
  let itemDate;
  // let itemYear = date.getFullYear();
  let itemYear;
  let itemDay;
  let itemHour;
  let itemMinute;
  // console.log(date.getHours());
  // let itemHour = date.getHours();
  // let itemMinute = date.getMinutes();
  itemMinute = itemMinute < 10 ? '0' + itemMinute : itemMinute;

  // let itemSecond = date.getSeconds();
  let itemSecond;
  let timeSuffix = itemHour >= 12 ? 'PM' : 'AM';
  itemHour = itemHour % 12;
  // itemDay = convertDayToWeekday(date);
  // itemDate = convertDateToDate(date);
  // console.log(date.getMonth());

  // itemMonth = convertMonthToMonthName(date);
  // const dateString = `${itemMonth} ${itemDate}, ${itemYear}, ${itemDay}, ${itemHour}:${itemMinute} ${timeSuffix}`;
  const dateString = `testing ${itemMonth}`;
  return dateString;
  // return date.getFullYear();
}
module.exports = {
  capitalizeFirstLetter,
  findSourceIcon,
  formatDate,
};
