import styles from './ProductCheckout.module.scss';
import ProductCheckoutForm from './Form/ProductCheckoutForm';
import ProductCheckoutTitle from './Titles/ProductCheckoutTitle';
import ProductCheckoutSubtitle from './Titles/ProductCheckoutSubtitle';
import Loader from '../../Preloaders/PreloaderSpinners';
import PreloaderOrbits from '../../Preloaders/PreloaderOrbits';

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
          <ProductCheckoutSubtitle title={subtitle} />
          <ProductCheckoutForm expanded={expanded} />

          {/* <PreloaderOrbits theme="dark" /> */}
          {/* <Loader theme="dark" /> */}
        </div>
      )}
    </>
  );
}
