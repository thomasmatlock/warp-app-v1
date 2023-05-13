import React, { useState, useEffect, createContext } from 'react';
// import data from './productsData';

const CheckoutContext = createContext({
  isValidEmail: false,
  isValidCardNumber: false,
  isValidExpirationDate: false,
  isValidCVV: false,
  isValidNameOnCard: false,
  isValidZipCode: false,
  areAllFieldsValid: false,
  isSubmittable: false,
  isSubmitted: false,

  submitForm: (product_id: string) => {},
  setIsValidEmail: (isValidEmail: boolean) => {},
  setIsValidCardNumber: (isValidCardNumber: boolean) => {},
  setIsValidExpirationDate: (isValidExpirationDate: boolean) => {},
  setIsValidCVV: (isValidCVV: boolean) => {},
  setIsValidNameOnCard: (isValidNameOnCard: boolean) => {},
  setIsValidZipCode: (isValidZipCode: boolean) => {},
  resetAllFields: () => {},
});

export function CheckoutContextProvider(props: any) {
  // const [isAudioCheckoutDev, setAudioCheckoutDev] = useState(true); // DEFAULT IS FALSE

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidCardNumber, setIsValidCardNumber] = useState(false);
  const [isValidExpirationDate, setIsValidExpirationDate] = useState(false);
  const [isValidCVV, setIsValidCVV] = useState(false);
  const [isValidNameOnCard, setIsValidNameOnCard] = useState(false);
  const [isValidZipCode, setIsValidZipCode] = useState(false);
  const [areAllFieldsValid, setAreAllFieldsValid] = useState(
    isValidEmail && isValidCardNumber && isValidExpirationDate && isValidCVV
  );
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  // console.log('SEPARATOR');
  useEffect(() => {
    setAreAllFieldsValid(
      isValidEmail && isValidCardNumber && isValidExpirationDate && isValidCVV
    );
    if (areAllFieldsValid) setIsSubmittable(true);
    if (!areAllFieldsValid) setIsSubmittable(false);
  }, [
    isValidEmail,
    isValidCardNumber,
    isValidExpirationDate,
    isValidCVV,
    areAllFieldsValid,
  ]);

  // console.log(
  //   isValidEmail,
  //   isValidCardNumber,
  //   isValidExpirationDate,
  //   isValidCVV,
  //   isValidNameOnCard,
  //   isValidZipCode
  // );
  // console.log('areAllFieldsValid', areAllFieldsValid);
  const resetAllFields = () => {
    setIsValidEmail(false);
    setIsValidCardNumber(false);
    setIsValidExpirationDate(false);
    setIsValidCVV(false);
    setIsValidNameOnCard(false);
    setIsValidZipCode(false);
    setAreAllFieldsValid(false);
    setIsSubmittable(false);
    setIsSubmitted(false);
  };
  const submitForm = (product_id: string) => {
    if (isSubmittable) {
      setIsSubmitted(true);

      console.log('submitting payment for ', product_id);
    }
    if (!isSubmittable)
      console.log(
        'cant submit payment, all fields are not valid for ',
        product_id
      );
  };
  return (
    <CheckoutContext.Provider
      value={{
        isValidEmail,
        isValidCardNumber,
        isValidExpirationDate,
        isValidCVV,
        isValidNameOnCard,
        isValidZipCode,
        areAllFieldsValid,
        isSubmittable,
        isSubmitted,
        submitForm,
        setIsValidEmail,
        setIsValidCardNumber,
        setIsValidExpirationDate,
        setIsValidCVV,
        setIsValidNameOnCard,
        setIsValidZipCode,
        resetAllFields,
      }}
    >
      {props.children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutContext;
