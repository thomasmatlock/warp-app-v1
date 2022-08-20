import getAudioQuality from './getAudioQuality';
import getVideoQuality from './getVideoQuality';
export default function getQuality(mode, desiredQuality, formats) {
  let availableAudioFormats: Array<any> = [];
  let availableVideoFormats: Array<any> = [];

  formats.forEach((format) => {
    if (format.mimeType.includes('audio')) {
      availableAudioFormats.push(format);
    }
    if (format.mimeType.includes('video')) {
      availableVideoFormats.push(format);
    }
  });
  if (mode.includes('audio')) {
    let matchedFormat = getAudioQuality(desiredQuality, availableAudioFormats);
    console.log(matchedFormat);
  }
  if (mode.includes('video')) {
    let matchedFormat = getVideoQuality(desiredQuality, availableVideoFormats);
  }
}
