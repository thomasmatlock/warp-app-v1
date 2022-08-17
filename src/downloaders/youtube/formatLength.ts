export default function formatLength(approxSeconds) {
  // console.log(approxSeconds);

  let lengthFormatted;
  approxSeconds = Number(approxSeconds);
  var h = Math.floor(approxSeconds / 3600);
  var m = Math.floor((approxSeconds % 3600) / 60);
  var s = Math.floor(((approxSeconds % 3600) % 60) - 1);
  // s = s - 1;

  // var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  // var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' minutes, ') : '';
  // var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' seconds') : '';
  // var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' hours, ') : '';
  // var hDisplay = h > 0 ? (h < 10 ? h + ':' : '' + h) : '';
  var hDisplay = h > 0 ? (h < 10 ? h + ':' : '' + h + ':') : '';
  // var mDisplay = m > 0 ? m : '0';
  var mDisplay =
    h > 0
      ? m > 0
        ? m < 10
          ? '0' + m
          : m
        : ''
      : m > 0
      ? m < 10
        ? m
        : m
      : '';
  var sDisplay = s > 0 ? (s < 10 ? ':0' + s : ':' + s) : ':00';
  lengthFormatted = hDisplay + mDisplay + sDisplay;
  // console.log(h, m, s);
  // console.log( hDisplay + mDisplay + sDisplay);
  return lengthFormatted;
}
