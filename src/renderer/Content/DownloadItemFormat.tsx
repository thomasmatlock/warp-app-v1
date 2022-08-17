import iconSourceFacebook from '../../../assets/BrowserBar/facebook.svg';
import iconSourceInstagram from '../../../assets/BrowserBar/instagram.svg';
import iconSourcePinterest from '../../../assets/BrowserBar/pinterest.svg';
import iconSourceSoundcloud from '../../../assets/BrowserBar/soundcloud.svg';
import iconSourceSnapchat from '../../../assets/BrowserBar/snapchat.svg';
import iconSourceTiktok from '../../../assets/BrowserBar/tiktok.svg';
import iconSourceTwitch from '../../../assets/BrowserBar/twitch.svg';
import iconSourceTwitter from '../../../assets/BrowserBar/twitter.svg';
import iconSourceVimeo from '../../../assets/BrowserBar/vimeo.svg';
import iconSourceYoutube from '../../../assets/BrowserBar/youtube.svg';
function capitalizeFirstLetter(string) {
  if (string != undefined) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
function findSourceIcon(source) {
  // console.log(source);
  if (source.toLowerCase().includes('facebook')) {
    return iconSourceFacebook;
  } else if (source.toLowerCase().includes('instagram')) {
    return iconSourceInstagram;
  } else if (source.toLowerCase().includes('pinterest')) {
    return iconSourcePinterest;
  } else if (source.toLowerCase().includes('soundcloud')) {
    return iconSourceSoundcloud;
  } else if (source.toLowerCase().includes('snapchat')) {
    return iconSourceSnapchat;
  } else if (source.toLowerCase().includes('tiktok')) {
    return iconSourceTiktok;
  } else if (source.toLowerCase().includes('twitch')) {
    return iconSourceTwitch;
  } else if (source.toLowerCase().includes('twitter')) {
    return iconSourceTwitter;
  } else if (source.toLowerCase().includes('vimeo')) {
    return iconSourceVimeo;
  } else if (source.toLowerCase().includes('youtube')) {
    return iconSourceYoutube;
  }
}
// DATE STRING FORMATTING
function convertDayToWeekday(date) {
  var weekday = new Array(
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  );
  return `${weekday[date.getDay()]}`;
}
function convertMonthToMonthName(date) {
  var month = new Array(
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
    'December'
  );
  //   itemMonth = `${month[date.getMonth()]}`;
  return `${month[date.getMonth()]}`;
}
function convertDateToDate(date) {
  //   itemDate = `${date.getDate()}`;
  return `${date.getDate()}`;
}
function formatDate(date) {
  //   console.log(date);
  let itemMonth;
  let itemDate;
  let itemYear = date.getFullYear();
  let itemDay;
  let itemHour = date.getHours();
  let itemMinute = date.getMinutes();
  itemMinute = itemMinute < 10 ? '0' + itemMinute : itemMinute;

  let itemSecond = date.getSeconds();
  let timeSuffix = itemHour >= 12 ? 'PM' : 'AM';
  itemHour = itemHour % 12;
  itemDay = convertDayToWeekday(date);
  itemDate = convertDateToDate(date);
  itemMonth = convertMonthToMonthName(date);
  const dateString = `${itemMonth} ${itemDate}, ${itemYear}, ${itemDay}, ${itemHour}:${itemMinute} ${timeSuffix}`;
  return dateString;
}
module.exports = {
  capitalizeFirstLetter,
  findSourceIcon,
  formatDate,
};
