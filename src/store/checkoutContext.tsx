import React, { useState, useEffect, createContext } from 'react';

const CheckoutContext = createContext({
  email: '',
  cardNumber: '',
  expirationDate: '',
  cvv: '',
  nameOnCard: '',
  zipCode: '',
  setEmail: (email: string) => {},
  setCardNumber: (cardNumber: string) => {},
  setExpirationDate: (expirationDate: string) => {},
  setCVV: (cvv: string) => {},
  setNameOnCard: (nameOnCard: string) => {},
  setZipCode: (zipCode: string) => {},

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
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [zipCode, setZipCode] = useState('');
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
  type SubmitDataProps = {
    id: string;
  };
  const submitForm = (id: string) => {
    // const { id } = data;
    console.log(
      id,
      email,
      cardNumber,
      expirationDate,
      cvv,
      nameOnCard,
      zipCode
    );

    if (isSubmittable) {
      setIsSubmitted(true);
      console.log('submitting payment for ', id);
    }

    if (!isSubmittable)
      console.log('cant submit payment, all fields are not valid for ', id);
  };
  return (
    <CheckoutContext.Provider
      value={{
        email,
        cardNumber,
        expirationDate,
        cvv,
        nameOnCard,
        zipCode,

        setEmail,
        setCardNumber,
        setExpirationDate,
        setCVV,
        setNameOnCard,
        setZipCode,

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
