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
export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateCreditCard = (creditCard: string) => {
  console.log(creditCard, creditCard.length);
  const re = /^[0-9]{16}$/;
  return re.test(creditCard);
};
export const validateCreditCardType = (creditCard: string) => {
  // console.log(creditCard, creditCard.length);

  const testVisa = '406011111111111111';
  const testAmex = '378282246310005';
  const testMastercard = '5105105105105100';
  const testDiscover = '6011111111111117';
  // return true;
  // const re = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/; // this is for visa
  // const re = /^(?:3[47][0-9]{13})$/; // this is for amex
  // const re = /^(?:5[1-5][0-9]{14})$/; // this is for mastercard
  const re = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/; // this is for discover
  return re.test(creditCard);
};
