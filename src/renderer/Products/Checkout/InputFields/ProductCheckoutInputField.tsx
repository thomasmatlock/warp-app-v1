import { useState, useEffect, useContext } from 'react';
import styles from './ProductCheckoutInputFields.module.scss';
import CheckoutContext from '../../../../store/checkoutContext';
import visaIcon from '../../../Global/CheckoutPaymentTypes/pack1/visa.png';
import discoverIcon from '../../../Global/CheckoutPaymentTypes/pack2/discover.png';
import amexIcon from '../../../Global/CheckoutPaymentTypes/pack1/amex.png';

// import * strings from './ProductCheckoutInputField.strings.json';
import {
  validateEmail,
  validateCreditCard,
  validateExpirationDate,
  validateNameOnCard,
  validateZipCode,
  validateCVV,
} from '../../../../main/util/strings';

const creditCardType = require('credit-card-type');

const visaCards = creditCardType('4111');
// console.log(creditCardType);

// console.log(visaCards[0].type); // 'visa'

const ambiguousCards = creditCardType('6');
// console.log(ambiguousCards); // 6

// console.log(ambiguousCards.length); // 6
// console.log(ambiguousCards[0].niceType); // 'Discover'
// console.log(ambiguousCards[1]); // 'UnionPay'
// console.log(ambiguousCards[2].niceType);

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
  const [isVisaCardType, setIsVisaCardType] = useState(false);
  const [isDiscoverCardType, setIsDiscoverCardType] = useState(false);
  const [isAmexCardType, setIsAmexCardType] = useState(false);
  const [isMasterCardType, setIsMasterCardType] = useState(false);

  const changeHandler = (e: any) => {
    if (e.target.value.length === 0) {
      setIsAmexCardType(false);
      setIsDiscoverCardType(false);
      setIsVisaCardType(false);
      setIsMasterCardType(false);
    }
    if (e.target.value.length > 0) {
      if (isEmailType) {
        checkoutCtx.setIsValidEmail(validateEmail(e.target.value));
        setIsInputValid(validateEmail(e.target.value));
      }
      if (isCreditCardType) {
        const cardType = creditCardType(e.target.value)[0].type;
        // console.log(cardType);
        if (cardType !== undefined) {
          if (cardType === 'visa') setIsVisaCardType(true);
          if (cardType === 'discover') setIsDiscoverCardType(true);
          if (cardType === 'amex') setIsAmexCardType(true);
          if (cardType === 'master-card') setIsMasterCardType(true);
        }

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
      {isCreditCardType && isVisaCardType && (
        <img className={styles.field_icon} src={visaIcon} alt="" />
      )}{' '}
      {isCreditCardType && isAmexCardType && (
        <img className={styles.field_icon} src={amexIcon} alt="" />
      )}{' '}
      {isCreditCardType && isDiscoverCardType && (
        <img className={styles.field_icon} src={discoverIcon} alt="" />
      )}
      <label className={styles.field_label}>{label}</label>
    </div>
  );
}
