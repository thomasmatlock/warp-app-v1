import { useState, useEffect, useContext } from 'react';
import styles from './ProductCheckoutInputFields.module.scss';
import CheckoutContext from '../../../../store/checkoutContext';

// import * strings from './ProductCheckoutInputField.strings.json';
import {
  validateEmail,
  validateCreditCard,
  validateCreditCardType,
  validateExpirationDate,
  validateNameOnCard,
  validateZipCode,
  validateCVV,
} from '../../../../main/util/strings';

type Props = {
  type: string;
  label: string;
  placeholder: string;
};
export default function ProductCheckoutInputField(props: any) {
  const checkoutCtx = useContext(CheckoutContext);

  // PROPS DESTRUCTURING
  const { type, label, placeholder } = props.data;
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

  const changeHandler = (e: any) => {
    if (e.target.value.length > 0) {
      if (isEmailType) {
        checkoutCtx.setIsValidEmail(validateEmail(e.target.value));
        setIsInputValid(validateEmail(e.target.value));
      }
      if (isCreditCardType) {
        setIsInputValid(validateCreditCard(e.target.value));
        checkoutCtx.setIsValidCardNumber(validateCreditCard(e.target.value));
      }
      if (isExpirationDateType) {
        setIsInputValid(validateExpirationDate(e.target.value));
        checkoutCtx.setIsValidExpirationDate(
          validateExpirationDate(e.target.value)
        );
      }
      if (isCvvType) {
        setIsInputValid(validateCVV(e.target.value));
        checkoutCtx.setIsValidCVV(validateCVV(e.target.value));
      }
      if (isNameOnCardType) {
        setIsInputValid(validateNameOnCard(e.target.value));
        checkoutCtx.setIsValidNameOnCard(validateNameOnCard(e.target.value));
      }
      if (isZipCodeType) {
        setIsInputValid(validateZipCode(e.target.value));
        checkoutCtx.setIsValidZipCode(validateZipCode(e.target.value));
      }
    }
  };
  const [fieldStyle, setFieldStyle] = useState(
    isCreditCardType ? styles.field__credit_card : styles.field
  );
  const [inputStyle, setInputStyle] = useState(styles.field_input);

  useEffect(() => {
    if (isCreditCardType) {
      setFieldStyle(styles.field__credit_card);
      setInputStyle(styles.field_input__credit_card);
    } else if (isCvvType) {
      setFieldStyle(styles.field__cvv);
      setInputStyle(styles.field_input__cvv);
    } else if (isExpirationDateType) {
      setFieldStyle(styles.field__expiration_date);
      setInputStyle(styles.field_input__expiration_date);
    }
  }, [isCreditCardType, isExpirationDateType, isCvvType]);
  return (
    // <div className={styles.field}>
    <div className={fieldStyle}>
      <input
        className={inputStyle}
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
    </div>
  );
}
