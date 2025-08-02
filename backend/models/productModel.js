const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['cleanser', 'serum', 'moisturizer', 'sunscreen', 'mask', 'eye-care', 'body-lotion', 'body-scrub', 'body-oil', 'shampoo', 'conditioner', 'hair-mask', 'hair-oil']
  },
  brand: {
    type: String,
    required: true,
    enum: ['the-ordinary', 'cera-ve', 'la-roche-posay']
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    default: 1,
  },
  size: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true }) 

const Product = mongoose.model("Product", productSchema)
module.exports = Product;
