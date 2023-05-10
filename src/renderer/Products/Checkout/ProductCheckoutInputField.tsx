import { useFormik } from 'formik';
import { useState } from 'react';
import styles from './ProductCheckoutInputField.module.scss';
// import * strings from './ProductCheckoutInputField.strings.json';
import {
  validateEmail,
  validateCreditCard,
  validateCreditCardType,
  validateExpirationDate,
  validateNameOnCard,
  validateZipCode,
  validateCVV,
} from '../../../main/util/strings';
// TYPES
// type: 'email',
// type: 'creditCard',
// type: 'expirationDate',
// type: 'cvv',
// type: 'nameOnCard',
// type: 'zipCode',
export default function ProductCheckoutInputField(props: any) {
  // PROPS DESTRUCTURING
  const { expanded, type, label, placeholder } = props.data;
  //
  const [isInputValid, setIsInputValid] = useState(true);
  // TYPES //////////////////////////////
  const [isEmailType, setIsEmailType] = useState(type === 'email');
  const [isCreditCardType, setIsCreditCardType] = useState(
    type === 'creditCard'
  );
  const [isExpirationDateType, setIsExpirationDateType] = useState(
    type === 'expirationDate'
  );
  const [isCvvType, setIsCvvType] = useState(type === 'cvv');
  const [isNameOnCardType, setIsNameOnCardType] = useState(
    type === 'nameOnCard'
  );
  const [isZipCodeType, setIsZipCodeType] = useState(type === 'zipCode');
  // VALID TYPES
  // const [isInputValidEmail, setisInputValidEmail] = useState(false);
  // const [isInputValidCreditCard, setisInputValidCreditCard] = useState(false);
  // const [isInputValidExpirationDate, setisInputValidExpirationDate] =
  //   useState(false);
  // const [isInputValidCVV, setisInputValidCVV] = useState(false);
  // const [isInputValidNameOnCard, setisInputValidNameOnCard] = useState(false);
  // const [isInputValidZipCode, setisInputValidZipCode] = useState(false);
  // const [isVisaCard, setIsVisaCard] = useState(false);
  // const [isMasterCard, setIsMasterCard] = useState(false);
  // const [isAmexCard, setIsAmexCard] = useState(false);
  // const [isDiscoverCard, setIsDiscoverCard] = useState(false);
  // let inputClass = isInputValid ? styles.field_input : styles.field_input;
  const changeHandler = (e: any) => {
    if (e.target.value.length > 0) {
      if (isEmailType) setIsInputValid(validateEmail(e.target.value));
      if (isCreditCardType) setIsInputValid(validateCreditCard(e.target.value));
      if (isExpirationDateType)
        setIsInputValid(validateExpirationDate(e.target.value));
      if (isCvvType) setIsInputValid(validateCVV(e.target.value));
      if (isNameOnCardType) setIsInputValid(validateNameOnCard(e.target.value));
      if (isZipCodeType) setIsInputValid(validateZipCode(e.target.value));
    }
  };

  return (
    <>
      <input
        className={styles.field_input}
        style={isInputValid ? {} : { border: '1px solid red' }}
        type="text"
        onChange={changeHandler}
        placeholder={placeholder}
      />
      {/* <label
        // id="search__input__label"
        className={styles.field_label}
        // htmlFor="search__input"
        >
        {label}
      </label> */}
    </>
  );
}
