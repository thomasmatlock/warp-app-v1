import getAudioQuality from './getAudioQuality';
import getVideoQuality from './getVideoQuality';
export default function getQuality(mode, desiredQuality, formats) {
  let availableAudioFormats: Array<any> = [];
  let availableVideoFormats: Array<any> = [];
  let matchedFormat;

  formats.forEach((format) => {
    if (format.mimeType.includes('audio')) {
      availableAudioFormats.push(format);
    }
    if (format.mimeType.includes('video')) {
      availableVideoFormats.push(format);
    }
  });
  if (mode.includes('audio')) {
    matchedFormat = getAudioQuality(desiredQuality, availableAudioFormats);
    console.log(matchedFormat);
  }
  if (mode.includes('video')) {
    matchedFormat = getVideoQuality(desiredQuality, availableVideoFormats);
    console.log(matchedFormat);
  }
  return matchedFormat;
}
