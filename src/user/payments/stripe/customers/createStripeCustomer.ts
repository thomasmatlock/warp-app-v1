// TEST CARD NUMBER  DESCRIPTION
// 4242424242424242  Succeeds and immediately processes the payment.
// 4000000000003220  3D Secure 2 authentication must be completed for a successful payment.
// 4000000000009995  Always fails with a decline code of insufficient_funds.
import Stripe from 'stripe';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripeKey from '../stripeKey';
// import getAllProducts from './products/stripeGetAllProducts';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});
type CreateCustomerProps = {
  id: string;
  email: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  nameOnCard: string;
  zipCode?: string;
};
export async function createCustomer(data: CreateCustomerProps) {
  console.log('creating customer...');
  console.log(expirationDate);
  // const exp_month = parseInt(expirationDate.split('/')[0]);

  const { id, email, cardNumber, expirationDate, cvv, nameOnCard, zipCode } =
    data;

  const params: Stripe.CustomerCreateParams = {
    email,
    description: 'New Customer',
    payment_method: {
      type: 'card',
      card: {
        number: cardNumber,
        exp_month: parseInt(expirationDate.split('/')[0]),
        exp_year: parseInt(expirationDate.split('/')[1]),
        cvc: cvv,
        name: nameOnCard,
      },
    },
  };
  try {
    return await stripe.customers.create(params);
    // console.log(customer);
  } catch (error) {
    // console.log(error);
    return error;
  }
}
