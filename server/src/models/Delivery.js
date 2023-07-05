const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  shipper: {
    type: String,
    required: true
  },
  trackingNumber: {
    type: String,
    required: true
  },
  estimatedDeliveryDate: {
    type: Date
  },
  delivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;