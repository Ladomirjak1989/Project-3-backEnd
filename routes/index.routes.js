const axios = require("axios")
const router = require("express").Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

router.get("/", async (req, res, next) => {

    res.send("ok")
});
router.get("/config", (req, res) => {
    res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
})
router.post("/create-payment-intent", async (req, res) => {
    try {
        let count = 0
        const paymentIntent = await stripe.paymentIntents.create({ currency: "EUR", amount: 100, automatic_payment_methods: { enabled: true } })
        console.log(paymentIntent, count)
        count++
        res.send({ clientSecret: paymentIntent.client_secret })
    } catch (e) {
        return res.status(400).send({
            error: { message: e.message }
        })
    }
})
module.exports = router;
