// create stripe charge
import Stripe from 'stripe';
import stripeKey from './stripeKey';
import getAllProducts from './products/stripeGetAllProducts';
import createPaymentMethod from './createPaymentMethods';
import createPaymentIntent from './createPaymenthIntent';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

const paymentMethod = createPaymentMethod({
  type: 'card',
  card: {
    number: '4242424242424242',
    exp_month: 8,
    exp_year: 2024,
    cvc: '314',
  },
});
const paymentIntent = createPaymentIntent({
  amount: 99,
  currency: 'usd',
  payment_method_types: ['card'],
  receipt_email: 'hello',
});

export default async function createCheckoutSession(
  customerID: string,
  price: string
) {
  const session = await stripe.checkout.sessions.create({
    customer: customerID,
    success_url: 'https://warpdownload.com/success',
    cancel_url: 'https://warpdownload.com/cancel',
    line_items: [{ price, quantity: 1 }],
    mode: 'payment',
    // card payment
    payment_method_types: ['card'],
  });
  // console.log(session);

  return session;
}
