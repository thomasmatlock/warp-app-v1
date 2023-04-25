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
