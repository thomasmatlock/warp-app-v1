import Stripe from 'stripe';
import stripeKey from '../stripeKey';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

export default async function getCustomer(cus_id: string) {
  // const customer = await stripe.customers.retrieve('cus_MO42DuSK5SSIjZ');
  const customer = await stripe.customers.retrieve(cus_id);
  return customer;
}
