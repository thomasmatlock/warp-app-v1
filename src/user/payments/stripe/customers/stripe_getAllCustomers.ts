import Stripe from 'stripe';
import stripeKey from '../stripeKey';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

export default async function getAllCustomers() {
  const customers = await stripe.customers.list({});
  return customers;
}
