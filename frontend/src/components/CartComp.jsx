import React, { useState, useEffect } from 'react';
import { Button, ListGroup, Container, Form, Alert, Row, Col, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CartComp.css';

const CartComp = ({ cart = [], setCart, user }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  const [error, setError] = useState('');
  const [showSignInAlert, setShowSignInAlert] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  if (!Array.isArray(cart)) return <p>Loading cart...</p>;

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getShippingCost = () => {
    if (subtotal > 50) return 0;
    if (!address.trim()) return 0;
    const city = address.trim().toLowerCase();
    if (city.includes('tirana')) return 2;
    return 3;
  };

  const shippingCost = getShippingCost();
  const total = subtotal + shippingCost;

  const handleRemove = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const handleQuantityChange = (id, delta) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!address.trim() || !phone.trim()) {
      setError('Please provide a valid shipping address and phone number.');
      return;
    }

    setError('');

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: cart,
      address,
      phone,
      total,
    };

    setOrders([newOrder, ...orders]);
    setOrderPlaced(true);
    setShowOrderConfirm(true);
    setCart([]);
    setAddress('');
    setPhone('');
  };

  return (
    <Container className="cart-container my-5 p-4 shadow-sm rounded bg-white">
      <h2 className="mb-4 text-center">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty.</p>
      ) : (
        <>
          <ListGroup className="mb-4">
            {cart.map(item => (
              <ListGroup.Item key={item._id} className="d-flex align-items-center justify-content-between cart-item">
                <div className="d-flex align-items-center">
                  <img src={item.imageUrl} alt={item.itemName} className="cart-img me-3" />
                  <div>
                    <strong>{item.itemName}</strong>
                    <div className="text-muted">{item.price.toFixed(2)} €</div>
                  </div>
                </div>

                <div className="cart-delete d-flex align-items-center gap-2">
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item._id, -1)} aria-label="Decrease quantity">
                    <i className="fas fa-minus"></i>
                  </Button>
                  <span className="quantity">{item.quantity}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => handleQuantityChange(item._id, 1)} aria-label="Increase quantity">
                    <i className="fas fa-plus"></i>
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleRemove(item._id)} aria-label="Remove item">
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Row className="mb-4 justify-content-between text-center text-md-start">
            <Col xs={12} md={5} className="mb-3 mb-md-0">
              <Link to="/components/productsComp" className="btn btn-outline-dark w-100">
                Continue Shopping
              </Link>
            </Col>

            <Col xs={12} md={6}>
              <div className="summary-box p-3 rounded border">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <strong>{subtotal.toFixed(2)} €</strong>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <strong>{shippingCost.toFixed(2)} €</strong>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>
            </Col>
          </Row>

          <Form onSubmit={handlePlaceOrder} className="shipping-form p-3 border rounded">
            <h4 className="mb-3">Shipping Details</h4>

            {!user && (
              <Alert variant="warning text-center">
                You must be signed in to place an order.
              </Alert>
            )}

            {error && <Alert variant="danger">{error}</Alert>}


            <Form.Group className="mb-3" controlId="shippingAddress">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city or address (e.g., Tirana)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                disabled={!user}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={!user}
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              disabled={!user || cart.length === 0 || !address || !phone}
              className="w-100"
            >
              Place Order
            </Button>

          </Form>
        </>
      )}

      {user && orders.length > 0 && (
        <div className="past-orders mt-5">
          <h3 className="mb-4">Your Last Order</h3>
          <div className="order-summary p-3 mb-3 border rounded bg-light">
            <div className="d-flex justify-content-between mb-2">
              <div><strong>Order ID:</strong> {orders[0].id}</div>
              <div><strong>Date:</strong> {orders[0].date}</div>
            </div>
            <div><strong>Total:</strong> {orders[0].total.toFixed(2)} €</div>
            <div><strong>Shipping Address:</strong> {orders[0].address}</div>
            <div><strong>Phone:</strong> {orders[0].phone}</div>
            <strong>Items:</strong>
            <ListGroup>
              {orders[0].items.map(item => (
                <ListGroup.Item key={item._id} className="d-flex justify-content-between">
                  <span>{item.itemName} × {item.quantity}</span>
                  <span>{(item.price * item.quantity).toFixed(2)} €</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      )}


      <Modal
        show={showOrderConfirm}
        onHide={() => setShowOrderConfirm(false)}
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your order has been placed successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowOrderConfirm(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CartComp;
