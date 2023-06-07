import chalk from 'chalk';
import Stripe from 'stripe';
import stripeKey from '../stripeKey';

const stripe = new Stripe(stripeKey, {
  apiVersion: '2022-08-01',
});

// export default async function getCustomer(cus_id: string) {
//   // const customer = await stripe.customers.retrieve('cus_MO42DuSK5SSIjZ');
//   const customer = await stripe.customers.retrieve(cus_id);
//   return customer;
// }
export async function GetStripeCustomerByEmail(email: string) {
  // console.log(`searching Stripe for customer with email: ${email}`);
  try {
    const customer = await stripe.customers.search({
      query: `email:'${email}'`,
    });
    // console.log(customer); // 'cus_NtviPTJQDAkVMr'

    return customer.data[0];
  } catch (error) {
    console.log(chalk.red('error getting customer by email'));
    return 'error';
  }

  // const customer = await stripe.customers.retrieve('cus_MO42DuSK5SSIjZ');
  // return customer;
}
export async function GetStripeCustomerByID(id: string) {
  // console.log(`searching Stripe for customer by id: ${id}`);
  try {
    const customer = await stripe.customers.retrieve(id);
    return customer;
  } catch (error) {
    console.log(chalk.red('error getting customer by id'));
    return 'error';
  }
}
