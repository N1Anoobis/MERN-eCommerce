const express = require('express');
const router = express.Router();
// const Order = require('../../models/order.model');
router.get('/cart', (req, res) => {

  try {
   
    if (!req.session || !req.session.cart || !req.session.cart.cart) res.json([]);
    else if (!req.session.cart.cart.length) res.json([]);
    else res.json(req.session.cart.cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/cart', (req, res) => {
  try {
    const { products } = req.body;
    req.session.cart = {
      products: products,
    };
    req.session.save();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;