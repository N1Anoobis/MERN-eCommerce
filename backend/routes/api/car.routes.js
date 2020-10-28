const express = require('express');
const router = express.Router();

const Cars = require('../../models/cars.model');

router.get('/cars',(req, res) => {
  Cars.find()
    .then(car => res.json(car));
});

module.exports = router;