import styles from './ProductCheckout.module.scss';
import ProductCheckoutInputField from './ProductCheckoutInputField';
import ProductCheckoutTitle from './ProductCheckoutTitle';
import ProductCheckoutSubtitle from './ProductCheckoutSubtitle';
import Loader from '../../ActionBar/Loader';
import LoaderPlanets from '../../ActionBar/LoaderPlanets';

export default function ProductCheckout(props: any) {
  const { expanded } = props;
  const title = 'Checkout';
  const subtitle = 'Enter your payment details';

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

  // const fieldPlaceholders = {
  //   email: 'hello@warpdownload.com',
  //   cardNumber: '1234 5678 9012 3456',
  //   cardExpirationDate: 'MM/YY',
  //   cardCVV: '123',
  //   zipCode: '12345',
  // };

  const componentStyle = expanded ? styles.checkout__expanded : styles.checkout;
  return (
    <>
      {expanded && (
        <div className={componentStyle}>
          <ProductCheckoutTitle title={title} />
          {/* <ProductCheckoutSubtitle title={subtitle} /> */}
          <ProductCheckoutInputField data={fieldData.email} />
          <ProductCheckoutInputField data={fieldData.creditCard} />
          <ProductCheckoutInputField data={fieldData.expirationDate} />
          <ProductCheckoutInputField data={fieldData.cvv} />
          <ProductCheckoutInputField data={fieldData.nameOnCard} />
          <ProductCheckoutInputField data={fieldData.zipCode} />

          {/* <Loader /> */}
          {/* <LoaderPlanets /> */}
        </div>
      )}
    </>
  );
}
