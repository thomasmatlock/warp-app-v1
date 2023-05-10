import styles from './ProductCheckout.module.scss';
import ProductCheckoutForm from './ProductCheckoutForm';
import ProductCheckoutTitle from './ProductCheckoutTitle';
import ProductCheckoutSubtitle from './ProductCheckoutSubtitle';
import Loader from '../../ActionBar/Loader';
import LoaderPlanets from '../../ActionBar/LoaderPlanets';

export default function ProductCheckout(props: any) {
  const { expanded } = props;
  const title = 'Checkout';
  const subtitle = 'Enter your payment details';

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
          <ProductCheckoutForm expanded={expanded} />
          {/* <ProductCheckoutInputField data={fieldData.email} />
          <ProductCheckoutInputField data={fieldData.creditCard} />
          <ProductCheckoutInputField data={fieldData.expirationDate} />
          <ProductCheckoutInputField data={fieldData.cvv} />
          <ProductCheckoutInputField data={fieldData.nameOnCard} />
          <ProductCheckoutInputField data={fieldData.zipCode} /> */}

          {/* <Loader /> */}
          {/* <LoaderPlanets /> */}
        </div>
      )}
    </>
  );
}
