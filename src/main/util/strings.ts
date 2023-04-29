export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const capitalizeFirstLetterOfEachWord = (string: string) => {
  return string.replace(/\b[a-z]/g, (char) => {
    return char.toUpperCase();
  });
};
export const capitalizeAllLetters = (str: string) => {
  // split the string into an array of characters
  const strArr = str.split('');

  const capitalizedArr = strArr.map((char, index) => {
    if (index === 0) {
      return char.toUpperCase();
    }
    return char;
  });
  return capitalizedArr.join('');
};
export const stringToNumber = (str: string) => {
  return Number(str);
};

export const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 9);
};
