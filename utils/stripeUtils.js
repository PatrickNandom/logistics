// const stripe = require('stripe')('your-stripe-secret-key');

// // Charge customer using Stripe
// exports.chargeCustomer = async (paymentToken, package) => {
//     const paymentIntent = await stripe.paymentIntents.create({
//         amount: package.amount * 100,
//         currency: 'NGN',
//         payment_method: paymentToken,
//         confirm: true,
//     });

//     return paymentIntent;
// };

