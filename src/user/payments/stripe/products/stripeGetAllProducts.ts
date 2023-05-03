import Stripe from 'stripe';
import stripeKey from '../stripeKey';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

export default async function getProducts() {
  const products = await stripe.products.list({
    active: true,
  });
  // for (const product of products.data) {
  //   console.log(product);
  // }
  // console.log(products);

  return products;
}
