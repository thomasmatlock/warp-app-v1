import * as EmailValidator from 'email-validator';

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

export const validateExpirationDate = (expirationDate: string) => {
  // MONTH VALIDATION
  const monthCharacters = expirationDate.slice(0, 2);
  const monthCharactersAsNumber = Number(monthCharacters);
  // get the characters of the current month
  const currentMonth = new Date().getMonth() + 1;
  // if the month is less than the current month, return false
  if (monthCharactersAsNumber < currentMonth) {
    return false;
  }
  // YEAR VALIDATION
  // get the last 2 characters of the expiration date
  const yearCharacters = expirationDate.slice(-2);
  const yearCharactersAsNumber = Number(yearCharacters);
  const currentYear = new Date().getFullYear();
  // get the last 2 characters of the current year
  const currentYearLast2Characters = currentYear.toString().slice(-2);
  const currentYearLast2CharactersAsNumber = Number(currentYearLast2Characters);
  // if the year is less than the current year, return false
  if (yearCharactersAsNumber < currentYearLast2CharactersAsNumber) {
    return false;
  }

  const re = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  return re.test(expirationDate);
};
export const validateCVV = (cvv: string) => {
  const re = /^[0-9]{3,4}$/;
  return re.test(cvv);
};
export const validateEmail = (email: string) => {
  // // result cannot have invalid domain
  // const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // // const re =
  // // /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  // return re.test(email);
  return EmailValidator.validate(email);
};
export const validateNameOnCard = (nameOnCard: string) => {
  // NEED 2 STRINGS SEPARATED BY A SPACE

  const re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return re.test(nameOnCard);
};
export const validateZipCode = (zipCode: string) => {
  const re = /^[0-9]{5}(?:-[0-9]{4})?$/;
  return re.test(zipCode);
};

export const validateCreditCard = (creditCard: string) => {
  // console.log(creditCard, creditCard.length);
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
  if (creditCard.length === 16) {
    if (creditCard[0] === '4') {
      return true;
    }
    if (creditCard[0] === '5') {
      return true;
    }
    if (creditCard[0] === '6') {
      return true;
    }
  }
};
