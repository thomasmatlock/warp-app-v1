// create stripe charge
import Stripe from 'stripe';
import stripeKey from './stripeKey';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});
//  type = {
//   type: string;
//   card: {
//     number: string;
//     exp_month: number;
//     exp_year: number;
//     cvc: string;
//   };
// };
export default async function createPaymentMethod(params: type) {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: '4242424242424242',
      exp_month: 8,
      exp_year: 2024,
      cvc: '314',
    },
  });
  return paymentMethod;
}
