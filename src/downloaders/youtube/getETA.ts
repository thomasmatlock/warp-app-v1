export default function getETA(
  beginTime: number,
  currentTime: number,
  speed: number
) {
  // console.log('speed', speed);

  const elapsed = currentTime - beginTime;
  const remaining = (elapsed / speed) * (1 - speed);
  const eta = Math.round(remaining / 1000);
  // console.log(eta);

  return eta;
}
