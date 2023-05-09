import styles from './ProductCheckout.module.scss';
import ProductCheckoutInputField from './ProductCheckoutInputField';
import ProductCheckoutTitle from './ProductCheckoutTitle';
import Loader from '../../ActionBar/Loader';
// import LoaderPlanets from '../../ActionBar/LoaderPlanets';

export default function ProductCheckout(props: any) {
  const { expanded } = props;
  const title = 'Checkout';
  const componentStyle = expanded ? styles.checkout__expanded : styles.checkout;
  return (
    <>
      {expanded && (
        <div className={componentStyle}>
          <ProductCheckoutTitle title={title} />
          <ProductCheckoutInputField />
          <Loader />
          {/* <LoaderPlanets /> */}
        </div>
      )}
    </>
  );
}
