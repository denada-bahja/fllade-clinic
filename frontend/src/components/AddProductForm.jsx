import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './AddProductForm.css';

const AddProductForm = () => {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const categories = [
    'cleanser',
    'serum',
    'moisturizer',
    'sunscreen',
    'mask',
    'eye-care',
    'body-lotion',
    'body-scrub',
    'body-oil',
    'shampoo',
    'conditioner',
    'hair-mask',
    'hair-oil',
  ];
  const brands = ['the-ordinary', 'cera-ve', 'la-roche-posay'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
        itemName,
        price: parseFloat(price),
        category,
        brand,
        description,
        size,
        imageUrl,
      });

      setMessage('Product added successfully!');
      setMessageType('success');
      setItemName('');
      setPrice('');
      setCategory('');
      setBrand('');
      setDescription('');
      setSize('');
      setImageUrl('');
    } catch (error) {
      setMessage('Error adding product');
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-container">
        <h2 className="form-title">Add New Product</h2>

        <label className="form-label" htmlFor="itemName">
          Product Name:
        </label>
        <input
          id="itemName"
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label" htmlFor="price">
          Price (€):
        </label>
        <input
          id="price"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label" htmlFor="category">
          Category:
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select category</option>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="size">
          Size (ml):
        </label>
        <input
          id="size"
          type="number"
          step="1"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label" htmlFor="brand">
          Brand:
        </label>
        <select
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
          className="form-select"
        >
          <option value="">Select brand</option>
          {brands.map((b, idx) => (
            <option key={idx} value={b}>
              {b}
            </option>
          ))}
        </select>

        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-input"
        />

        <label className="form-label" htmlFor="imageUrl">
          Image URL:
        </label>
        <input
          id="imageUrl"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="form-input"
        />

        <button type="submit" className="form-button">
          Add Product
        </button>

        {message && (
          <p className={`form-message ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </p>
        )}
      </form>
      <Button
        className='mx-5 mb-5 bg-dark'
        onClick={() => navigate(-1)}
      ><i
        className="fa-solid fa-arrow-left pe-2"
      ></i>
        Go Back
      </Button>
    </div>
  );
};

export default AddProductForm;
