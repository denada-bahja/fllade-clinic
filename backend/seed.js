const mongoose = require('mongoose');
const Product = require('./models/productModel');
const User = require('./models/userModel');
const Service = require('./models/serviceModel');

const products = require('./data/products.json');
const users = require('./data/users.json');
const services = require('./data/services.json');

require('dotenv').config();

const mongoUri = process.env.MONGO_URI ;

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding');

    // Optional: Delete existing data to avoid duplicates
    await Product.deleteMany({});
    await User.deleteMany({});
    await Service.deleteMany({});

    // Insert new data
    await Product.insertMany(products);
    await User.insertMany(users);
    await Service.insertMany(services);

    console.log('Data successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
