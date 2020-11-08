
// const validateInputs = require('../utils/validateInputs.js');
const express = require('express');
const router = express.Router();
const Order = require('../../models/order.model');

router.post('/order', async (req, res) => {
  
  try {
    console.log(req.session) 


      const newOrder = new Order({
        ...req.body,
               
      });
      await newOrder.save();
      res.json(newOrder);
    // } else {
    //   throw new Error('Wrong input!');
    // }

  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;