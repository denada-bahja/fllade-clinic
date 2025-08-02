import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ServicesComp.css';

const ServicesComp = () => {
  const [services, setServices] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsPerRow, setCardsPerRow] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateCardsPerRow = () => {
    const width = window.innerWidth;
    if (width < 768) {
      setCardsPerRow(1); // small screens
    } else if (width < 992) {
      setCardsPerRow(2); // medium screens
    } else {
      setCardsPerRow(3); // large screens
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/services`);
        setServices(response.data);
      } catch (err) {
        setError('Failed to fetch services.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
    updateCardsPerRow();
    window.addEventListener('resize', updateCardsPerRow);
    return () => window.removeEventListener('resize', updateCardsPerRow);
  }, []);

  const handleNext = () => {
    const nextIndex = startIndex + cardsPerRow;
    setStartIndex(nextIndex >= services.length ? 0 : nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = startIndex - cardsPerRow;
    setStartIndex(prevIndex < 0 ? Math.max(0, services.length - cardsPerRow) : prevIndex);
  };

  const visibleServices = services.slice(startIndex, startIndex + cardsPerRow);

  return (
    <Container fluid className="services-container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Our Services</h2>
        <p className="text-muted">Discover the ideal skincare treatment tailored to your unique needs</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : (
        <div className="services-carousel d-flex align-items-center justify-content-center">
          <Button
            variant="outline-secondary"
            className="arrow-button"
            onClick={handlePrev}
            disabled={services.length <= cardsPerRow}
            aria-label="Previous"
          >
            ‹
          </Button>

          <div className="flex-grow-1">
            <Row className="g-4 justify-content-center mx-0">
              {visibleServices.map((service) => (
                <Col key={service._id} xs={12} md={6} lg={4} className="d-flex">
                  <Link to={`/components/servicesDetails/${service._id}`} className="text-decoration-none w-100">
                    <Card className="service-card h-100 text-center p-2 shadow-sm d-flex flex-column">
                      <Card.Img
                        variant="top"
                        src={service.image}
                        alt={service.title}
                        className="service-image mb-3"
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold services-titles">{service.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>

          <Button
            variant="outline-secondary"
            className="arrow-button"
            onClick={handleNext}
            disabled={services.length <= cardsPerRow}
            aria-label="Next"
          >
            ›
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ServicesComp;