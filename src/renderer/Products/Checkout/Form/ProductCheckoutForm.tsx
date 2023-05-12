import { useState, useEffect } from 'react';
import CTAProduct from 'renderer/components/CTA/CTAProduct';
import ProductCheckoutInputField from '../InputFields/ProductCheckoutInputField';
import ProductCheckoutCreditCardForm from '../InputFields/ProductCheckoutCreditCardForm';
import styles from './ProductCheckoutForm.module.scss';
import Loader from '../../../Preloaders/PreloaderSpinners';

// import CTAProduct from '../../components/CTA/CTAProduct';

import { generateRandomName } from '../../../../main/util/generate';

const fieldData = {
  email: {
    type: 'email',
    label: 'Email',
    placeholder: 'hi@warpdownload.com',
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
    placeholder: '321',
  },
};
type Props = {
  id: string;
  expanded: boolean;
  price: number;
};
export default function ProductCheckoutForm(props: Props) {
  const { id, expanded, price } = props;

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

  const clickHandler = () => {
    console.log('clicked');
  };
  const componentStyle = expanded ? styles.form : styles.form;
  return (
    <form className={componentStyle}>
      {/* <Loader theme="dark" /> */}

      <ProductCheckoutInputField data={fieldData.email} />
      <ProductCheckoutCreditCardForm data={creditCardFormData} />
      {/* <ProductCheckoutInputField data={fieldData.nameOnCard} /> */}
      {/* <ProductCheckoutInputField data={fieldData.zipCode} /> */}
      <CTAProduct
        message={ctaMessage}
        clickHandler={clickHandler}
        expanded={false}
        type="buy"
      />
    </form>
  );
}
