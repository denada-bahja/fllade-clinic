import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import './ProductInfos.css';

const ProductInfos = ({ cart = [], setCart }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(0);

  const storedUser = localStorage.getItem('user');
  const user = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  const isSignedIn = !!user;
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`)
      .then(res => {
        setProduct(res.data)
      });
  }, [id]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find(item => item._id === product._id);
      if (productInCart) {
        return prevCart.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRatingClick = async (rating) => {
    setUserRating(rating);
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products/rate/${id}`, { rating })
      setProduct(res.data)
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`);
        alert("Product deleted successfully!");
        window.location.href = '/productsComp';
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  const handleUpdateProduct = (id) => {
    window.location.href = `/components/updateProductForm/${id}`;
  };

  return (
    <Container className="mt-5 px-3 px-md-5">
      <Row className="mb-2 product-info-row g-0">
        {/* Image column */}
        <Col md={6} className="d-flex">
          <Card className="product-img-card border-0 shadow-sm w-100 h-100">
            <Card.Img
              src={product.imageUrl}
              alt={product.itemName}
              className="product-img"
            />
          </Card>
        </Col>

        {/* Info column */}
        <Col md={6} className="d-flex flex-column">
          <Card className="w-100 flex-grow-1 d-flex flex-column justify-content-center">
            <Card.Body>
              <Card.Title className="fw-bold fs-3">{product.itemName}</Card.Title>
              <div className='d-flex justify-content-between'>
                <div className="mb-3">
                  {product.stock > 0 ? (
                    <span className="badge bg-success">In Stock</span>
                  ) : (
                    <span className="badge bg-danger">Out of Stock</span>
                  )}
                </div>
                <div className="mb-2">
                  <small className="text-warning">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`fa-star ${i < Math.round(product.rating) ? 'fas' : 'far'}`}
                      ></i>
                    ))}
                  </small>
                  <small className="text-muted ms-2">
                    ({product.reviews} review{product.reviews !== 1 ? 's' : ''})
                  </small>
                </div>
              </div>
              <Card.Text className="text-muted"><strong>Price: </strong> {product.price}€</Card.Text>
              <Card.Text className="text-muted"><strong>Brand: </strong> {product.brand}</Card.Text>
              <Card.Text className="text-muted"><strong>Category: </strong> {product.category}</Card.Text>
              <Card.Text className="text-muted"><strong>Description: </strong>{product.description}</Card.Text>
              <Card.Text className="text-muted"><strong>Size: </strong>{product.size}ml</Card.Text>
              <Button
                variant="dark"
                disabled={product.stock === 0}
                className="mt-auto w-100"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </Button>
            </Card.Body>
            {isAdmin && (
              <div className='d-flex'>
                <Button className='m-3' variant="danger" onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
                <Button className='m-3 text-white' variant="warning" onClick={() => handleUpdateProduct(product._id)}>
                  Update
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {isSignedIn && (
        <Row className="mb-5">
          <Col>
            <h5>Rate this product:</h5>
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`fa-star ${index < userRating ? 'fas' : 'far'} text-warning fs-4`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleRatingClick(index + 1)}
                ></i>
              ))}
            </div>
            {userRating > 0 && <p className="mt-2">You rated this product {userRating} out of 5</p>}
          </Col>
        </Row>
      )}

      <Button
        className='my-3 bg-dark'
        onClick={() => navigate(-1)}
      ><i
        className="fa-solid fa-arrow-left pe-2"
      ></i>
        Go Back
      </Button>
    </Container>
  );
};

export default ProductInfos;