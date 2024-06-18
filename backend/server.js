const express = require('express');
const stripe = require('stripe')('pk_test_51PPF5fB6fHgKpaVPONYhb9TNPjIAw6ShyQfNMLmYIfw8RK1jvvlttteaDrCrFJKPWMaux0Ej9UlscEUFhsIuZqPl00REaP4cit');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para criar um PaymentMethod
app.post('/create-payment-method', async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: req.body.number,
        exp_month: req.body.exp_month,
        exp_year: req.body.exp_year,
        cvc: req.body.cvc,
      },
      billing_details: {
        email: 'asd@gmail.com'
      },
    });
    res.send(paymentMethod);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


app.get('/health', async (req, res) => {
  console.info({ ok: true });
  res.send({ ok: true })
})

// Rota para atualizar um PaymentMethod
app.post('/update-payment-method/:paymentMethodId', async (req, res) => {
  try {
    const paymentMethod = await stripe.paymentMethods.update(req.params.paymentMethodId, {
      metadata: {
        order_id: req.body.order_id,
      },
    });
    res.send(paymentMethod);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
