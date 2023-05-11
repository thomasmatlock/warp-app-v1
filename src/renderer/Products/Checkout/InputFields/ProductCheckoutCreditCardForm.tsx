import styles from './ProductCheckoutInputFields.module.scss';
import ProductCheckoutInputField from './ProductCheckoutInputField';

export default function ProductCheckoutCreditCardForm(props: any) {
  const { data } = props;

  return (
    <>
      <ProductCheckoutInputField data={data.creditCard} />
      <div className={styles.field_row}>
        <ProductCheckoutInputField data={data.expirationDate} />
        <ProductCheckoutInputField data={data.cvv} />
      </div>
    </>
  );
}
