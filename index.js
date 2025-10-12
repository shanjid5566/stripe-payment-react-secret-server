require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount = 11099, currency = "usd" } = req.body; // amount in cents
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
