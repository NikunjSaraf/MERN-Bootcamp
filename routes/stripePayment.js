const express = require("express");
const { makeStripePayment } = require("../controllers/stripePayment");
const router = express.Router();

router.post("/stripepayment", makeStripePayment);

module.exports = router;
