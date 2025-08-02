import React, { useState, useEffect } from 'react'
import { Container, Card, Row, Col, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './BestSellersComp.css'

const BestSellersComp = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
        console.error('Error retrieving data:', err)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger">Error: {error}</div>
      </Container>
    )
  }

  return (
    <Container fluid className='bs-container bg-light p-5'>
      <div className='text-center'>
        <h2 className="fw-bold">Best Sellers</h2>
        <p className="text-muted">Discover our top-rated skincare essentials loved by customers</p>
      </div>
      <Row className="g-4">
        {products.slice(0, 8).map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Link to={`/components/productInfos/${product._id}`} className='text-decoration-none'>
              <Card className='bs-card d-flex flex-column cursor-pointer h-100'>
                <Card.Img
                  className='bs-image'
                  src={product.imageUrl}
                  alt={product.itemName}
                />
                <Card.Body className='p-3 d-flex flex-column justify-content-between'>
                  <Card.Title className='bs-title fw-bold mb-2'>
                    {product.itemName}
                  </Card.Title>
                  <div className="d-flex justify-content-end text-success">
                    <Card.Text className='bs-price m-0'>
                      {parseFloat(product.price).toFixed(2)} €
                    </Card.Text>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default BestSellersComp
