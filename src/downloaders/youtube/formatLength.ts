export default function formatLength(approxDurationMs) {
  console.log('formatLength');
  //    itemInfo.secs = Math.round(approxDurationMs / 1000); // returns video length in itemInfo.secs, rounded
  //    itemInfo.mins = (itemInfo.secs / 60).toFixed(1); // returns minutes with one decimal, ie, 3.4 mins long
  //    itemInfo.lengthFormatted = Math.floor(itemInfo.mins);
  //    // 1- Convert to itemInfo.secs:
  //    // var itemInfo.secs = approxDurationMs / 1000;
  //    // 2- Extract hours:
  //    itemInfo.hrs = parseInt(itemInfo.secs / 3600); // 3,600 itemInfo.secs in 1 hour
  //    itemInfo.secs = itemInfo.secs % 3600; // itemInfo.secs remaining after extracting hours
  //    // 3- Extract minutes:
  //    itemInfo.mins = parseInt(itemInfo.secs / 60); // 60 itemInfo.secs in 1 minute
  //    // 4- Keep only itemInfo.secs not extracted to minutes:
  //    itemInfo.secs = itemInfo.secs % 60;
  //    // insert double zeros if the actual value is a single digit #FIX itemInfo to get a count on the character https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
  //    // get digit count for mins, seconds
  //    itemInfo.minsDigitCount = (itemInfo.mins + '').replace('.', '').length;
  //    itemInfo.secsDigitCount = (itemInfo.secs + '').replace('.', '').length;
  //    itemInfo.secsStr = itemInfo.secs.toString();
  //    itemInfo.minsStr = itemInfo.mins.toString();
  //    itemInfo.secsStrLength = itemInfo.secsStr.length;
  //    if ((itemInfo.minsDigitCount = 1)) itemInfo.minsStr = '0' + itemInfo.minsStr; // adds a zero to the front of the mins string

  //    if (itemInfo.secsStrLength === 1) {
  //      itemInfo.secsStr = '0' + itemInfo.secsStr; // adds a zero to the front of the secs string
  //    }

  //    itemInfo.lengthFormatted = `${itemInfo.hrs}:${itemInfo.minsStr}:${itemInfo.secsStr}`;
}
