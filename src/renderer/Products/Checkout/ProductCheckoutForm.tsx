import { useFormik } from 'formik';
import { useState } from 'react';
import ProductCheckoutInputField from './ProductCheckoutInputField';
import styles from './ProductCheckoutForm.module.scss';
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
const fieldData = {
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'hi@warpdownload.com',
  },
  creditCard: {
    type: 'creditCard',
    label: 'Credit Card',
    placeholder: '1234 5678 9012 3456',
  },
  expirationDate: {
    type: 'expirationDate',
    label: 'Card Expiration',
    placeholder: 'MM/YY',
  },
  cvv: {
    type: 'cvv',
    label: 'CVV',
    placeholder: '123',
  },
  nameOnCard: {
    type: 'nameOnCard',
    label: 'Name on Card',
    placeholder: 'John Doe',
  },
  zipCode: {
    type: 'zipCode',
    label: 'Card Zip Code',
    placeholder: '12345',
  },
};
export default function ProductCheckoutForm(props: any) {
  // PROPS DESTRUCTURING
  const { expanded } = props;
  //
  const [isInputValid, setIsInputValid] = useState(true);
  // TYPES //////////////////////////////
  // const [isEmailType, setIsEmailType] = useState(type === 'email');
  // const [isCreditCardType, setIsCreditCardType] = useState(
  //   type === 'creditCard'
  // );
  // const [isExpirationDateType, setIsExpirationDateType] = useState(
  //   type === 'expirationDate'
  // );
  // const [isCvvType, setIsCvvType] = useState(type === 'cvv');
  // const [isNameOnCardType, setIsNameOnCardType] = useState(
  //   type === 'nameOnCard'
  // );
  // const [isZipCodeType, setIsZipCodeType] = useState(type === 'zipCode');
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
  const [inputClass, setInputClass] = useState(styles.field_input);
  // let inputClass = isInputValid ? styles.field_input : styles.field_input;
  const changeHandler = (e: any) => {
    if (e.target.value.length > 0) {
      // if (isEmailType) setIsInputValid(validateEmail(e.target.value));
      // if (isCreditCardType) setIsInputValid(validateCreditCard(e.target.value));
      // if (isExpirationDateType)
      //   setIsInputValid(validateExpirationDate(e.target.value));
      // if (isCvvType) setIsInputValid(validateCVV(e.target.value));
      // if (isNameOnCardType) setIsInputValid(validateNameOnCard(e.target.value));
      // if (isZipCodeType) setIsInputValid(validateZipCode(e.target.value));
    }
  };

  // };
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
  };

  const componentStyle = expanded ? styles.form : styles.form;
  return (
    <form className={componentStyle}>
      <ProductCheckoutInputField data={fieldData.email} />
      <ProductCheckoutInputField data={fieldData.creditCard} />
      <ProductCheckoutInputField data={fieldData.expirationDate} />
      <ProductCheckoutInputField data={fieldData.cvv} />
      <ProductCheckoutInputField data={fieldData.nameOnCard} />
      <ProductCheckoutInputField data={fieldData.zipCode} />
    </form>
  );
}
