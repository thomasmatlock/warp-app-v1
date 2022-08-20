export default function getVideoFormat(desiredQuality, formats: Array<any>) {
  console.log('DESIRED QUALITY', desiredQuality);
  let matchedFormat;
  // RETURNS BEST QUALITY
  formats.forEach((format) => {
    console.log(format.qualityLabel);

    if (
      format.qualityLabel.toLowerCase().includes(desiredQuality.toLowerCase())
    ) {
      matchedFormat = format;
      console.log('MATCHED A FORMAT');

      // console.log(matchedFormat);
      return matchedFormat;
    } else {
      // matchedFormat = formats[2];
      // return matchedFormat;
    }
  });
  if (matchedFormat === undefined) {
    matchedFormat = formats[2];
    return matchedFormat;
  }

  return matchedFormat;
}
