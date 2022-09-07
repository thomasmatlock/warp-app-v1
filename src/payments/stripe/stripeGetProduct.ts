import Stripe from 'stripe';
import stripeKey from './stripeKey';
const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

export default async function getProduct(id: string) {
  const products = await stripe.products.list({
    ids: [id],
    active: true,
  });
  return products;
  //   id: 'prod_MHWtfELZ9fNZH8',
  // object: 'product',
  // active: true,
  // attributes: [],
  // created: 1661025578,
  // default_price: 'price_1LYxpWCRcXVv7dJ6PBgRW85O',
  // description: null,
  // images: [],
  // livemode: true,
  // metadata: {},
  // name: 'Warp Audio Personal Edition',
  // package_dimensions: null,
  // shippable: null,
  // statement_descriptor: null,
  // tax_code: null,
  // type: 'service',
  // unit_label: null,
  // updated: 1661025579,
  // url: null
  products.data.forEach((product) => {
    console.log(product);

    // console.log(product.name, product.price);
  });
}
