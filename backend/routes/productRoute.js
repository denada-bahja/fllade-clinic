const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// POST - Shto një produkt të ri
router.post('/', async (req, res) => {
  console.log("Received product data:", req.body);
  try {
    const { itemName, price, category, brand, imageUrl, description, size } = req.body;

    if (!itemName || !price || !category || !brand || !imageUrl || !description || !size) {
      return res.status(400).json({ message: 'Fill in all fields' });
    }
    // Kontroll nëse produkti ekziston sipas itemName, brand
    const existingProduct = await Product.findOne({ itemName, brand });

    if (existingProduct) {
      existingProduct.stock += 1;
      await existingProduct.save();
      return res.status(200).json({
        message: 'Stock increased by 1 for existing product.',
        product: existingProduct,
      })
    }

    // Nëse nuk ekziston, krijo të ri me stock = 1
    const newProduct = await Product.create({
      itemName,
      price,
      category,
      brand,
      imageUrl,
      description,
      stock: 1,
      size,
    });

    res.status(201).json({
      message: 'New product created.',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product' });
  }
});

// GET - Merr të gjitha produktet
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// GET - Merr një produkt sipas ID-së
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error retrieving product' });
  }
});

router.post("/rate/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newRating = parseInt(req.body.rating);
    if (!newRating || newRating < 1 || newRating > 5) {
      return res.status(400).json({ message: "Rating must be an integer between 1 and 5" });
    }

    const totalRating = product.rating * product.reviews;
    const newTotalReviews = product.reviews + 1;
    const updatedRating = (totalRating + newRating) / newTotalReviews;

    product.rating = updatedRating;
    product.reviews = newTotalReviews;

    await product.save();

    res.json(product);
  } catch (err) {
    console.error("Error saving rating:", err);
    res.status(500).json({ message: "Error saving rating" });
  }
});



// DELETE - Fshi një produkt
router.delete('/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});


//update
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

module.exports = router;
