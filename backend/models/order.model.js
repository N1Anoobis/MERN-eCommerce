const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    _id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cars' },
    amount: { type: Number, required: true },
    notes: { type: String },
  }],
  client: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  total: { type: Number, required: true },
  status: {type: String, required: true},
},
);

module.exports = mongoose.model('Order', orderSchema);