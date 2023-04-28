export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const capitalizeFirstLetterOfEachWord = (string: string) => {
  return string.replace(/\b[a-z]/g, (char) => {
    return char.toUpperCase();
  });
};
