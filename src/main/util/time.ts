export function convertToSeconds(timeString: string) {
  // console.log(timeString);

  // let timeString = '00:00:00';
  const timeArray = timeString.split(':');
  let seconds = 0;
  for (let i = 0; i < timeArray.length; i++) {
    seconds += parseInt(timeArray[i]) * Math.pow(60, timeArray.length - 1 - i);
  }
  // console.log(seconds, 'seconds');
  return seconds;
}

export function isTimestampInLast24Hours(timestamp: string) {
  const now = new Date().getTime();
  const yesterday = now - 86400000;
  const timestampDate = new Date(timestamp).getTime();
  if (timestampDate > yesterday) {
    return true;
  }
  return false;
}
export function Test() {
  console.log('Test');
}
