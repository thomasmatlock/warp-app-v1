export default function getAudioFormat(desiredQuality, formats) {
  let matchedFormat;
  // RETURNS BEST QUALITY
  if (desiredQuality.toLowerCase().includes('best')) {
    formats.forEach((format) => {
      if (format.audioQuality.toLowerCase().includes('high')) {
        matchedFormat = format;
        return matchedFormat;
      } else if (format.audioQuality.toLowerCase().includes('medium')) {
        matchedFormat = format;
        return matchedFormat;
      } else if (format.audioQuality.toLowerCase().includes('low')) {
        matchedFormat = format;
        return matchedFormat;
      }
    });
    // RETURNS HIGH QUALITY
  } else if (desiredQuality.toLowerCase().includes('high')) {
    formats.forEach((format) => {
      if (format.audioQuality.toLowerCase().includes('high')) {
        matchedFormat = format;
        return matchedFormat;
      }
    });
    // RETURNS MEDIUM QUALITY
  } else if (desiredQuality.toLowerCase().includes('medium')) {
    formats.forEach((format) => {
      if (format.audioQuality.toLowerCase().includes('medium')) {
        matchedFormat = format;
        return matchedFormat;
      }
    });
    // RETURNS LOW QUALITY
  } else if (desiredQuality.toLowerCase().includes('low')) {
    formats.forEach((format) => {
      if (format.audioQuality.toLowerCase().includes('low')) {
        matchedFormat = format;
        return matchedFormat;
      }
    });
  }
  return matchedFormat;
}
