import React from 'react'
import face from '../images/face.jpeg'
import body from '../images/body.jpg'
import hair from '../images/hair.jpg'
import './ShopByCategoryComp.css'
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const services = [
  {
    type: "Face Care",
    category: "face-care",
    image: face,
  },
  {
    type: "Hair Care",
    category: "hair-care",
    image: hair,
  },
  {
    type: "Body Care",
    category: "body-care",
    image: body,
  },
];

const ShopByCategoryComp = ({ setFilteredCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setFilteredCategory(category);
    navigate('/components/productsComp');
  };

  return (
    <Container fluid className='category-container'>
      <div className='category-header text-center'>
        <h2 className='fw-bold'>Shop by Category</h2>
        <p className="text-muted">Find the perfect skincare products based on your needs</p>
      </div>

      <Row className='cards-ctg'>
        {services.map((service, index) => (
          <Col xs={12} sm={12} md={4} lg={4} className="px-3" key={index}>
            <div
              className="text-decoration-none"
              onClick={() => handleCategoryClick(service.category)}
              style={{ cursor: 'pointer' }}
            >
              <Card className="shop-card text-dark mb-5">
                <Card.Img src={service.image} alt="Card image" className='shop-card' />
                <Card.ImgOverlay className="d-flex flex-column justify-content-start align-items-start">
                  <Card.Title className="text-overlay bg-white px-3 py-1 m-0">{service.type}</Card.Title>
                </Card.ImgOverlay>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShopByCategoryComp;
