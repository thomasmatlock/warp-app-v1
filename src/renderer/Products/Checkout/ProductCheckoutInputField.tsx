import { useFormik } from 'formik';
import { useState } from 'react';
import styles from './ProductCheckoutInputField.module.scss';
// import * strings from './ProductCheckoutInputField.strings.json';
import {
  validateEmail,
  validateCreditCard,
  validateCreditCardType,
} from '../../../main/util/strings';

export default function ProductCheckoutInputField(props: any) {
  const { title, expanded } = props;
  const [isValidCreditCard, setIsValidCreditCard] = useState(true);
  const [isVisaCard, setIsVisaCard] = useState(false);
  const [isMasterCard, setIsMasterCard] = useState(false);
  const [isAmexCard, setIsAmexCard] = useState(false);
  const [isDiscoverCard, setIsDiscoverCard] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  // const formik = useFormik({
  //   initialValues: {
  //     email: '',
  //   },
  //   validate,
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });
  const emailPlaceholder = 'hi@warpdownload.com';
  const emailChangeHandler = (e: any) => {
    console.log(e.target.value);
    setIsValidEmail(validateEmail(e.target.value));
    // console.log(isValidEmail);

    // if (e.target.value.length > 0) setIsValidCreditCard(true);
    // // setIsValidCreditCard(validateCreditCard(e.target.value));
    // setIsValidCreditCard(validateCreditCardType(e.target.value));
    // const cardType = validateCreditCardType(e.target.value);
    // console.log(cardType, isValidCreditCard);
  };
  // const searchInputChangeHandler = (event) => {
  //   if (event.target.value.length > 0) {
  //     setClearIcon(true);
  //     window.electron.ipcRenderer.sendMessage('Search: InputChange', [
  //       event.target.value,
  //     ]);
  //   }
  //   inputCtx.setSearchText(event.target.value);
  // };
  const mouseEnterHandler = () => {
    // console.log('mouse enter');
  };
  const mouseLeaveHandler = () => {
    // console.log('mouse leave');
  };
  const inputClass = isValidEmail
    ? styles.field_input__valid
    : styles.field_input;

  const componentStyle = expanded ? styles.field : styles.field;
  return (
    <form
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      // style={
      //   themeCtx.isDarkTheme
      //     ? { backgroundColor: themeCtx.search.dark.backgroundColor }
      //     : {
      //         backgroundColor: themeCtx.search.light.backgroundColor,
      //       }
      // }
      className={componentStyle}
      // onSubmit={inputCtx.searchInputSubmit}
      // onMouseEnter={userStartedInteracting}
      // onMouseLeave={userStoppedInteracting}
    >
      {/* <img
        id="search__input__icon__unfocused"
        className="search__input__icon search__input__icon__unfocused"
        style={
          themeCtx.isDarkTheme
            ? { filter: 'invert(100%)' }
            : {
                filter: 'invert(0%)',
              }
        }
        src={SearchIcon}
      /> */}
      <input
        // id="search__input"
        // className={inputClass}
        className={styles.field_input}
        style={isValidEmail ? {} : { border: '1px solid red' }}
        type="text"
        // value={emailPlaceholder}
        onChange={emailChangeHandler}
        // onMouseEnter={userStartedInteracting}
        // onMouseLeave={userStartedInteracting}
        // onBlur={searchInputBlurHandler}
        placeholder={emailPlaceholder}
        // spellCheck="false"
      />
      {/* <label
        id="search__input__label"
        className={styles.field_label}
        htmlFor="search__input"
      >
        Email
      </label> */}
    </form>
  );
}
