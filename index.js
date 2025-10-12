require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(express.json());
app.use(cors());

const stripe = Stripe(process.env.SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount = 1099, currency = "usd" } = req.body;
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
