// create stripe charge
import Stripe from 'stripe';
import stripeKey from './stripeKey';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

export default async function createPaymentIntent(params: type) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 99,
    currency: 'usd',
    payment_method_types: ['card'],
    receipt_email: 'hello',
  });
  return paymentIntent;
}
