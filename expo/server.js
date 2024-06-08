const express = require('express');
const stripe = require('stripe')('YOUR_STRIPE_SECRET_KEY');
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { plan } = req.body;
  let amount;

  if (plan === 'PREMIUM MENSAL') {
    amount = 1000; // Valor em centavos
  } else if (plan === 'PREMIUM ANUAL') {
    amount = 10000; // Valor em centavos
  } else {
    res.status(400).send('Plano inválido');
    return;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(4242, () => console.log('Server running on port 4242'));
