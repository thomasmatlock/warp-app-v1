import styles from './ProductCheckout.module.scss';
import ProductCheckoutForm from './Form/ProductCheckoutForm';
import ProductCheckoutTitle from './Titles/ProductCheckoutTitle';
import ProductCheckoutSubtitle from './Titles/ProductCheckoutSubtitle';
import Loader from '../../Preloaders/PreloaderSpinners';
import PreloaderOrbits from '../../Preloaders/PreloaderOrbits';
type Props = {
  id: string;
  expanded: boolean;
  price: number;
  productTitle: string;
};
export default function ProductCheckout(props: Props) {
  const { id, expanded, price, productTitle } = props;
  // console.log(productTitle);

  // console.log(price);

  const title = 'Checkout';
  const subtitle = `Enter your payment details to purchase ${productTitle} for $${price}`;

  const componentStyle = expanded ? styles.checkout__expanded : styles.checkout;
  return (
    <>
      {expanded && (
        <div className={componentStyle}>
          {/* <Loader theme="dark" /> */}
          {/* <PreloaderOrbits theme="dark" /> */}
          <ProductCheckoutForm
            expanded={expanded}
            price={price}
            id={id}
            productTitle={productTitle}
          />
        </div>
      )}
      {/* <button type="">hello</button> */}
    </>
  );
}
