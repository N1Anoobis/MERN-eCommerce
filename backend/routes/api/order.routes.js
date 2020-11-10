
// const validateInputs = require('../utils/validateInputs.js');
const express = require('express');
const sanitize = require('mongo-sanitize');
const router = express.Router();
const Order = require('../../models/order.model');

router.post('/order', async (req, res) => {

  try {
    const { name, email, address, city, zip } = req.body.client;
    const newOrder = new Order({
      products: req.body.products,
      client: {
        name: sanitize(name),
        email: sanitize(email),
        address: sanitize(address),
        city: sanitize(city),
        zip: sanitize(zip),
      },
      request: sanitize(req.body.request),
    });
    await newOrder.save();
    res.json(newOrder);

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;