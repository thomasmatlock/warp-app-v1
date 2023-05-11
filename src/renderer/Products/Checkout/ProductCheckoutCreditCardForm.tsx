import styles from './ProductCheckoutInputField.module.scss';
import ProductCheckoutInputField from './ProductCheckoutInputField';

const fieldData = {
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
};
export default function ProductCheckoutCreditCardForm(props: any) {
  const { title, expanded } = props;

  const componentStyle = expanded ? styles.field_row : styles.field_row;
  return (
    <>
      <ProductCheckoutInputField data={fieldData.creditCard} />
      <div className={componentStyle}>
        <ProductCheckoutInputField data={fieldData.expirationDate} />
        <ProductCheckoutInputField data={fieldData.cvv} />
      </div>
    </>
  );
}
