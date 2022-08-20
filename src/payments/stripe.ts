import Stripe from 'stripe';
const stripe = new Stripe('sk_live_ktgJvPC8iISH1qrb4oeJg65s', {
  apiVersion: '2022-08-01',
});
export default async function createCustomer() {
  const params: Stripe.CustomerCreateParams = {
    email: 'metaphorps@gmail.com',
  };

  const customer: Stripe.Customer = await stripe.customers.create(params);

  // console.log(customer.id, customer.email);
  // for (const key of customer) {
  //   console.log(key);
  // }
  console.log(customer.id);
}
// createCustomer();
// export default createCustomer;
