import { useState, useEffect, useContext } from 'react';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import ProductCheckoutInputField from '../InputFields/ProductCheckoutInputField';
import ProductCheckoutCreditCardForm from '../InputFields/ProductCheckoutCreditCardForm';
import styles from './ProductCheckoutForm.module.scss';
import ProductCheckoutTitle from '../Titles/ProductCheckoutTitle';
import ProductCheckoutSubtitle from '../Titles/ProductCheckoutSubtitle';
// import {CheckoutContextProvider}
import CheckoutContext from '../../../../store/checkoutContext';

import Loader from '../../../Preloaders/PreloaderSpinners';
import PreloaderOrbits from '../../../Preloaders/PreloaderOrbits';

// import CTAProduct from '../../components/CTA/CTAProduct';

import { generateRandomName } from '../../../../main/util/generate';

const fieldData = {
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'hello@warpdownload.com',
  },
  nameOnCard: {
    type: 'nameOnCard',
    label: 'Name on Card',
    placeholder: generateRandomName(),
  },
  zipCode: {
    type: 'zipCode',
    label: 'Card Zip Code',
    placeholder: '54321',
  },
};
const creditCardFormData = {
  creditCard: {
    type: 'creditCard',
    label: 'Card information',
    placeholder: 'Card number',
  },
  expirationDate: {
    type: 'expirationDate',
    // label: 'Card Expiration',
    label: '',
    placeholder: 'MM/YY',
  },
  cvv: {
    type: 'cvv',
    // label: 'CVV',
    label: '',
    placeholder: 'CVV',
  },
};
type Props = {
  id: string;
  expanded: boolean;
  price: number;
  productTitle: string;
};
export default function ProductCheckoutForm(props: Props) {
  const checkoutCtx = useContext(CheckoutContext);
  // console.log('checkoutCtx', checkoutCtx);

  const { id, expanded, price, productTitle } = props;
  const title = 'Checkout';
  // const subtitle = `Enter your payment details to purchase ${productTitle} for $${price}`;
  const subtitle = `Enter your payment details to purchase your ${productTitle} license`;
  const [ctaMessage, setCtaMessage] = useState(`Pay $${price}`);
  useEffect(() => {
    setCtaMessage(
      id.toLowerCase().includes('bundle')
        ? `Pay $${price} (Save 25%)`
        : `Pay $${price}`
    );
  }, [id, price]);
  // const ctaMessage = `Pay $${price}`;
  // console.log(price);

  const submitHandler = () => {
    const data = {
      id,
    };
    checkoutCtx.submitForm(id);
  };
  const componentStyle = expanded ? styles.form : styles.form;
  return (
    <form className={componentStyle} onSubmit={submitHandler}>
      <ProductCheckoutTitle title={title} />
      <ProductCheckoutSubtitle title={subtitle} />
      {/* <PreloaderOrbits theme="dark" /> */}

      <ProductCheckoutInputField data={fieldData.email} />
      <ProductCheckoutCreditCardForm data={creditCardFormData} />
      {/* <ProductCheckoutInputField data={fieldData.nameOnCard} /> */}
      {/* <ProductCheckoutInputField data={fieldData.zipCode} /> */}
      {checkoutCtx.isSubmitted && <Loader theme="dark" />}
      {/* <Loader theme="dark" /> */}
      {!checkoutCtx.isSubmitted && (
        <CTAProduct
          message={ctaMessage}
          clickHandler={submitHandler}
          expanded={false}
          type="buy"
          isSubmittable={checkoutCtx.isSubmittable}
        />
      )}
    </form>
  );
}
