export default function getVideoFormat(desiredQuality, formats: Array<any>) {
  console.log(desiredQuality);

  formats.forEach((format) => {
    console.log(format.qualityLabel);
  });
}
