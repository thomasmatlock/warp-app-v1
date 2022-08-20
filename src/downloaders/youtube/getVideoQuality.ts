export default function getVideoFormat(desiredQuality, formats: Array<any>) {
  console.log(desiredQuality);
  let matchedFormat;
  formats.forEach((format) => {
    // console.log(format.qualityLabel);

    if (
      format.qualityLabel.toLowerCase().includes(desiredQuality.toLowerCase())
    ) {
      matchedFormat = format;
      console.log(matchedFormat);

      return matchedFormat;
    }
  });
  return matchedFormat;
}
