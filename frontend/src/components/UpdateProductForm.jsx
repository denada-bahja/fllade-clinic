import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './UpdateProductForm.css';

const UpdateProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    itemName: '',
    price: '',
    category: '',
    brand: '',
    imageUrl: '',
    description: '',
    size: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => {
        console.error('Error fetching product:', err);
        setAlertMessage('Failed to fetch product data.');
        setAlertType('error');
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
        ...product,
        price: parseFloat(product.price),
        size: parseInt(product.size, 10),
      });
      setAlertMessage('Product updated successfully!');
      setAlertType('success');

    } catch (err) {
      console.error('Update failed:', err);
      setAlertMessage('Failed to update product.');
      setAlertType('error');
    }
  };

  return (
    <div>
      <div className="form-container">
        <h2 className="form-title">Update Product</h2>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="itemName">
            Product Name
          </label>
          <input
            className="form-input"
            id="itemName"
            name="itemName"
            value={product.itemName}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="price">
            Price (€)
          </label>
          <input
            className="form-input"
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            className="form-select"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="cleanser">Cleansers</option>
            <option value="serum">Serums</option>
            <option value="moisturizer">Moisturizers</option>
            <option value="sunscreen">Sunscreen</option>
            <option value="mask">Masks</option>
            <option value="eye-care">Eye Care</option>
            <option value="body-lotion">Body Lotion</option>
            <option value="body-scrub">Body Scrub</option>
            <option value="body-oil">Body Oil</option>
            <option value="shampoo">Shampoo</option>
            <option value="conditioner">Conditioner</option>
            <option value="hair-mask">Hair Mask</option>
            <option value="hair-oil">Hair Oil</option>
          </select>

          <label className="form-label" htmlFor="size">
            Size (ml)
          </label>
          <input
            className="form-input"
            id="size"
            name="size"
            type="number"
            step="1"
            value={product.size}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="brand">
            Brand
          </label>
          <select
            className="form-select"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
          >
            <option value="">Select a brand</option>
            <option value="the-ordinary">The Ordinary</option>
            <option value="cera-ve">CeraVe</option>
            <option value="la-roche-posay">La Roche-Posay</option>
          </select>

          <label className="form-label" htmlFor="description">
            Description
          </label>
          <textarea
            className="form-textarea"
            id="description"
            name="description"
            rows={3}
            value={product.description}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="imageUrl">
            Image URL
          </label>
          <input
            className="form-input"
            id="imageUrl"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            required
          />

          <button type="submit" className="form-button">
            Save Changes
          </button>

          {alertMessage && (
            <p
              className={
                alertType === 'success'
                  ? 'alert-message success'
                  : 'alert-message error'
              }
            >
              {alertMessage}
            </p>
          )}
        </form>
      </div>
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

export default UpdateProductForm;
