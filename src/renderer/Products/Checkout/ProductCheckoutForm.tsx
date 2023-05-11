import ProductCheckoutInputField from './ProductCheckoutInputField';
import ProductCheckoutCreditCardForm from './ProductCheckoutCreditCardForm';
import styles from './ProductCheckoutForm.module.scss';

import { generateRandomName } from '../../../main/util/names';

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
    placeholder: '12345',
  },
};
export default function ProductCheckoutForm(props: any) {
  const { expanded } = props;

  const componentStyle = expanded ? styles.form : styles.form;
  return (
    <form className={componentStyle}>
      <ProductCheckoutInputField data={fieldData.email} />
      <ProductCheckoutCreditCardForm />

      <ProductCheckoutInputField data={fieldData.nameOnCard} />
      <ProductCheckoutInputField data={fieldData.zipCode} />
    </form>
  );
}
